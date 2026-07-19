"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpenText, FileCheck2, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { StudyNav } from "@/components/layout/StudyNav";
import { AlgorithmStage } from "@/components/stages/AlgorithmStage";
import { ConceptsStage } from "@/components/stages/ConceptsStage";
import { ExamStage } from "@/components/stages/ExamStage";
import { LabStage } from "@/components/stages/LabStage";
import { RadarStage } from "@/components/stages/RadarStage";
import { getStage, type StageId } from "@/data/navigation";

function StageContent({
  activeStage,
  visitedStages,
  onNavigate,
}: Readonly<{
  activeStage: StageId;
  visitedStages: ReadonlySet<StageId>;
  onNavigate: (stage: StageId) => void;
}>) {
  switch (activeStage) {
    case "radar":
      return <RadarStage visitedStages={visitedStages} onNavigate={onNavigate} />;
    case "conceptos":
      return <ConceptsStage />;
    case "algoritmo":
      return <AlgorithmStage />;
    case "laboratorio":
      return <LabStage />;
    case "examen":
      return <ExamStage />;
  }
}

export default function Home() {
  const [activeStage, setActiveStage] = useState<StageId>("radar");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [visitedStages, setVisitedStages] = useState<ReadonlySet<StageId>>(
    () => new Set<StageId>(["radar"]),
  );
  const reduceMotion = useReducedMotion();
  const stage = getStage(activeStage);

  function navigate(stageId: StageId) {
    setActiveStage(stageId);
    setVisitedStages((current) => new Set([...current, stageId]));
  }

  return (
    <AppShell
      sidebarCollapsed={sidebarCollapsed}
      navigation={
        <StudyNav
          activeStage={activeStage}
          visitedStages={visitedStages}
          sidebarCollapsed={sidebarCollapsed}
          onStageChange={navigate}
          onSidebarToggle={() => setSidebarCollapsed((current) => !current)}
        />
      }
    >
      <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-navy-primary/10 bg-white/90 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {sidebarCollapsed ? (
            <button
              type="button"
              aria-label="Mostrar navegación"
              onClick={() => setSidebarCollapsed(false)}
              className="hidden h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-navy-primary px-3 text-white shadow-sm transition-colors hover:bg-petroleum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroleum focus-visible:ring-offset-2 md:flex"
            >
              <PanelLeftOpen aria-hidden="true" size={20} />
              <span className="hidden text-sm font-bold xl:inline">Mostrar menú</span>
            </button>
          ) : null}
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-primary text-white md:hidden">
            <BookOpenText aria-hidden="true" size={20} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">
              {stage.eyebrow}
            </p>
            <p className="truncate text-sm font-semibold text-navy-primary">{stage.label}</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-success-text/20 bg-success-bg px-3 py-1.5 text-xs font-bold text-success-text sm:flex">
          <FileCheck2 aria-hidden="true" size={15} />
          Guía editorial · 28 páginas
        </div>
      </header>

      <main aria-live="polite" className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10 xl:py-10">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeStage}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0.08 : 0.2 }}
          >
            <StageContent
              activeStage={activeStage}
              visitedStages={visitedStages}
              onNavigate={navigate}
            />
          </motion.div>
        </AnimatePresence>
      </main>
    </AppShell>
  );
}
