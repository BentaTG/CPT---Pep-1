import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LabStage } from "@/components/stages/LabStage";

describe("LabStage", () => {
  it("switches between guide cases and preserves the published results", async () => {
    const user = userEvent.setup();
    render(<LabStage />);

    expect(screen.getAllByText("$279.669.719").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Caso 2" }));

    expect(screen.getByRole("heading", { name: "Centro de Eventos Ltda." })).toBeInTheDocument();
    expect(screen.getAllByText("$909.356.120").length).toBeGreaterThan(0);
    expect(screen.getByText("Control $0,80")).toBeInTheDocument();
  });
});
