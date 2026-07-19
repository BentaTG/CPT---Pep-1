import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  afterEach(cleanup);

  it.each([
    ["Radar", "Tu mapa de aprendizaje"],
    ["Conceptos", "Despegue conceptual"],
    ["Algoritmo", "Depura paso a paso"],
    ["Laboratorio", "Practica con casos auditables"],
    ["Examen", "Tu kit de emergencia"],
  ])("shows %s after selecting it from the bottom navigation", async (label, title) => {
    const user = userEvent.setup();

    render(<Home />);

    await user.click(screen.getByRole("button", { name: label }));

    expect(
      await screen.findByRole("heading", { name: title }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: label })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getAllByRole("button").filter(
        (button) => button.getAttribute("aria-current") === "page",
      ),
    ).toHaveLength(1);
  });
});
