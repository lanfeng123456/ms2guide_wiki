import type { MetadataRoute } from "next";
import { innerPageSlugs } from "@/data/inner-pages";
import { siteConfig } from "@/lib/site-config";

const publicPaths = [
  "/",
  "/de/",
  "/fr/",
  "/pt-br/",
  ...innerPageSlugs.map((slug) => `/guides/${slug}`),
  ...["de", "fr", "pt-br"].flatMap((locale) =>
    innerPageSlugs.map((slug) => `/${locale}/guides/${slug}`)
  ),
  "/privacy-policy",
  "/terms-of-service",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((pathname) => ({
    url: `${siteConfig.siteUrl}${pathname}`,
  }));
}
