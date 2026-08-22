import { describe, expect, it } from "vitest";

import { getGuide, getGuideParams, getGuideRecords } from "@/lib/content/guides";

describe("guide content index", () => {
  it("loads the English guide fixture by locale and slug", () => {
    const guide = getGuide("mortal-shell-ii-guide", "en");

    expect(guide?.record.title).toBe("Mortal Shell II Beginner Guide");
    expect(guide?.record.quickAnswer).toBe(
      "Mortal Shell II removes the traditional stamina bar. Prioritize learning Harden timing, posture breaks, Resolve use, Shell possession, and a safe route between Beacons and Marrow Keep before chasing optional loot.",
    );
  });

  it("exposes indexed params and records", () => {
    expect(getGuideParams()).toEqual([{ slug: "mortal-shell-ii-guide", locale: "en" }]);
    expect(getGuideRecords()).toHaveLength(1);
    expect(getGuideRecords()[0]?.record.slug).toBe("mortal-shell-ii-guide");
  });
});
