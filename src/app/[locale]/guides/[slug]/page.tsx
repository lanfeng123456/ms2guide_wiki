import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { locales, type Locale } from "@/data/locales";
import { getGuide, getGuideParams } from "@/lib/content/guides";

export function generateStaticParams() {
  return getGuideParams().filter(({ locale }) => locale !== "en");
}

const localizedSuffix: Record<Locale, string> = {
  en: "Mortal Shell II Wiki",
  de: "Mortal Shell II Wiki",
  fr: "Mortal Shell II Wiki",
  "pt-br": "Mortal Shell II Wiki",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = locales.includes(locale as Locale) ? getGuide(slug, locale as Locale)?.record : undefined;
  const suffix = ` | ${localizedSuffix[(locale as Locale) ?? "en"]}`;
  return page
    ? {
        title: `${page.title}${suffix}`,
        description: page.description,
        alternates: { canonical: `/${locale}/guides/${slug}` },
        openGraph: { url: `/${locale}/guides/${slug}`, title: `${page.title}${suffix}`, description: page.description, type: "article" },
      }
    : {};
}

export default async function LocalizedGuidePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale) || locale === "en") notFound();
  const page = getGuide(slug, locale as Locale)?.record;
  if (!page) notFound();

  return <><SiteHeader /><InnerPage page={page} locale={locale as Locale} /><SiteFooter /></>;
}
