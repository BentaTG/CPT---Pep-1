import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { AppliedExam } from "@/components/study/AppliedExam";
import { PRACTICE_EXAM } from "@/data/study";
import { STUDY_STORAGE_KEYS } from "@/lib/usePersistentState";

describe("AppliedExam", () => {
  afterEach(cleanup);

  it("restores an in-progress attempt after remounting", async () => {
    const user = userEvent.setup();
    render(<AppliedExam />);

    await user.click(screen.getByRole("button", { name: "Comenzar prueba" }));
    await user.type(
      screen.getByRole("textbox", { name: "CPT final por método del activo" }),
      "445000000",
    );
    await waitFor(() =>
      expect(window.localStorage.getItem(STUDY_STORAGE_KEYS.exam)).toContain(
        '"cpt-method":"445000000"',
      ),
    );

    cleanup();
    render(<AppliedExam />);

    expect(
      await screen.findByRole("textbox", {
        name: "CPT final por método del activo",
      }),
    ).toHaveValue("445000000");
    expect(screen.getByText("Prueba en curso")).toBeInTheDocument();
  });

  it("keeps solutions hidden until the student submits the attempt", async () => {
    const user = userEvent.setup();
    render(<AppliedExam />);

    expect(screen.queryByText("Resultado esperado: $445.000.000")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Comenzar prueba" }));
    await user.type(
      screen.getByRole("textbox", { name: "CPT final por método del activo" }),
      "1",
    );
    await user.click(screen.getByRole("button", { name: "Entregar prueba" }));

    expect(screen.getByRole("status")).toHaveTextContent("0/100");
    expect(screen.getAllByText("Resultado esperado: $445.000.000")).toHaveLength(2);
  });

  it("scores a complete correct attempt as 100 points", async () => {
    const user = userEvent.setup();
    render(<AppliedExam />);

    await user.click(screen.getByRole("button", { name: "Comenzar prueba" }));

    for (const item of PRACTICE_EXAM.theoryItems) {
      const statement = screen.getByText(item.statement);
      const question = statement.parentElement;
      expect(question).not.toBeNull();
      await user.click(
        within(question!).getByRole("radio", {
          name: item.correctAnswer === "true" ? "Verdadero" : "Falso",
        }),
      );
    }

    for (const item of PRACTICE_EXAM.numericItems) {
      await user.type(
        screen.getByRole("textbox", { name: item.label }),
        String(item.expected),
      );
    }

    await user.click(screen.getByRole("button", { name: "Entregar prueba" }));

    expect(screen.getByRole("status")).toHaveTextContent("100/100");
    expect(screen.getByText("Aprobaste el simulacro")).toBeInTheDocument();
  }, 15_000);
});
