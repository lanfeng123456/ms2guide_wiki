import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InnerPage } from "./inner-page";
import type { InnerPageRecord } from "@/data/inner-pages";

vi.mock("@/data/inner-pages", () => ({
  getInnerPage() {
    throw new Error("The rendered component must not read the legacy guide registry.");
  },
}));

vi.mock("@/lib/content/guides", () => ({
  getGuide(slug: string, locale: string) {
    if (slug !== "mortal-shell-ii-related-guide" || locale !== "de") return undefined;

    return {
      record: {
        title: "Mortal Shell II MDX-Verwandter Leitfaden",
      },
    };
  },
}));

const pageFixture: InnerPageRecord = {
  slug: "mortal-shell-ii-release-date",
  keyword: "Mortal Shell II release date",
  title: "Mortal Shell II Release Date",
  description: "Release date details.",
  eyebrow: "Mortal Shell II Field Guide",
  status: "Verified",
  checked: "Checked Aug 22, 2026",
  quickAnswer: "The global digital release date is August 20, 2026.",
  sections: [
    {
      title: "Release date at a glance",
      intro: "The release date is confirmed.",
      bullets: ["Launch is scheduled for August 20, 2026."],
    },
  ],
  sources: [
    {
      label: "Playstack release announcement",
      href: "https://www.playstack.com/news/mortal-shell-ii-release-date/",
    },
  ],
  updateWatch: "Watch the official release channels.",
  related: ["mortal-shell-ii-related-guide"],
};

describe("inner article template", () => {
  it("renders the answer, sections, sources, and update watch", () => {
    render(<InnerPage page={pageFixture} />);

    expect(screen.getByRole("heading", { level: 1, name: "Mortal Shell II Release Date" })).toBeInTheDocument();
    expect(screen.getByText(/global digital release date is August 20, 2026/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Release date at a glance" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Update watch" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Playstack release announcement" })).toHaveAttribute("href", "https://www.playstack.com/news/mortal-shell-ii-release-date/");
  });

  it("resolves localized related-guide labels from the MDX content index", () => {
    render(<InnerPage page={pageFixture} locale="de" />);

    expect(
      screen.getByRole("link", { name: "MDX-Verwandter Leitfaden" }),
    ).toHaveAttribute("href", "/de/guides/mortal-shell-ii-related-guide");
  });
});
