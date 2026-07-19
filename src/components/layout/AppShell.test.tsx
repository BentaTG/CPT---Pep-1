import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell } from "@/components/layout/AppShell";

describe("AppShell", () => {
  it("uses a wide responsive grid instead of a simulated phone frame", () => {
    const { rerender } = render(
      <AppShell navigation={<nav>Navegación</nav>} sidebarCollapsed={false}>
        <p>Material de estudio</p>
      </AppShell>,
    );

    const outer = screen.getByTestId("app-shell");
    const content = screen.getByTestId("app-shell-content");

    expect(content).toHaveClass("md:ml-60", "lg:ml-[17rem]");
    expect(outer).not.toHaveClass("max-w-md", "shadow-2xl");

    rerender(
      <AppShell navigation={<nav>Navegación</nav>} sidebarCollapsed>
        <p>Material de estudio</p>
      </AppShell>,
    );

    expect(screen.getByTestId("app-shell-content")).toHaveClass("md:ml-0");
    expect(screen.getByTestId("app-shell-content")).not.toHaveClass("md:ml-60");
  });
});
