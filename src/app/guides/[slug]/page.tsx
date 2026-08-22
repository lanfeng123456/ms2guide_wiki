import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getInnerPage, innerPageSlugs } from "@/data/inner-pages";

export function generateStaticParams() {
  return innerPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getInnerPage(slug);
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
  const page = getInnerPage((await params).slug);
  if (!page) notFound();

  return <><SiteHeader /><InnerPage page={page} /><SiteFooter /></>;
}
