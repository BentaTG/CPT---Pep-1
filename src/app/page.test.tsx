import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import { STUDY_STORAGE_KEYS } from "@/lib/usePersistentState";

describe("Home", () => {
  afterEach(cleanup);

  it("keeps the sidebar restore control inside the sticky header", async () => {
    const user = userEvent.setup();

    render(<Home />);
    await user.click(screen.getByRole("button", { name: "Ocultar navegación" }));

    const restoreButton = screen.getByRole("button", { name: "Mostrar navegación" });
    expect(restoreButton.closest("header")).not.toBeNull();
  });

  it("restores the current stage after the page is mounted again", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getAllByRole("button", { name: "Conceptos" })[0]);
    await waitFor(() =>
      expect(window.localStorage.getItem(STUDY_STORAGE_KEYS.navigation)).toContain(
        '"activeStage":"conceptos"',
      ),
    );

    cleanup();
    render(<Home />);

    expect(
      await screen.findByRole("heading", {
        name: "Construye criterio antes de mover cifras",
      }),
    ).toBeInTheDocument();
  });

  it.each([
    ["Radar", "Del balance a una cuadratura que puedas explicar"],
    ["Conceptos", "Construye criterio antes de mover cifras"],
    ["Algoritmo", "Depura en un orden que puedas auditar"],
    ["Laboratorio", "Trabaja casos que dejan rastro"],
    ["Examen", "Resuelve un caso completo antes de mirar las respuestas"],
  ])("shows %s after selecting it from the bottom navigation", async (label, title) => {
    const user = userEvent.setup();

    render(<Home />);

    const stageButtons = screen.getAllByRole("button", { name: label });
    await user.click(stageButtons[0]);

    expect(
      await screen.findByRole("heading", { name: title }),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("button", { name: label })
        .some((button) => button.getAttribute("aria-current") === "page"),
    ).toBe(true);
    expect(
      screen.getAllByRole("button").filter(
        (button) => button.getAttribute("aria-current") === "page",
      ),
    ).toHaveLength(2);
  });
});
