import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BottomNav } from "@/components/layout/BottomNav";

describe("BottomNav", () => {
  afterEach(cleanup);

  it("exposes all stages and marks only the active destination", () => {
    render(<BottomNav activeStage="radar" onStageChange={vi.fn()} />);

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(5);
    expect(screen.getByRole("button", { name: "Radar" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("button", { name: "Conceptos" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("uses the accessible inactive-label contrast token", () => {
    render(<BottomNav activeStage="radar" onStageChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Conceptos" })).toHaveClass(
      "text-graphite/75",
    );
  });

  it("emits the selected stage and keeps every target at least 44px high", async () => {
    const user = userEvent.setup();
    const onStageChange = vi.fn();

    render(
      <BottomNav activeStage="radar" onStageChange={onStageChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Laboratorio" }));

    expect(onStageChange).toHaveBeenCalledWith("laboratorio");
    for (const button of screen.getAllByRole("button")) {
      expect(button).toHaveClass("min-h-14");
    }
  });
});
