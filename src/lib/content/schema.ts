import type { InnerPageRecord } from "@/data/inner-pages";

export const supportedGuideLocales = ["en", "de", "fr", "pt-br"] as const;

export type GuideLocale = (typeof supportedGuideLocales)[number];

export type GuideStatus = "Verified" | "Beta evidence" | "Update watch";

export type GuideSource = {
  label: string;
  href: string;
};

export type GuideFrontmatter = {
  slug: string;
  locale: GuideLocale;
  status: GuideStatus;
  keyword: string;
  title: string;
  description: string;
  eyebrow: string;
  checked: string;
  quickAnswer: string;
  updateWatch: string;
  sources: GuideSource[];
  related: string[];
};

export type GuideSection = {
  title: string;
  intro: string;
  bullets: string[];
};

export type GuideRecord = InnerPageRecord & {
  locale: GuideLocale;
};

export type GuideDocument = {
  record: GuideRecord;
  sourcePath: string;
  body: string;
};
