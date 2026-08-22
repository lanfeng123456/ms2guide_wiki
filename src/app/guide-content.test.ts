import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const fixtures = vi.hoisted(() => {
  const englishRecord = {
    slug: "mdx-only-guide",
    locale: "en",
    keyword: "mdx english keyword",
    title: "MDX English Title",
    description: "English MDX description",
    eyebrow: "Mortal Shell II Field Guide",
    status: "Verified",
    checked: "Checked Aug 19, 2026",
    quickAnswer: "English quick answer",
    sections: [
      {
        title: "English section",
        intro: "English intro",
        bullets: ["English bullet"],
      },
    ],
    sources: [{ label: "English source", href: "https://example.com/en" }],
    updateWatch: "English update watch",
    related: [],
  };

  const germanRecord = {
    ...englishRecord,
    locale: "de",
    keyword: "mdx german keyword",
    title: "MDX German Title",
    description: "German MDX description",
    quickAnswer: "German quick answer",
    sections: [
      {
        title: "German section",
        intro: "German intro",
        bullets: ["German bullet"],
      },
    ],
    sources: [{ label: "German source", href: "https://example.com/de" }],
    updateWatch: "German update watch",
  };

  const documents = new Map(
    [
      ["en:mdx-only-guide", { record: englishRecord, sourcePath: "src/content/guides/en/mdx-only-guide.mdx", body: "# English" }],
      ["de:mdx-only-guide", { record: germanRecord, sourcePath: "src/content/guides/de/mdx-only-guide.mdx", body: "# German" }],
    ] as const,
  );

  const notFoundError = new Error("NEXT_NOT_FOUND");

  return {
    englishRecord,
    germanRecord,
    notFoundError,
    getGuide: vi.fn((slug: string, locale: string) => documents.get(`${locale}:${slug}`)),
    getGuideParams: vi.fn(() => [
      { slug: "mdx-only-guide", locale: "en" as const },
      { slug: "mdx-only-guide", locale: "de" as const },
    ]),
    notFound: vi.fn(() => {
      throw notFoundError;
    }),
  };
});

vi.mock("@/lib/content/guides", () => ({
  getGuide: fixtures.getGuide,
  getGuideParams: fixtures.getGuideParams,
}));

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
  fixtures.getGuide.mockClear();
  fixtures.getGuideParams.mockClear();
  fixtures.notFound.mockClear();
});

describe("guide route content source", () => {
  it("uses the MDX guide index for English guide params, metadata, and page content", async () => {
    expect(generateEnglishGuideParams()).toEqual([{ slug: "mdx-only-guide" }]);

    await expect(
      generateEnglishGuideMetadata({
        params: Promise.resolve({ slug: "mdx-only-guide" }),
      }),
    ).resolves.toMatchObject({
      title: "MDX English Title | Mortal Shell II Wiki",
      description: "English MDX description",
      alternates: { canonical: "/guides/mdx-only-guide" },
      openGraph: {
        url: "/guides/mdx-only-guide",
        title: "MDX English Title | Mortal Shell II Wiki",
        description: "English MDX description",
        type: "article",
      },
    });

    render(
      await EnglishGuidePage({
        params: Promise.resolve({ slug: "mdx-only-guide" }),
      }),
    );

    expect(screen.getByTestId("site-header")).toBeInTheDocument();
    expect(screen.getByTestId("inner-page")).toHaveTextContent("MDX English Title");
    expect(screen.getByTestId("inner-page")).toHaveAttribute("data-locale", "en");
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
    expect(fixtures.getGuide).toHaveBeenCalledWith("mdx-only-guide", "en");
  });

  it("uses the MDX guide index for localized guide params, metadata, and page content", async () => {
    expect(generateLocalizedGuideParams()).toEqual([{ locale: "de", slug: "mdx-only-guide" }]);

    await expect(
      generateLocalizedGuideMetadata({
        params: Promise.resolve({ locale: "de", slug: "mdx-only-guide" }),
      }),
    ).resolves.toMatchObject({
      title: "MDX German Title | Mortal Shell II Wiki",
      description: "German MDX description",
      alternates: { canonical: "/de/guides/mdx-only-guide" },
      openGraph: {
        url: "/de/guides/mdx-only-guide",
        title: "MDX German Title | Mortal Shell II Wiki",
        description: "German MDX description",
        type: "article",
      },
    });

    render(
      await LocalizedGuidePage({
        params: Promise.resolve({ locale: "de", slug: "mdx-only-guide" }),
      }),
    );

    expect(screen.getAllByTestId("site-header")).toHaveLength(1);
    expect(screen.getByTestId("inner-page")).toHaveTextContent("MDX German Title");
    expect(screen.getByTestId("inner-page")).toHaveAttribute("data-locale", "de");
    expect(screen.getAllByTestId("site-footer")).toHaveLength(1);
    expect(fixtures.getGuide).toHaveBeenCalledWith("mdx-only-guide", "de");
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
