// @vitest-environment node

import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  extractFontAssetPathFromStylesheet,
  extractFontStylesheetFromHtml,
  findForbiddenProductionUrls,
  resolveBuildRuntimePaths,
} from "../../scripts/production-output-check.mjs";

describe("production output checker helpers", () => {
  it("resolves runtime paths from the selected build artifact", () => {
    const buildDir = path.join("C:", "deploy", ".vercel", "output");
    const runtimePaths = resolveBuildRuntimePaths(buildDir, {
      serverEntry: "functions/__server.func/index.mjs",
      publicDir: "static",
    });

    expect(runtimePaths).toEqual({
      serverEntry: path.resolve(buildDir, "functions/__server.func/index.mjs"),
      publicDir: path.resolve(buildDir, "static"),
    });
  });

  it("rejects runtime paths in a sibling artifact with the same prefix", () => {
    const buildDir = path.resolve("deploy", ".vercel", "output");

    expect(() =>
      resolveBuildRuntimePaths(buildDir, {
        serverEntry: "../output-stale/functions/__server.func/index.mjs",
        publicDir: "static",
      }),
    ).toThrow("nitro.json resolves outside the selected build artifact.");
  });

  it("rejects http and non-www production-host leakage but allows canonical and external URLs", () => {
    const text = `
      <link rel="canonical" href="https://www.ms2guide.site/guides/mortal-shell-ii-guide" />
      <meta property="og:url" content="https://www.ms2guide.site/guides/mortal-shell-ii-guide" />
      <a href="https://ms2guide.site/guides/mortal-shell-ii-guide">bad non-www https</a>
      <a href="http://ms2guide.site/guides/mortal-shell-ii-guide">bad non-www http</a>
      <a href="http://www.ms2guide.site/guides/mortal-shell-ii-guide">bad www http</a>
      <script src="https://www.highperformanceformat.com/2c3fe3a93001bf85947eefe6b471c0f5/invoke.js"></script>
    `;

    expect(findForbiddenProductionUrls(text)).toEqual([
      "https://ms2guide.site/guides/mortal-shell-ii-guide",
      "http://ms2guide.site/guides/mortal-shell-ii-guide",
      "http://www.ms2guide.site/guides/mortal-shell-ii-guide",
    ]);
  });

  it("extracts the rendered next/font asset path from the referenced stylesheet", () => {
    const css = `
      .example { background-image: url(/_next/static/media/not-a-font.woff2); }
      :root { --font-interface: "__Interface_123"; --font-display: "__Display_456"; }
      @font-face {
        font-family: "__Interface_123";
        src: url(/_next/static/media/3f6dd1f5f9c8b7f4-s.p.woff2) format("woff2");
      }
    `;

    expect(extractFontAssetPathFromStylesheet(css)).toBe(
      "/_next/static/media/3f6dd1f5f9c8b7f4-s.p.woff2",
    );
  });

  it("extracts the inline font stylesheet rendered by vinext", () => {
    const html = `
      <link rel="stylesheet" href="/_next/static/css/layout.css" />
      <style data-unrelated>body { color: white; }</style>
      <style data-vinext-fonts>
        @font-face {
          font-family: "__Interface_123";
          src: url(/_next/static/_vinext_fonts/archivo/font.woff2) format("woff2");
        }
      </style>
    `;

    expect(extractFontStylesheetFromHtml(html)).toContain(
      "/_next/static/_vinext_fonts/archivo/font.woff2",
    );
  });
});
