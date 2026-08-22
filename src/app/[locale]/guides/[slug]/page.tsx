import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getInnerPage, innerPageSlugs } from "@/data/inner-pages";
import { locales, type Locale } from "@/data/locales";

export function generateStaticParams() {
  return locales.filter((locale) => locale !== "en").flatMap((locale) => innerPageSlugs.map((slug) => ({ locale, slug })));
}

const localizedSuffix: Record<Locale, string> = {
  en: "Mortal Shell II Wiki",
  de: "Mortal Shell II Wiki",
  fr: "Mortal Shell II Wiki",
  "pt-br": "Mortal Shell II Wiki",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getInnerPage(slug, locale as Locale);
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
  const page = getInnerPage(slug, locale as Locale);
  if (!page) notFound();

  return <><SiteHeader /><InnerPage page={page} locale={locale as Locale} /><SiteFooter /></>;
}
