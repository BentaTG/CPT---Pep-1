import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MobileShell } from "@/components/layout/MobileShell";

describe("MobileShell", () => {
  it("renders children inside the required mobile-first container", () => {
    render(
      <MobileShell>
        <span>Contenido de estudio</span>
      </MobileShell>,
    );

    const shell = screen.getByText("Contenido de estudio").parentElement;

    expect(shell).toHaveClass(
      "max-w-md",
      "mx-auto",
      "min-h-screen",
      "bg-[#F3F5F6]",
      "shadow-2xl",
      "relative",
      "pb-20",
      "overflow-x-hidden",
      "flex",
      "flex-col",
    );
  });
});
