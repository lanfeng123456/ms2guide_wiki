import { readdir, stat } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";

const SITE_URL = "https://www.ms2guide.site";
const FORBIDDEN_PRODUCTION_ORIGIN = "http://www.ms2guide.site";
const URLS = [
  "/",
  "/guides/mortal-shell-ii-guide",
  "/de/guides/mortal-shell-ii-guide",
  "/robots.txt",
  "/sitemap.xml",
];
const AD_MARKERS = [
  "container-63418b900539f6089a243273d124426c",
  "https://www.highperformanceformat.com/2c3fe3a93001bf85947eefe6b471c0f5/invoke.js",
  "https://pl30941417.effectivecpmnetwork.com/63418b900539f6089a243273d124426c/invoke.js",
];

async function exists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function findBuildOutput(rootDir) {
  const vercelDir = path.join(rootDir, ".vercel", "output");
  const nitroDir = path.join(rootDir, ".output");
  const vercelServer = path.join(vercelDir, "functions", "__server.func", "index.mjs");
  const nitroServer = path.join(nitroDir, "server", "index.mjs");

  if (await exists(vercelServer)) {
    return {
      label: ".vercel/output",
      buildDir: vercelDir,
      staticDir: path.join(vercelDir, "static"),
    };
  }

  if (await exists(nitroServer)) {
    return {
      label: ".output",
      buildDir: nitroDir,
      staticDir: path.join(nitroDir, "public"),
    };
  }

  throw new Error(
    "Missing Nitro build output. Expected either .vercel/output/functions/__server.func/index.mjs or .output/server/index.mjs.",
  );
}

async function walkFiles(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(entryPath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

async function findFirstFontAsset(staticDir) {
  const files = await walkFiles(staticDir);
  return files.find((filePath) => /\.(woff2?|ttf|otf)$/i.test(filePath));
}

function decodeHtmlEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'");
}

function normalizeExpectedPath(routePath) {
  const url = new URL(routePath, SITE_URL);
  return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
}

function normalizeActualPath(value) {
  const url = new URL(value, SITE_URL);
  return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
}

function expectCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function extractMatch(text, patterns, label) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) {
      return decodeHtmlEntities(match[1]);
    }
  }

  throw new Error(`Missing ${label}.`);
}

function getTitle(html) {
  return extractMatch(html, [/<title[^>]*>([^<]+)<\/title>/i], "title");
}

function getCanonical(html) {
  return extractMatch(
    html,
    [
      /<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["'][^>]*>/i,
      /<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\brel=["']canonical["'][^>]*>/i,
    ],
    "canonical link",
  );
}

function getOpenGraphUrl(html) {
  return extractMatch(
    html,
    [
      /<meta\b[^>]*\bproperty=["']og:url["'][^>]*\bcontent=["']([^"']+)["'][^>]*>/i,
      /<meta\b[^>]*\bcontent=["']([^"']+)["'][^>]*\bproperty=["']og:url["'][^>]*>/i,
    ],
    "Open Graph url",
  );
}

function getStylesheetPath(html) {
  return extractMatch(
    html,
    [/<link\b[^>]*\bhref=["']([^"']*\/_next\/static\/css\/[^"']+\.css)["'][^>]*>/i],
    "stylesheet href",
  );
}

function getImageOptimizerPath(html) {
  return extractMatch(
    html,
    [
      /(\/_next\/image\?[^"' <]+)/i,
    ],
    "next/image asset",
  );
}

async function reservePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  const port = typeof address === "object" && address ? address.port : null;

  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });

  if (!port) {
    throw new Error("Unable to reserve a preview port.");
  }

  return port;
}

function getPreviewCommand(port) {
  if (process.platform === "win32") {
    return {
      command: "cmd.exe",
      args: ["/d", "/s", "/c", `npx nitro preview --port ${port}`],
    };
  }

  return {
    command: "npx",
    args: ["nitro", "preview", "--port", String(port)],
  };
}

async function waitForPreview(baseUrl, child, logBuffer) {
  const timeoutAt = Date.now() + 30_000;
  const targetUrl = `${baseUrl}/robots.txt`;

  while (Date.now() < timeoutAt) {
    if (child.exitCode !== null) {
      throw new Error(
        `Preview server exited before becoming ready.\n${logBuffer.join("\n")}`.trim(),
      );
    }

    try {
      const response = await fetch(targetUrl, { redirect: "manual" });
      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until timeout.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for Nitro preview at ${baseUrl}.\n${logBuffer.join("\n")}`.trim());
}

async function startPreview(rootDir) {
  const port = Number(process.env.CHECK_PRODUCTION_PORT) || (await reservePort());
  const baseUrl = `http://127.0.0.1:${port}`;
  const logBuffer = [];
  const previewCommand = getPreviewCommand(port);
  const child = spawn(previewCommand.command, previewCommand.args, {
    cwd: rootDir,
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");

  child.stdout.on("data", (chunk) => {
    logBuffer.push(String(chunk).trim());
  });
  child.stderr.on("data", (chunk) => {
    logBuffer.push(String(chunk).trim());
  });

  await waitForPreview(baseUrl, child, logBuffer);

  return {
    baseUrl,
    logBuffer,
    async stop() {
      if (child.exitCode !== null) {
        return;
      }

      if (process.platform === "win32") {
        const killer = spawn("taskkill.exe", ["/pid", String(child.pid), "/t", "/f"], {
          stdio: "ignore",
        });

        await new Promise((resolve) => {
          killer.once("exit", resolve);
          killer.once("error", resolve);
        });

        return;
      }

      child.kill("SIGTERM");
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          if (child.exitCode === null) {
            child.kill("SIGKILL");
          }
        }, 2_000);

        child.once("exit", () => {
          clearTimeout(timeout);
          resolve();
        });
      });
    },
  };
}

async function fetchText(baseUrl, routePath) {
  const response = await fetch(`${baseUrl}${routePath}`, { redirect: "manual" });
  const text = await response.text();

  expectCondition(response.ok, `${routePath} returned ${response.status}.`);
  expectCondition(!text.includes(FORBIDDEN_PRODUCTION_ORIGIN), `${routePath} contains ${FORBIDDEN_PRODUCTION_ORIGIN}.`);

  return {
    response,
    text,
  };
}

function assertAbsoluteSiteUrl(value, label, expectedPath) {
  const url = new URL(value, SITE_URL);
  expectCondition(url.protocol === "https:", `${label} must use HTTPS. Received ${value}.`);
  expectCondition(url.host === "www.ms2guide.site", `${label} must use www.ms2guide.site. Received ${value}.`);
  expectCondition(
    normalizeActualPath(url.toString()) === normalizeExpectedPath(expectedPath),
    `${label} path mismatch. Expected ${expectedPath}, received ${url.pathname}.`,
  );
}

async function assertHtmlPage(baseUrl, routePath) {
  const { response, text } = await fetchText(baseUrl, routePath);
  const contentType = response.headers.get("content-type") ?? "";

  expectCondition(contentType.includes("text/html"), `${routePath} must return HTML, received ${contentType || "unknown"}.`);
  expectCondition(getTitle(text).trim().length > 0, `${routePath} is missing a non-empty <title>.`);

  const canonical = getCanonical(text);
  const ogUrl = getOpenGraphUrl(text);
  assertAbsoluteSiteUrl(canonical, `${routePath} canonical`, routePath);
  assertAbsoluteSiteUrl(ogUrl, `${routePath} og:url`, routePath);

  for (const marker of AD_MARKERS) {
    expectCondition(text.includes(marker), `${routePath} is missing ad marker: ${marker}.`);
  }

  return text;
}

async function assertRobots(baseUrl) {
  const { response, text } = await fetchText(baseUrl, "/robots.txt");
  const contentType = response.headers.get("content-type") ?? "";

  expectCondition(contentType.includes("text/plain"), `robots.txt must return text/plain, received ${contentType || "unknown"}.`);
  expectCondition(
    text.includes("Sitemap: https://www.ms2guide.site/sitemap.xml"),
    "robots.txt must point to the HTTPS production sitemap.",
  );
}

async function assertSitemap(baseUrl) {
  const { response, text } = await fetchText(baseUrl, "/sitemap.xml");
  const contentType = response.headers.get("content-type") ?? "";
  const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1].trim());

  expectCondition(contentType.includes("xml"), `sitemap.xml must return XML, received ${contentType || "unknown"}.`);
  expectCondition(locs.length === 90, `sitemap.xml must contain 90 URLs, found ${locs.length}.`);
  expectCondition(locs.every((loc) => loc.startsWith(`${SITE_URL}/`) || loc === SITE_URL), "sitemap.xml must use only HTTPS production URLs.");
  expectCondition(!locs.some((loc) => loc.startsWith(FORBIDDEN_PRODUCTION_ORIGIN)), `sitemap.xml contains ${FORBIDDEN_PRODUCTION_ORIGIN}.`);
}

async function assertStylesheetAndFonts(baseUrl, html, staticDir) {
  const stylesheetPath = getStylesheetPath(html);
  const stylesheetResponse = await fetch(`${baseUrl}${stylesheetPath}`);
  const stylesheetText = await stylesheetResponse.text();
  const fontAssetPath = await findFirstFontAsset(staticDir);

  expectCondition(stylesheetResponse.ok, `Stylesheet ${stylesheetPath} failed with ${stylesheetResponse.status}.`);
  expectCondition(
    (stylesheetResponse.headers.get("content-type") ?? "").includes("text/css"),
    `Stylesheet ${stylesheetPath} must return CSS.`,
  );
  expectCondition(
    stylesheetText.includes("--font-interface") && stylesheetText.includes("--font-display"),
    "Stylesheet is missing next/font/google CSS variables.",
  );
  expectCondition(fontAssetPath, "No built font asset was found in the Nitro output.");

  const publicFontPath = `/${path.relative(staticDir, fontAssetPath).replaceAll(path.sep, "/")}`;
  const fontResponse = await fetch(`${baseUrl}${publicFontPath}`);
  const fontContentType = fontResponse.headers.get("content-type") ?? "";

  expectCondition(fontResponse.ok, `Font asset ${publicFontPath} failed with ${fontResponse.status}.`);
  expectCondition(
    fontContentType.includes("font") || fontContentType.includes("application/octet-stream"),
    `Font asset ${publicFontPath} returned unexpected content type ${fontContentType || "unknown"}.`,
  );
}

async function assertImageOptimizer(baseUrl, html) {
  const imagePath = getImageOptimizerPath(html);
  const imageResponse = await fetch(`${baseUrl}${imagePath}`);
  const imageContentType = imageResponse.headers.get("content-type") ?? "";

  expectCondition(imageResponse.ok, `next/image asset ${imagePath} failed with ${imageResponse.status}.`);
  expectCondition(
    imageContentType.startsWith("image/"),
    `next/image asset ${imagePath} returned unexpected content type ${imageContentType || "unknown"}.`,
  );
}

async function main() {
  const rootDir = process.cwd();
  const buildOutput = await findBuildOutput(rootDir);
  const preview = await startPreview(rootDir);

  try {
    console.log(`Checking production output from ${buildOutput.label} via ${preview.baseUrl}`);

    const homeHtml = await assertHtmlPage(preview.baseUrl, "/");
    await assertHtmlPage(preview.baseUrl, "/guides/mortal-shell-ii-guide");
    await assertHtmlPage(preview.baseUrl, "/de/guides/mortal-shell-ii-guide");
    await assertRobots(preview.baseUrl);
    await assertSitemap(preview.baseUrl);
    await assertImageOptimizer(preview.baseUrl, homeHtml);
    await assertStylesheetAndFonts(preview.baseUrl, homeHtml, buildOutput.staticDir);

    console.log(`PASS ${URLS.join(", ")}`);
    console.log("PASS canonical, og:url, ads, robots, sitemap, next/image, and next/font/google checks");
  } finally {
    await preview.stop();
  }
}

main().catch((error) => {
  console.error(`FAIL ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
