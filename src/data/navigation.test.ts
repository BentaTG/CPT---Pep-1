import { describe, expect, it } from "vitest";
import {
  getStage,
  STAGE_IDS,
  STAGE_NAV_ITEMS,
} from "@/data/navigation";

describe("navigation data", () => {
  it("defines the five core-funnel stages in narrative order", () => {
    expect(STAGE_IDS).toEqual([
      "radar",
      "conceptos",
      "algoritmo",
      "laboratorio",
      "examen",
    ]);
    expect(STAGE_NAV_ITEMS.map(({ label }) => label)).toEqual([
      "Radar",
      "Conceptos",
      "Algoritmo",
      "Laboratorio",
      "Examen",
    ]);
  });

  it("returns a complete definition for a valid stage", () => {
    expect(getStage("laboratorio")).toMatchObject({
      id: "laboratorio",
      label: "Laboratorio",
      eyebrow: "Etapa 4 de 5",
      title: "Practica con casos auditables",
    });
  });
});
