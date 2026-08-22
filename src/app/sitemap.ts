import type { MetadataRoute } from "next";
import { getGuideParams } from "@/lib/content/guides";
import { siteConfig } from "@/lib/site-config";

const publicPaths = [
  "/",
  "/de/",
  "/fr/",
  "/pt-br/",
  ...getGuideParams().map(({ locale, slug }) =>
    locale === "en" ? `/guides/${slug}` : `/${locale}/guides/${slug}`,
  ),
  "/privacy-policy",
  "/terms-of-service",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((pathname) => ({
    url: `${siteConfig.siteUrl}${pathname}`,
  }));
}
