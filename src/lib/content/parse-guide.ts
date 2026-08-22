import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";

import type { GuideDocument, GuideFrontmatter, GuideLocale, GuideSection, GuideSource, GuideStatus } from "./schema";
import { supportedGuideLocales } from "./schema";

type UnknownNode = {
  type: string;
  value?: unknown;
  depth?: unknown;
  ordered?: unknown;
  children?: UnknownNode[];
};

const validStatuses: GuideStatus[] = ["Verified", "Beta evidence", "Update watch"];

function fail(sourcePath: string, message: string): never {
  throw new Error(`[${sourcePath}] ${message}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown, field: string, sourcePath: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    fail(sourcePath, `Invalid or missing required field: ${field}`);
  }
  return value;
}

function readLocale(value: unknown, sourcePath: string): GuideLocale {
  const locale = readString(value, "locale", sourcePath).toLowerCase();
  if (!supportedGuideLocales.includes(locale as GuideLocale)) {
    fail(sourcePath, `Unsupported locale: ${locale}`);
  }
  return locale as GuideLocale;
}

function readStatus(value: unknown, sourcePath: string): GuideStatus {
  const status = readString(value, "status", sourcePath);
  if (!validStatuses.includes(status as GuideStatus)) {
    fail(sourcePath, `Unsupported status: ${status}`);
  }
  return status as GuideStatus;
}

function readSources(value: unknown, sourcePath: string): GuideSource[] {
  if (!Array.isArray(value) || value.length === 0) {
    fail(sourcePath, "Invalid or missing required field: sources");
  }

  return value.map((item, index) => {
    if (!isRecord(item)) {
      fail(sourcePath, `Invalid source entry at index ${index}`);
    }

    return {
      label: readString(item.label, `sources[${index}].label`, sourcePath),
      href: readString(item.href, `sources[${index}].href`, sourcePath),
    };
  });
}

function readRelated(value: unknown, sourcePath: string): string[] {
  if (!Array.isArray(value)) {
    fail(sourcePath, "Invalid or missing required field: related");
  }

  return value.map((item, index) => readString(item, `related[${index}]`, sourcePath));
}

function readFrontmatter(data: unknown, sourcePath: string): GuideFrontmatter {
  if (!isRecord(data)) {
    fail(sourcePath, "Frontmatter must be an object");
  }

  const slug = readString(data.slug, "slug", sourcePath);
  const locale = readLocale(data.locale, sourcePath);
  const status = readStatus(data.status, sourcePath);
  const keyword = readString(data.keyword, "keyword", sourcePath);
  const title = readString(data.title, "title", sourcePath);
  const description = readString(data.description, "description", sourcePath);
  const eyebrow = readString(data.eyebrow, "eyebrow", sourcePath);
  const checked = readString(data.checked, "checked", sourcePath);
  const quickAnswer = readString(data.quickAnswer, "quickAnswer", sourcePath);
  const updateWatch = readString(data.updateWatch, "updateWatch", sourcePath);
  const sources = readSources(data.sources, sourcePath);
  const related = readRelated(data.related, sourcePath);

  return {
    slug,
    locale,
    status,
    keyword,
    title,
    description,
    eyebrow,
    checked,
    quickAnswer,
    updateWatch,
    sources,
    related,
  };
}

function nodeText(node: UnknownNode | undefined): string {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;
  if (Array.isArray(node.children)) return node.children.map((child) => nodeText(child)).join("");
  return "";
}

function isHeading(node: UnknownNode): boolean {
  return node.type === "heading" && node.depth === 2;
}

function isParagraph(node: UnknownNode): boolean {
  return node.type === "paragraph";
}

function isList(node: UnknownNode): boolean {
  return node.type === "list" && node.ordered === false;
}

function parseSections(children: UnknownNode[], sourcePath: string): GuideSection[] {
  const sections: GuideSection[] = [];
  let index = 0;

  while (index < children.length && children[index].type === "paragraph") {
    index += 1;
  }

  while (index < children.length) {
    const heading = children[index];
    if (!isHeading(heading)) {
      fail(sourcePath, `Expected a level-2 heading at top level, found ${heading.type}`);
    }

    const intro = children[index + 1];
    if (!isParagraph(intro)) {
      fail(sourcePath, `Section "${nodeText(heading).trim()}" must include exactly one paragraph`);
    }

    const bullets = children[index + 2];
    if (!isList(bullets)) {
      fail(sourcePath, `Section "${nodeText(heading).trim()}" must include an unordered list`);
    }

    const bulletTexts = bullets.children?.map((item, bulletIndex) => {
      if (item.type !== "listItem") {
        fail(sourcePath, `Section "${nodeText(heading).trim()}" has an invalid list item at index ${bulletIndex}`);
      }

      const text = nodeText(item).trim();
      if (text.length === 0) {
        fail(sourcePath, `Section "${nodeText(heading).trim()}" has an empty list item at index ${bulletIndex}`);
      }
      return text;
    }) ?? [];

    if (bulletTexts.length === 0) {
      fail(sourcePath, `Section "${nodeText(heading).trim()}" must include at least one bullet`);
    }

    sections.push({
      title: nodeText(heading).trim(),
      intro: nodeText(intro).trim(),
      bullets: bulletTexts,
    });

    index += 3;
  }

  if (sections.length === 0) {
    fail(sourcePath, "Guide document must contain at least one section");
  }

  return sections;
}

export function parseGuideDocument(source: string, sourcePath: string): GuideDocument {
  try {
    const parsed = matter(source);
    const frontmatter = readFrontmatter(parsed.data, sourcePath);
    const tree = unified().use(remarkParse).use(remarkMdx).parse(parsed.content) as { children: UnknownNode[] };
    const sections = parseSections(tree.children, sourcePath);

    return {
      sourcePath,
      body: parsed.content,
      record: {
        slug: frontmatter.slug,
        keyword: frontmatter.keyword,
        title: frontmatter.title,
        description: frontmatter.description,
        eyebrow: frontmatter.eyebrow,
        status: frontmatter.status,
        checked: frontmatter.checked,
        quickAnswer: frontmatter.quickAnswer,
        sections,
        sources: frontmatter.sources,
        updateWatch: frontmatter.updateWatch,
        related: frontmatter.related,
        locale: frontmatter.locale,
      },
    };
  } catch (error) {
    if (error instanceof Error && error.message.startsWith(`[${sourcePath}]`)) {
      throw error;
    }

    fail(sourcePath, error instanceof Error ? error.message : "Unable to parse guide document");
  }
}
