import { describe, expect, it } from "vitest";

import { getInnerPage, innerPageSlugs } from "@/data/inner-pages";
import { locales } from "@/data/locales";
import { getGuide, getGuideParams, getGuideRecords } from "@/lib/content/guides";

describe("guide content index", () => {
  it("loads the English guide fixture by locale and slug", () => {
    const guide = getGuide("mortal-shell-ii-guide", "en");

    expect(guide?.record.title).toBe("Mortal Shell II Beginner Guide");
    expect(guide?.record.quickAnswer).toBe(
      "Mortal Shell II removes the traditional stamina bar. Prioritize learning Harden timing, posture breaks, Resolve use, Shell possession, and a safe route between Beacons and Marrow Keep before chasing optional loot.",
    );
  });

  it("indexes every legacy guide in every supported locale", () => {
    expect(getGuideParams()).toHaveLength(innerPageSlugs.length * locales.length);
    expect(getGuideRecords()).toHaveLength(innerPageSlugs.length * locales.length);

    for (const locale of locales) {
      for (const slug of innerPageSlugs) {
        expect(getGuide(slug, locale)?.record).toMatchObject(getInnerPage(slug, locale)!);
      }
    }
  });
});
