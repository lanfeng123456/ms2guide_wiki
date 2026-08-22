import { describe, expect, it } from "vitest";

import { getInnerPage, innerPageSlugs } from "@/data/inner-pages";
import { locales } from "@/data/locales";
import {
  createGuideIndexFromSources,
  getGuide,
  getGuideParams,
  getGuideRecords,
} from "@/lib/content/guides";

function createGuideSource({
  slug,
  locale = "en",
  sourceHref = "https://example.com/official",
  related = [],
}: {
  slug: string;
  locale?: "en" | "de";
  sourceHref?: string;
  related?: string[];
}) {
  const relatedYaml = related.length > 0
    ? `\n${related.map((relatedSlug) => `  - ${relatedSlug}`).join("\n")}`
    : " []";

  return `---
slug: ${slug}
locale: ${locale}
status: Verified
keyword: Mortal Shell II ${slug}
title: Mortal Shell II ${slug}
description: Test guide for ${slug}.
eyebrow: Mortal Shell II Field Guide
checked: Checked Aug 22, 2026
quickAnswer: Test answer.
updateWatch: Test update watch.
sources:
  - label: Official website
    href: ${sourceHref}
related:${relatedYaml}
---

## Test section

Test introduction.

- Test detail
`;
}

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

  it("rejects source links that are not absolute HTTP or HTTPS URLs", () => {
    expect(() =>
      createGuideIndexFromSources({
        "src/content/guides/en/invalid-source.mdx": createGuideSource({
          slug: "invalid-source",
          sourceHref: "javascript:alert(1)",
        }),
      }),
    ).toThrow(/source.*http|http.*source/i);
  });

  it("rejects related slugs that do not exist in the same locale", () => {
    expect(() =>
      createGuideIndexFromSources({
        "src/content/guides/en/source-guide.mdx": createGuideSource({
          slug: "source-guide",
          related: ["target-guide"],
        }),
        "src/content/guides/de/target-guide.mdx": createGuideSource({
          slug: "target-guide",
          locale: "de",
        }),
      }),
    ).toThrow(/en:target-guide|same locale/i);
  });
});
