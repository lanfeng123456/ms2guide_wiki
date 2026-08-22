import type { GuideDocument, GuideLocale } from "./schema";
import { parseGuideDocument } from "./parse-guide";

const guideSources = import.meta.glob("../../content/guides/**/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function compareGuideDocuments(left: GuideDocument, right: GuideDocument): number {
  return left.record.locale.localeCompare(right.record.locale) || left.record.slug.localeCompare(right.record.slug);
}

function compareGuideParams(
  left: { locale: GuideLocale; slug: string },
  right: { locale: GuideLocale; slug: string },
): number {
  return left.locale.localeCompare(right.locale) || left.slug.localeCompare(right.slug);
}

function createGuideIndex() {
  const records = Object.entries(guideSources)
    .map(([sourcePath, source]) => parseGuideDocument(source, sourcePath))
    .sort(compareGuideDocuments);

  const byKey = new Map<string, GuideDocument>();

  for (const document of records) {
    const key = `${document.record.locale}:${document.record.slug}`;
    const existing = byKey.get(key);

    if (existing) {
      throw new Error(
        `Duplicate guide key "${key}" found in ${existing.sourcePath} and ${document.sourcePath}`,
      );
    }

    byKey.set(key, document);
  }

  const params = records
    .map(({ record }) => ({ slug: record.slug, locale: record.locale }))
    .sort(compareGuideParams);

  return { byKey, records, params };
}

const guideIndex = createGuideIndex();

export function getGuide(slug: string, locale: GuideLocale): GuideDocument | undefined {
  return guideIndex.byKey.get(`${locale}:${slug}`);
}

export function getGuideParams(): Array<{ slug: string; locale: GuideLocale }> {
  return [...guideIndex.params];
}

export function getGuideRecords(): GuideDocument[] {
  return [...guideIndex.records];
}
