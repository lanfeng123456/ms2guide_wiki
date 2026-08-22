import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";

import { getInnerPage, innerPageSlugs, type InnerPageRecord } from "../src/data/inner-pages";
import { locales, type Locale } from "../src/data/locales";
import { parseGuideDocument } from "../src/lib/content/parse-guide";

type GuideRecord = InnerPageRecord & {
  locale: Locale;
};

const scriptPath = fileURLToPath(import.meta.url);
const scriptDirectory = path.dirname(scriptPath);
const projectRoot = path.resolve(scriptDirectory, "..");
const guidesRoot = path.join(projectRoot, "src", "content", "guides");
const preservedFixtureRelativePath = "en/mortal-shell-ii-guide.mdx";

function formatScalar(value: string): string {
  return JSON.stringify(value);
}

function formatInlineYaml(value: unknown): string {
  return JSON.stringify(value);
}

function toGuideRecord(page: InnerPageRecord, locale: Locale): GuideRecord {
  return { ...page, locale };
}

function toSourcePath(relativePath: string): string {
  return path.posix.join("src/content/guides", relativePath);
}

function serializeGuide(record: GuideRecord): string {
  const frontmatter = [
    "---",
    `slug: ${formatScalar(record.slug)}`,
    `locale: ${formatScalar(record.locale)}`,
    `status: ${formatScalar(record.status)}`,
    `keyword: ${formatScalar(record.keyword)}`,
    `title: ${formatScalar(record.title)}`,
    `description: ${formatScalar(record.description)}`,
    `eyebrow: ${formatScalar(record.eyebrow)}`,
    `checked: ${formatScalar(record.checked)}`,
    `quickAnswer: ${formatScalar(record.quickAnswer)}`,
    `updateWatch: ${formatScalar(record.updateWatch)}`,
    `sources: ${formatInlineYaml(record.sources)}`,
    `related: ${formatInlineYaml(record.related)}`,
    "---",
  ].join("\n");

  const body = record.sections
    .map((section) =>
      [
        `## ${section.title}`,
        "",
        section.intro,
        "",
        ...section.bullets.map((bullet) => `- ${bullet}`),
      ].join("\n"),
    )
    .join("\n\n");

  return `${frontmatter}\n\n${body}\n`;
}

async function readExistingSource(filePath: string): Promise<string | undefined> {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return undefined;
    }

    throw error;
  }
}

function shouldPreserveExistingFixture(relativePath: string, source: string, record: GuideRecord): boolean {
  if (relativePath !== preservedFixtureRelativePath) {
    return false;
  }

  const parsed = parseGuideDocument(source, toSourcePath(relativePath));
  return isDeepStrictEqual(parsed.record, record);
}

async function listGuideFiles(directory: string, prefix = ""): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listGuideFiles(absolutePath, relativePath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(relativePath);
    }
  }

  return files;
}

async function main() {
  const expectedPaths = new Set<string>();
  let writtenFiles = 0;
  let preservedFiles = 0;

  for (const locale of locales) {
    await mkdir(path.join(guidesRoot, locale), { recursive: true });

    for (const slug of innerPageSlugs) {
      const page = getInnerPage(slug, locale);

      if (!page) {
        throw new Error(`Missing legacy guide for ${locale}:${slug}`);
      }

      const record = toGuideRecord(page, locale);
      const relativePath = `${locale}/${slug}.mdx`;
      const filePath = path.join(guidesRoot, ...relativePath.split("/"));
      const generatedSource = serializeGuide(record);
      const existingSource = await readExistingSource(filePath);
      const nextSource =
        existingSource && shouldPreserveExistingFixture(relativePath, existingSource, record)
          ? existingSource
          : generatedSource;

      expectedPaths.add(relativePath);

      if (existingSource === nextSource) {
        if (existingSource !== generatedSource) {
          preservedFiles += 1;
        }

        continue;
      }

      await writeFile(filePath, nextSource, "utf8");
      writtenFiles += 1;

      if (existingSource && nextSource !== generatedSource) {
        preservedFiles += 1;
      }
    }
  }

  const actualPaths = new Set(await listGuideFiles(guidesRoot));
  const missingPaths = [...expectedPaths].filter((relativePath) => !actualPaths.has(relativePath));
  const unexpectedPaths = [...actualPaths].filter((relativePath) => !expectedPaths.has(relativePath));

  if (missingPaths.length > 0 || unexpectedPaths.length > 0 || actualPaths.size !== expectedPaths.size) {
    throw new Error(
      [
        `Expected ${expectedPaths.size} guide files but found ${actualPaths.size}.`,
        missingPaths.length > 0 ? `Missing: ${missingPaths.join(", ")}` : undefined,
        unexpectedPaths.length > 0 ? `Unexpected: ${unexpectedPaths.join(", ")}` : undefined,
      ]
        .filter(Boolean)
        .join(" "),
    );
  }

  console.log(
    `Generated ${actualPaths.size} guide files in src/content/guides (${writtenFiles} written, ${preservedFiles} preserved).`,
  );
}

await main();
