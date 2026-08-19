import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("Mortal Shell II homepage", () => {
  it("presents one clear title and the primary player actions", () => {
    render(<HomePage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "Mortal Shell II" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Begin the Guide" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Compare Shells" })).toBeInTheDocument();
  });

  it("renders the four-part start path and complete field index", () => {
    render(<HomePage />);

    const start = screen.getByTestId("start-here");
    expect(within(start).getAllByRole("article")).toHaveLength(4);

    const index = screen.getByTestId("field-index");
    expect(within(index).getAllByRole("link")).toHaveLength(21);
  });

  it("provides sourced game facts, official media, and fan-site disclosure", () => {
    render(<HomePage />);

    expect(screen.getByText("Cold Symmetry")).toBeInTheDocument();
    expect(screen.getByText("8", { selector: "dd" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /watch official release date trailer/i })).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=qHLY7zFhRvg",
    );
    expect(screen.getByText(/independent fan-made guide hub/i)).toBeInTheDocument();
  });
});
