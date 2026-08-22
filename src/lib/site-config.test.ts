import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "./site-config";

describe("site URL configuration", () => {
  it("normalizes the production origin to HTTPS and www", () => {
    expect(resolveSiteUrl("http://ms2guide.site/")).toBe("https://www.ms2guide.site");
    expect(resolveSiteUrl("https://ms2guide.site")).toBe("https://www.ms2guide.site");
    expect(resolveSiteUrl("https://www.ms2guide.site/")).toBe("https://www.ms2guide.site");
  });

  it("falls back to the canonical production origin for an invalid value", () => {
    expect(resolveSiteUrl("not a URL")).toBe("https://www.ms2guide.site");
  });
});
