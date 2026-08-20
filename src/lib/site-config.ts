const DEFAULT_SITE_URL = "https://www.ms2guide.site";

export function resolveSiteUrl(value: string | undefined): string {
  return (value ?? DEFAULT_SITE_URL).replace(/\/$/, "");
}

export const siteConfig = {
  siteUrl: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
} as const;
