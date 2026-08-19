import { describe, expect, it } from "vitest";
import { getLocalizedHomeContent, localeFromPathname, localizedPath } from "./locales";

describe("homepage localization", () => {
  it("translates core homepage content into German", () => {
    const content = getLocalizedHomeContent("de");

    expect(content.hero.primaryCta.label).toBe("Leitfaden starten");
    expect(content.start.eyebrow).toBe("Hier beginnen");
    expect(content.about.title).toBe("Was ist Mortal Shell II?");
  });

  it("resolves supported locale prefixes", () => {
    expect(localeFromPathname("/fr/guides/example")).toBe("fr");
    expect(localeFromPathname("/guides/example")).toBe("en");
  });

  it("keeps the current path when switching languages", () => {
    expect(localizedPath("/de/guides/example", "pt-br")).toBe("/pt-br/guides/example");
    expect(localizedPath("/fr", "en")).toBe("/");
  });
});
