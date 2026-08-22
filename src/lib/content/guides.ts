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

function validateSourceUrls(records: GuideDocument[]): void {
  for (const document of records) {
    for (const source of document.record.sources) {
      let url: URL;

      try {
        url = new URL(source.href);
      } catch {
        throw new Error(
          `[${document.sourcePath}] Guide source URL must be an absolute HTTP or HTTPS URL: ${source.href}`,
        );
      }

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error(
          `[${document.sourcePath}] Guide source URL must use HTTP or HTTPS: ${source.href}`,
        );
      }
    }
  }
}

function validateRelatedGuides(records: GuideDocument[], byKey: Map<string, GuideDocument>): void {
  for (const document of records) {
    for (const relatedSlug of document.record.related) {
      const relatedKey = `${document.record.locale}:${relatedSlug}`;

      if (!byKey.has(relatedKey)) {
        throw new Error(
          `[${document.sourcePath}] Related guide "${relatedKey}" does not exist in the same locale.`,
        );
      }
    }
  }
}

export function createGuideIndexFromSources(sources: Record<string, string>) {
  const records = Object.entries(sources)
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

  validateSourceUrls(records);
  validateRelatedGuides(records, byKey);

  const params = records
    .map(({ record }) => ({ slug: record.slug, locale: record.locale }))
    .sort(compareGuideParams);

  return { byKey, records, params };
}

const guideIndex = createGuideIndexFromSources(guideSources);

export function getGuide(slug: string, locale: GuideLocale): GuideDocument | undefined {
  return guideIndex.byKey.get(`${locale}:${slug}`);
}

export function getGuideParams(): Array<{ slug: string; locale: GuideLocale }> {
  return [...guideIndex.params];
}

export function getGuideRecords(): GuideDocument[] {
  return [...guideIndex.records];
}
