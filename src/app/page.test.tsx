import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it("starts on Radar and changes the stage from the bottom navigation", async () => {
    const user = userEvent.setup();

    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Tu mapa de aprendizaje" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Radar" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await user.click(screen.getByRole("button", { name: "Algoritmo" }));

    expect(
      await screen.findByRole("heading", { name: "Depura paso a paso" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Algoritmo" }),
    ).toHaveAttribute("aria-current", "page");
  });
});
