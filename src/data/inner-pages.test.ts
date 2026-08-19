import { describe, expect, it } from "vitest";
import { innerPageSlugs, innerPages, getInnerPage } from "./inner-pages";
import { homeContent } from "./home";

describe("inner page registry", () => {
  it("covers every keyword exactly once with usable content", () => {
    expect(innerPageSlugs).toHaveLength(21);
    expect(new Set(innerPageSlugs).size).toBe(21);
    expect(Object.keys(innerPages)).toHaveLength(21);

    for (const slug of innerPageSlugs) {
      const page = getInnerPage(slug);
      expect(page?.keyword).toContain("Mortal Shell II");
      expect(page?.sections.length).toBeGreaterThanOrEqual(3);
      expect(page?.sources.length).toBeGreaterThanOrEqual(1);
      expect(page?.updateWatch.length).toBeGreaterThan(0);
    }
  });

  it("keeps homepage field-index links aligned with the registry", () => {
    const links = homeContent.guideGroups.flatMap((group) => group.items).map((item) => item.href).filter((href) => href.startsWith("/guides/"));
    const slugs = links.map((href) => href.replace("/guides/", "").split("#")[0]);
    expect(new Set(slugs)).toEqual(new Set(innerPageSlugs));
  });
});
