import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InnerPage } from "./inner-page";
import { getInnerPage } from "@/data/inner-pages";

describe("inner article template", () => {
  it("renders the answer, sections, sources, and update watch", () => {
    const page = getInnerPage("mortal-shell-ii-release-date");
    if (!page) throw new Error("fixture page missing");

    render(<InnerPage page={page} />);

    expect(screen.getByRole("heading", { level: 1, name: "Mortal Shell II Release Date" })).toBeInTheDocument();
    expect(screen.getByText(/global digital release date is August 20, 2026/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Release date at a glance" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Update watch" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Playstack release announcement" })).toHaveAttribute("href", "https://www.playstack.com/news/mortal-shell-ii-release-date/");
  });
});
