export const SITE_URL: string;

export function resolveBuildRuntimePaths(
  buildDir: string,
  buildInfo: { serverEntry?: string; publicDir?: string } | null | undefined,
): { serverEntry: string; publicDir: string };

export function findForbiddenProductionUrls(text: string): string[];

export function extractFontAssetPathFromStylesheet(stylesheetText: string): string;

export function extractFontStylesheetFromHtml(html: string): string;

export function assertAbsoluteSiteUrl(
  value: string,
  label: string,
  expectedPath: string,
): void;

export function fetchWithTimeout(
  fetchImplementation: typeof fetch,
  input: Parameters<typeof fetch>[0],
  init?: RequestInit,
  timeoutMs?: number,
): ReturnType<typeof fetch>;

export function waitForPreviewWithCleanup(
  waitUntilReady: () => Promise<void>,
  stopPreview: () => Promise<void>,
): Promise<void>;

export function resolveStaticMiddleware(
  staticModule: unknown,
): (options: { dir: string }) => unknown;
