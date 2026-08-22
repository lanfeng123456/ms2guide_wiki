import { createElement } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const fixtures = vi.hoisted(() => {
  const notFoundError = new Error("NEXT_NOT_FOUND");

  return {
    notFoundError,
    notFound: vi.fn(() => {
      throw notFoundError;
    }),
  };
});

vi.mock("next/navigation", () => ({
  notFound: fixtures.notFound,
}));

vi.mock("@/components/inner-page", () => ({
  InnerPage: ({ page, locale }: { page: { title: string }; locale?: string }) =>
    createElement("div", { "data-testid": "inner-page", "data-locale": locale ?? "en" }, page.title),
}));

vi.mock("@/components/site-header", () => ({
  SiteHeader: () => createElement("div", { "data-testid": "site-header" }),
}));

vi.mock("@/components/site-footer", () => ({
  SiteFooter: () => createElement("div", { "data-testid": "site-footer" }),
}));

import { getGuide, getGuideParams } from "@/lib/content/guides";
import {
  default as EnglishGuidePage,
  generateMetadata as generateEnglishGuideMetadata,
  generateStaticParams as generateEnglishGuideParams,
} from "./guides/[slug]/page";
import {
  default as LocalizedGuidePage,
  generateMetadata as generateLocalizedGuideMetadata,
  generateStaticParams as generateLocalizedGuideParams,
} from "./[locale]/guides/[slug]/page";

afterEach(() => {
  cleanup();
  fixtures.notFound.mockClear();
});

describe("guide route content source", () => {
  it("resolves all 84 generated routes from the real MDX guide index", async () => {
    const allGuideParams = getGuideParams();
    const englishGuideParams = allGuideParams
      .filter(({ locale }) => locale === "en")
      .map(({ slug }) => ({ slug }));
    const localizedGuideParams = allGuideParams.filter(({ locale }) => locale !== "en");

    expect(allGuideParams).toHaveLength(84);
    expect(generateEnglishGuideParams()).toEqual(englishGuideParams);
    expect(generateLocalizedGuideParams()).toEqual(localizedGuideParams);

    for (const { slug, locale } of allGuideParams) {
      const guide = getGuide(slug, locale);
      if (!guide) {
        throw new Error(`Missing guide document for ${locale}:${slug}`);
      }

      const expectedTitle = `${guide.record.title} | Mortal Shell II Wiki`;
      const expectedCanonical = locale === "en" ? `/guides/${slug}` : `/${locale}/guides/${slug}`;
      const page =
        locale === "en"
          ? await EnglishGuidePage({ params: Promise.resolve({ slug }) })
          : await LocalizedGuidePage({ params: Promise.resolve({ locale, slug }) });
      const metadata =
        locale === "en"
          ? await generateEnglishGuideMetadata({ params: Promise.resolve({ slug }) })
          : await generateLocalizedGuideMetadata({ params: Promise.resolve({ locale, slug }) });

      expect(metadata).toMatchObject({
        title: expectedTitle,
        description: guide.record.description,
        alternates: { canonical: expectedCanonical },
        openGraph: {
          url: expectedCanonical,
          title: expectedTitle,
          description: guide.record.description,
          type: "article",
        },
      });

      render(page);

      expect(screen.getByTestId("site-header")).toBeInTheDocument();
      expect(screen.getByTestId("inner-page")).toHaveTextContent(guide.record.title);
      expect(screen.getByTestId("inner-page")).toHaveAttribute("data-locale", locale);
      expect(screen.getByTestId("site-footer")).toBeInTheDocument();

      cleanup();
    }
  });

  it("publishes representative English and localized metadata from the guide documents", async () => {
    const englishGuide = getGuide("mortal-shell-ii-guide", "en");
    const localizedGuide = getGuide("mortal-shell-ii-guide", "de");

    if (!englishGuide || !localizedGuide) {
      throw new Error("Representative guide fixtures are missing");
    }

    await expect(
      generateEnglishGuideMetadata({
        params: Promise.resolve({ slug: "mortal-shell-ii-guide" }),
      }),
    ).resolves.toMatchObject({
      title: `${englishGuide.record.title} | Mortal Shell II Wiki`,
      description: englishGuide.record.description,
      alternates: { canonical: "/guides/mortal-shell-ii-guide" },
      openGraph: {
        url: "/guides/mortal-shell-ii-guide",
        title: `${englishGuide.record.title} | Mortal Shell II Wiki`,
        description: englishGuide.record.description,
        type: "article",
      },
    });

    await expect(
      generateLocalizedGuideMetadata({
        params: Promise.resolve({ locale: "de", slug: "mortal-shell-ii-guide" }),
      }),
    ).resolves.toMatchObject({
      title: `${localizedGuide.record.title} | Mortal Shell II Wiki`,
      description: localizedGuide.record.description,
      alternates: { canonical: "/de/guides/mortal-shell-ii-guide" },
      openGraph: {
        url: "/de/guides/mortal-shell-ii-guide",
        title: `${localizedGuide.record.title} | Mortal Shell II Wiki`,
        description: localizedGuide.record.description,
        type: "article",
      },
    });
  });

  it("keeps notFound behavior when a guide is missing", async () => {
    await expect(
      EnglishGuidePage({
        params: Promise.resolve({ slug: "missing-guide" }),
      }),
    ).rejects.toBe(fixtures.notFoundError);

    await expect(
      LocalizedGuidePage({
        params: Promise.resolve({ locale: "de", slug: "missing-guide" }),
      }),
    ).rejects.toBe(fixtures.notFoundError);

    expect(fixtures.notFound).toHaveBeenCalledTimes(2);
  });
});
