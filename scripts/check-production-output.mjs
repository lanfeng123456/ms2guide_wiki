import { readFile, stat } from "node:fs/promises";
import { serve } from "srvx";
import net from "node:net";
import path from "node:path";
import process from "node:process";
import {
  assertAbsoluteSiteUrl,
  extractFontAssetPathFromStylesheet,
  extractFontStylesheetFromHtml,
  fetchWithTimeout,
  findForbiddenProductionUrls,
  resolveStaticMiddleware,
  resolveBuildRuntimePaths,
  SITE_URL,
  waitForPreviewWithCleanup,
} from "./production-output-check.mjs";

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
const REQUEST_TIMEOUT_MS = 10_000;
const READINESS_REQUEST_TIMEOUT_MS = 2_000;

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
    };
  }

  if (await exists(nitroServer)) {
    return {
      label: ".output",
      buildDir: nitroDir,
    };
  }

  throw new Error(
    "Missing Nitro build output. Expected either .vercel/output/functions/__server.func/index.mjs or .output/server/index.mjs.",
  );
}

function decodeHtmlEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'");
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

async function waitForPreview(baseUrl, logBuffer) {
  const timeoutAt = Date.now() + 30_000;
  const targetUrl = `${baseUrl}/robots.txt`;

  while (Date.now() < timeoutAt) {
    try {
      const response = await fetchWithTimeout(
        fetch,
        targetUrl,
        { redirect: "manual" },
        READINESS_REQUEST_TIMEOUT_MS,
      );
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

async function readBuildInfo(buildDir) {
  const buildInfoPath = path.join(buildDir, "nitro.json");
  const buildInfoText = await readFile(buildInfoPath, "utf8");

  return JSON.parse(buildInfoText);
}

async function startPreview(buildOutput) {
  const port = Number(process.env.CHECK_PRODUCTION_PORT) || (await reservePort());
  const baseUrl = `http://127.0.0.1:${port}`;
  const buildInfo = await readBuildInfo(buildOutput.buildDir);
  const runtimePaths = resolveBuildRuntimePaths(buildOutput.buildDir, buildInfo);
  const logBuffer = [
    `Selected build directory: ${buildOutput.buildDir}`,
    `Server entry: ${runtimePaths.serverEntry}`,
    `Static directory: ${runtimePaths.publicDir}`,
  ];
  const { loadServerEntry } = await import("srvx/loader");
  const staticModule = await import("srvx/static");
  const entry = await loadServerEntry({
    entry: runtimePaths.serverEntry,
  });
  const staticHandler = resolveStaticMiddleware(staticModule)({ dir: runtimePaths.publicDir });
  const originalFetchHandler = entry.fetch ?? (() => Promise.resolve(new Response("Not Found", { status: 404 })));
  const fetchHandler = async (req) => {
    const staticResponse = await staticHandler(req, () => void 0);

    if (staticResponse) {
      return staticResponse;
    }

    return originalFetchHandler(req);
  };
  const server = serve({
    fetch(req) {
      return fetchHandler(req);
    },
    gracefulShutdown: false,
    hostname: "127.0.0.1",
    port,
  });

  await waitForPreviewWithCleanup(
    async () => {
      if (entry.upgrade) {
        server.node?.server?.on("upgrade", (req, socket, head) => {
          entry.upgrade(req, socket, head);
        });
      }

      await waitForPreview(baseUrl, logBuffer);
    },
    () => server.close(),
  );

  return {
    baseUrl,
    logBuffer,
    async stop() {
      await server.close();
    },
  };
}

async function fetchText(baseUrl, routePath) {
  const response = await fetchWithTimeout(
    fetch,
    `${baseUrl}${routePath}`,
    { redirect: "manual" },
    REQUEST_TIMEOUT_MS,
  );
  const text = await response.text();
  const forbiddenProductionUrls = findForbiddenProductionUrls(text);

  expectCondition(response.ok, `${routePath} returned ${response.status}.`);
  expectCondition(
    forbiddenProductionUrls.length === 0,
    `${routePath} contains non-canonical production URL(s): ${forbiddenProductionUrls.join(", ")}.`,
  );

  return {
    response,
    text,
  };
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
}

async function assertStylesheetAndFonts(baseUrl, html) {
  const stylesheetPath = getStylesheetPath(html);
  const stylesheetResponse = await fetchWithTimeout(
    fetch,
    `${baseUrl}${stylesheetPath}`,
    {},
    REQUEST_TIMEOUT_MS,
  );
  const stylesheetText = await stylesheetResponse.text();

  expectCondition(stylesheetResponse.ok, `Stylesheet ${stylesheetPath} failed with ${stylesheetResponse.status}.`);
  expectCondition(
    (stylesheetResponse.headers.get("content-type") ?? "").includes("text/css"),
    `Stylesheet ${stylesheetPath} must return CSS.`,
  );
  expectCondition(
    stylesheetText.includes("--font-interface") && stylesheetText.includes("--font-display"),
    "Stylesheet is missing next/font/google CSS variables.",
  );
  const renderedFontStylesheet = extractFontStylesheetFromHtml(html);
  const fontAssetPath = extractFontAssetPathFromStylesheet(renderedFontStylesheet);
  const fontResponse = await fetchWithTimeout(
    fetch,
    `${baseUrl}${fontAssetPath}`,
    {},
    REQUEST_TIMEOUT_MS,
  );
  const fontContentType = fontResponse.headers.get("content-type") ?? "";

  expectCondition(fontResponse.ok, `Font asset ${fontAssetPath} failed with ${fontResponse.status}.`);
  expectCondition(
    fontContentType.includes("font") || fontContentType.includes("application/octet-stream"),
    `Font asset ${fontAssetPath} returned unexpected content type ${fontContentType || "unknown"}.`,
  );
}

async function assertImageOptimizer(baseUrl, html) {
  const imagePath = getImageOptimizerPath(html);
  const imageResponse = await fetchWithTimeout(
    fetch,
    `${baseUrl}${imagePath}`,
    {},
    REQUEST_TIMEOUT_MS,
  );
  const imageContentType = imageResponse.headers.get("content-type") ?? "";

  expectCondition(imageResponse.ok, `next/image asset ${imagePath} failed with ${imageResponse.status}.`);
  expectCondition(
    imageContentType.startsWith("image/"),
    `next/image asset ${imagePath} returned unexpected content type ${imageContentType || "unknown"}.`,
  );
}

async function main() {
  const buildOutput = await findBuildOutput(process.cwd());
  const preview = await startPreview(buildOutput);

  try {
    console.log(`Checking production output from ${buildOutput.label} via ${preview.baseUrl}`);

    const homeHtml = await assertHtmlPage(preview.baseUrl, "/");
    await assertHtmlPage(preview.baseUrl, "/guides/mortal-shell-ii-guide");
    await assertHtmlPage(preview.baseUrl, "/de/guides/mortal-shell-ii-guide");
    await assertRobots(preview.baseUrl);
    await assertSitemap(preview.baseUrl);
    await assertImageOptimizer(preview.baseUrl, homeHtml);
    await assertStylesheetAndFonts(preview.baseUrl, homeHtml);

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
