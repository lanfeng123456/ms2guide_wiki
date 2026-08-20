import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AdsterraBanner } from "./adsterra-banner";

describe("AdsterraBanner", () => {
  it("renders both configured ad slots", async () => {
    const { container } = render(<AdsterraBanner />);

    expect(container.querySelector("#container-63418b900539f6089a243273d124426c")).toBeInTheDocument();
    await waitFor(() => {
      expect(
        document.querySelector(
          'script[src="https://www.highperformanceformat.com/2c3fe3a93001bf85947eefe6b471c0f5/invoke.js"]',
        ),
      ).toBeInTheDocument();
    });
    expect(document.querySelector("#adsterra-wide-options")).toHaveTextContent("2c3fe3a93001bf85947eefe6b471c0f5");
    expect(document.querySelector("script[data-cfasync=\"false\"]")).toHaveAttribute("data-cfasync", "false");
  });
});
