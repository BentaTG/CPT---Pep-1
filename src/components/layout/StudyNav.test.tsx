import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StudyNav } from "@/components/layout/StudyNav";

describe("StudyNav", () => {
  afterEach(cleanup);

  it("provides separate mobile and desktop navigation patterns", () => {
    const onSidebarToggle = vi.fn();
    render(
      <StudyNav
        activeStage="radar"
        visitedStages={new Set(["radar"])}
        sidebarCollapsed={false}
        onStageChange={vi.fn()}
        onSidebarToggle={onSidebarToggle}
      />,
    );

    const navigations = screen.getAllByRole("navigation", {
      name: "Etapas de aprendizaje",
    });

    expect(navigations).toHaveLength(2);
    expect(navigations.some((navigation) => navigation.className.includes("md:hidden"))).toBe(true);
    expect(screen.getByRole("complementary")).toHaveClass(
      "md:fixed",
      "md:left-0",
      "md:h-screen",
    );
    expect(screen.getByRole("button", { name: "Ocultar navegación" })).toBeInTheDocument();
  });

});
