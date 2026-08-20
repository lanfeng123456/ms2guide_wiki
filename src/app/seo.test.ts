import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";
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
});
