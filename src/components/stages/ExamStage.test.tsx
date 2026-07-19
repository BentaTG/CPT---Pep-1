import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ExamStage } from "@/components/stages/ExamStage";

describe("ExamStage", () => {
  it("tracks checklist progress and can reset it", async () => {
    const user = userEvent.setup();
    render(<ExamStage />);

    const reviewTrigger = screen.getByText("Abrir herramientas de repaso").closest("button");
    expect(reviewTrigger).not.toBeNull();
    await user.click(reviewTrigger!);

    const firstControl = screen.getByRole("checkbox", {
      name: "Tomé los totales correctos de activo y pasivo.",
    });

    await user.click(firstControl);
    expect(firstControl).toBeChecked();
    expect(screen.getByText("1/10 · 10%")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reiniciar" }));
    expect(firstControl).not.toBeChecked();
  });
});
