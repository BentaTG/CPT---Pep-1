import {
  Calculator,
  Compass,
  GitMerge,
  Layers,
  Timer,
  type LucideIcon,
} from "lucide-react";

export const STAGE_IDS = [
  "radar",
  "conceptos",
  "algoritmo",
  "laboratorio",
  "examen",
] as const;

export type StageId = (typeof STAGE_IDS)[number];

export type StageDefinition = Readonly<{
  id: StageId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
}>;

export const STAGES = {
  radar: {
    id: "radar",
    label: "Radar",
    eyebrow: "Etapa 1 de 5",
    title: "Tu mapa de aprendizaje",
    description:
      "Ubica tus fortalezas y define la ruta de estudio para CPT y Prueba de Razonabilidad.",
    icon: Compass,
  },
  conceptos: {
    id: "conceptos",
    label: "Conceptos",
    eyebrow: "Etapa 2 de 5",
    title: "Despegue conceptual",
    description:
      "Distingue patrimonio financiero, CPT y los conceptos que no debes confundir.",
    icon: Layers,
  },
  algoritmo: {
    id: "algoritmo",
    label: "Algoritmo",
    eyebrow: "Etapa 3 de 5",
    title: "Depura paso a paso",
    description:
      "Recorre el método del activo y del pasivo con una secuencia clara y verificable.",
    icon: GitMerge,
  },
  laboratorio: {
    id: "laboratorio",
    label: "Laboratorio",
    eyebrow: "Etapa 4 de 5",
    title: "Practica con casos auditables",
    description:
      "Trabaja los casos y aprende a diagnosticar descuadres sin perder el hilo del cálculo.",
    icon: Calculator,
  },
  examen: {
    id: "examen",
    label: "Examen",
    eyebrow: "Etapa 5 de 5",
    title: "Tu kit de emergencia",
    description:
      "Repasa fórmulas, checklists y la ruta táctica de resolución en diez minutos.",
    icon: Timer,
  },
} satisfies Record<StageId, StageDefinition>;

export const STAGE_NAV_ITEMS = STAGE_IDS.map((stageId) => STAGES[stageId]);

export function getStage(stageId: StageId): StageDefinition {
  return STAGES[stageId];
}
