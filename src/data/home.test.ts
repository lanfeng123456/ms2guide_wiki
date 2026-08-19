import { describe, expect, it } from "vitest";
import { homeContent } from "./home";

describe("homeContent", () => {
  it("provides the complete hero and start-here content", () => {
    expect(homeContent.hero.stats).toHaveLength(5);
    expect(homeContent.start.cards).toHaveLength(4);
  });

  it("covers every planned inner-page keyword exactly once", () => {
    const guides = homeContent.guideGroups.flatMap((group) => group.items);
    const labels = guides.map((guide) => guide.label);

    expect(guides).toHaveLength(21);
    expect(new Set(labels)).toHaveLength(21);
  });

  it("provides all documented game facts", () => {
    expect(homeContent.about.stats).toHaveLength(7);
    expect(homeContent.about.stats).toContainEqual({
      label: "Playable Shells",
      value: "8",
    });
  });
});
