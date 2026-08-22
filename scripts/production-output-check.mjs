import path from "node:path";

export const SITE_URL = "https://www.ms2guide.site";

const CANONICAL_PRODUCTION_ORIGIN = new URL(SITE_URL).origin;
const PRODUCTION_HOSTS = new Set(["ms2guide.site", "www.ms2guide.site"]);
const ABSOLUTE_URL_PATTERN = /https?:\/\/[^\s"'<>]+/gi;
const FONT_FACE_PATTERN = /@font-face\s*\{([\s\S]*?)\}/gi;
const FONT_URL_PATTERN = /url\((['"]?)(\/_next\/static\/[^)'"]+\.(?:woff2?|ttf|otf))\1\)/i;
const RENDERED_FONT_STYLESHEET_PATTERN =
  /<style\b(?=[^>]*\bdata-vinext-fonts(?:\s|=|>))[^>]*>([\s\S]*?)<\/style>/i;

function isWithinDirectory(root, targetPath) {
  const relativePath = path.relative(root, targetPath);

  return (
    relativePath === "" ||
    (relativePath !== ".." &&
      !relativePath.startsWith(`..${path.sep}`) &&
      !path.isAbsolute(relativePath))
  );
}

export function resolveBuildRuntimePaths(buildDir, buildInfo) {
  if (!buildInfo?.serverEntry || !buildInfo?.publicDir) {
    throw new Error("nitro.json is missing serverEntry or publicDir.");
  }

  const root = path.resolve(buildDir);
  const serverEntry = path.resolve(root, buildInfo.serverEntry);
  const publicDir = path.resolve(root, buildInfo.publicDir);

  if (!isWithinDirectory(root, serverEntry) || !isWithinDirectory(root, publicDir)) {
    throw new Error("nitro.json resolves outside the selected build artifact.");
  }

  return {
    serverEntry,
    publicDir,
  };
}

export function findForbiddenProductionUrls(text) {
  const forbiddenUrls = [];

  for (const match of text.matchAll(ABSOLUTE_URL_PATTERN)) {
    const candidate = match[0].replace(/[),.;]+$/u, "");

    try {
      const url = new URL(candidate);

      if (!PRODUCTION_HOSTS.has(url.hostname)) {
        continue;
      }

      if (url.origin === CANONICAL_PRODUCTION_ORIGIN) {
        continue;
      }

      forbiddenUrls.push(candidate);
    } catch {
      // Ignore non-URL text fragments that happen to match the broad extractor.
    }
  }

  return [...new Set(forbiddenUrls)];
}

export function extractFontAssetPathFromStylesheet(stylesheetText) {
  for (const fontFaceMatch of stylesheetText.matchAll(FONT_FACE_PATTERN)) {
    const fontUrlMatch = fontFaceMatch[1].match(FONT_URL_PATTERN);

    if (fontUrlMatch?.[2]) {
      return fontUrlMatch[2];
    }
  }

  throw new Error("Stylesheet is missing a next/font/google asset URL.");
}

export function extractFontStylesheetFromHtml(html) {
  const match = html.match(RENDERED_FONT_STYLESHEET_PATTERN);

  if (!match?.[1]) {
    throw new Error("Rendered page is missing the next/font/google stylesheet.");
  }

  return match[1];
}
