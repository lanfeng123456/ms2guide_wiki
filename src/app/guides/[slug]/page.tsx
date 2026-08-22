import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getGuide, getGuideParams } from "@/lib/content/guides";

export function generateStaticParams() {
  return getGuideParams()
    .filter(({ locale }) => locale === "en")
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuide(slug, "en")?.record;
  return page
    ? {
        title: `${page.title} | Mortal Shell II Wiki`,
        description: page.description,
        alternates: { canonical: `/guides/${slug}` },
        openGraph: { url: `/guides/${slug}`, title: `${page.title} | Mortal Shell II Wiki`, description: page.description, type: "article" },
      }
    : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const page = getGuide((await params).slug, "en")?.record;
  if (!page) notFound();

  return <><SiteHeader /><InnerPage page={page} /><SiteFooter /></>;
}
