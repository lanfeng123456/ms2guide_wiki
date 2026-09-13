import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Archivo: () => ({ variable: "archivo" }),
  Cormorant_Garamond: () => ({ variable: "cormorant" }),
}));

import robots from "./robots";
import sitemap from "./sitemap";
import { metadata as rootMetadata } from "./layout";
import { generateMetadata as generateGuideMetadata } from "./guides/[slug]/page";
import { getGuideParams } from "@/lib/content/guides";

const siteUrl = "https://www.ms2guide.site";

describe("search engine route output", () => {
  it("keeps the sitemap at 90 HTTPS URLs after MDX migration", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);
    const guidePaths = getGuideParams().map(({ locale, slug }) =>
      locale === "en" ? `/guides/${slug}` : `/${locale}/guides/${slug}`,
    );
    const expectedPaths = [
      "/",
      "/de",
      "/fr",
      "/pt-br",
      ...guidePaths,
      "/privacy-policy",
      "/terms-of-service",
    ];

    expect(urls).toEqual(expectedPaths.map((path) => `${siteUrl}${path}`));
    expect(urls).toHaveLength(90);
    expect(new Set(urls)).toHaveProperty("size", 90);
    expect(urls.every((url) => url.startsWith(`${siteUrl}/`))).toBe(true);
    expect(urls.filter((url) => url.includes("/guides/"))).toHaveLength(84);
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
