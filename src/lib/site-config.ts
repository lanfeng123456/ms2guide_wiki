const DEFAULT_SITE_URL = "https://www.ms2guide.site";
const CANONICAL_HOST = "www.ms2guide.site";

export function resolveSiteUrl(value: string | undefined): string {
  const candidate = value?.trim() || DEFAULT_SITE_URL;

  try {
    const url = new URL(candidate);
    url.protocol = "https:";
    if (url.hostname === "ms2guide.site") url.hostname = CANONICAL_HOST;
    url.port = "";
    url.pathname = "";
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  siteUrl: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
} as const;
