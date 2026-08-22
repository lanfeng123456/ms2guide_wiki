import { describe, expect, it } from "vitest";
import { parseGuideDocument } from "@/lib/content/parse-guide";

describe("parseGuideDocument", () => {
  it("parses a full guide document into typed record sections", () => {
    const source = `---
slug: verified-details
locale: en
status: Verified
keyword: Mortal Shell II verified details
title: Mortal Shell II Verified Details
description: Verified guide content for Mortal Shell II.
eyebrow: Mortal Shell II Field Guide
checked: Checked Aug 22, 2026
quickAnswer: This guide is verified.
updateWatch: Recheck the sources after launch.
sources:
  - label: Official website
    href: https://example.com/official
related:
  - mortal-shell-ii-guide
---

Guide introduction paragraph.

## Verified details

This section is checked.

- First detail
- Second detail
`;

    const result = parseGuideDocument(source, "src/content/guides/en/example.mdx");

    expect(result.sourcePath).toBe("src/content/guides/en/example.mdx");
    expect(result.body).toContain("Guide introduction paragraph.");
    expect(result.record.sections).toEqual([
      {
        title: "Verified details",
        intro: "This section is checked.",
        bullets: ["First detail", "Second detail"],
      },
    ]);
  });

  it("rejects guide frontmatter when required fields are missing", () => {
    expect(() => parseGuideDocument("---\ntitle: incomplete\n---", "broken.mdx")).toThrow(/slug|locale|status/i);
  });

  it("rejects invalid section structure with the source path in the error", () => {
    const source = `---
slug: broken-sections
locale: en
status: Verified
keyword: Mortal Shell II broken sections
title: Mortal Shell II Broken Sections
description: Invalid guide content for Mortal Shell II.
eyebrow: Mortal Shell II Field Guide
checked: Checked Aug 22, 2026
quickAnswer: This guide is verified.
updateWatch: Recheck the sources after launch.
sources:
  - label: Official website
    href: https://example.com/official
related:
  - mortal-shell-ii-guide
---

Guide introduction paragraph.

## Broken details

This section is checked.

First detail
Second detail
`;

    expect(() => parseGuideDocument(source, "src/content/guides/en/broken-sections.mdx")).toThrow(
      /src\/content\/guides\/en\/broken-sections\.mdx/i,
    );
  });

  it("includes the source path when frontmatter parsing fails", () => {
    const source = `---
slug: [unterminated
---`;

    expect(() => parseGuideDocument(source, "src/content/guides/en/invalid-frontmatter.mdx")).toThrow(
      /src\/content\/guides\/en\/invalid-frontmatter\.mdx/i,
    );
  });
});
