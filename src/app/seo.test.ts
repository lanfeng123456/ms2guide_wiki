import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Archivo: () => ({ variable: "archivo" }),
  Cormorant_Garamond: () => ({ variable: "cormorant" }),
}));

import robots from "./robots";
import sitemap from "./sitemap";
import { metadata as rootMetadata } from "./layout";
import { generateMetadata as generateGuideMetadata } from "./guides/[slug]/page";
import { innerPageSlugs } from "@/data/inner-pages";

const siteUrl = "https://www.ms2guide.site";

describe("search engine route output", () => {
  it("publishes every public route exactly once", () => {
    const urls = sitemap().map((entry) => entry.url);
    const expectedPaths = [
      "/",
      "/de/",
      "/fr/",
      "/pt-br/",
      ...innerPageSlugs.map((slug) => `/guides/${slug}`),
      ...["de", "fr", "pt-br"].flatMap((locale) =>
        innerPageSlugs.map((slug) => `/${locale}/guides/${slug}`)
      ),
      "/privacy-policy",
      "/terms-of-service",
    ];

    expect(urls).toEqual(expectedPaths.map((path) => `${siteUrl}${path}`));
    expect(urls).toHaveLength(90);
    expect(new Set(urls)).toHaveProperty("size", 90);
    for (const url of urls) {
      expect(() => new URL(url)).not.toThrow();
    }
  });

  it("points crawlers to the same absolute sitemap URL", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${siteUrl}/sitemap.xml`,
    });
  });

  it("publishes the canonical origin for metadata and guide pages", async () => {
    expect(rootMetadata.metadataBase?.toString()).toBe("https://www.ms2guide.site/");
    expect(rootMetadata.alternates?.canonical).toBe("/");

    const guideMetadata = await generateGuideMetadata({
      params: Promise.resolve({ slug: "mortal-shell-ii-guide" }),
    });

    expect(guideMetadata.alternates?.canonical).toBe("/guides/mortal-shell-ii-guide");
  });
});
