"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpenCheck,
  ChevronRight,
  PanelLeftClose,
} from "lucide-react";
import { STAGE_NAV_ITEMS, type StageId } from "@/data/navigation";

type StudyNavProps = Readonly<{
  activeStage: StageId;
  visitedStages: ReadonlySet<StageId>;
  sidebarCollapsed: boolean;
  onStageChange: (stage: StageId) => void;
  onSidebarToggle: () => void;
}>;

export function StudyNav({
  activeStage,
  visitedStages,
  sidebarCollapsed,
  onStageChange,
  onSidebarToggle,
}: StudyNavProps) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <aside
        className={clsx(
          "hidden border-r border-white/10 bg-navy-primary text-white md:fixed md:inset-y-0 md:left-0 md:z-40 md:h-screen md:w-60 md:flex-col lg:w-[17rem]",
          sidebarCollapsed ? "md:hidden" : "md:flex",
        )}
      >
        <div className="relative border-b border-white/10 px-5 py-6 lg:px-6">
          <button
            type="button"
            aria-label="Ocultar navegación"
            onClick={onSidebarToggle}
            className="absolute right-3 top-4 flex h-11 w-11 items-center justify-center rounded-xl text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-gray"
          >
            <PanelLeftClose aria-hidden="true" size={19} />
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-gray">
            <BookOpenCheck aria-hidden="true" size={22} />
          </div>
          <p className="mt-5 text-[0.65rem] font-extrabold uppercase tracking-[0.17em] text-blue-gray/80">
            Operación Renta · PEP 1
          </p>
          <p className="mt-2 font-display text-xl font-bold leading-tight">
            Mesa de estudio CPT
          </p>
        </div>

        <nav aria-label="Etapas de aprendizaje" className="flex-1 space-y-1 px-3 py-5">
          {STAGE_NAV_ITEMS.map(({ id, icon: Icon, label }, index) => {
            const active = id === activeStage;
            const visited = visitedStages.has(id);

            return (
              <button
                key={id}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => onStageChange(id)}
                className={clsx(
                  "group relative flex min-h-12 w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-gray",
                  active ? "text-navy-primary" : "text-white/72 hover:bg-white/8 hover:text-white",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="desktop-stage"
                    transition={{ duration: reduceMotion ? 0 : 0.22 }}
                    className="absolute inset-0 bg-white"
                  />
                ) : null}
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/15">
                  <Icon aria-hidden="true" size={17} />
                </span>
                <span className="relative min-w-0 flex-1 truncate">
                  <span className="mr-2 font-mono text-[0.65rem] opacity-60">0{index + 1}</span>
                  {label}
                </span>
                {visited && !active ? (
                  <span className="relative h-1.5 w-1.5 rounded-full bg-blue-gray" aria-label="Visitado" />
                ) : (
                  <ChevronRight aria-hidden="true" className="relative opacity-45" size={15} />
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-5 py-5 text-xs leading-5 text-white/55 lg:px-6">
          F → depuración → T → CPT → control
        </div>
      </aside>

      <nav
        aria-label="Etapas de aprendizaje"
        className="app-bottom-nav fixed inset-x-0 bottom-0 z-50 border-t border-navy-primary/10 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(23,50,77,0.12)] backdrop-blur-xl md:hidden"
      >
        <div className="mx-auto grid max-w-xl grid-cols-5 gap-1">
          {STAGE_NAV_ITEMS.map(({ id, icon: Icon, label }) => {
            const active = id === activeStage;

            return (
              <button
                key={id}
                type="button"
                aria-current={active ? "page" : undefined}
                aria-label={label}
                onClick={() => onStageChange(id)}
                className={clsx(
                  "relative isolate flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[0.625rem] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroleum",
                  active ? "text-navy-primary" : "text-graphite/65",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="mobile-stage"
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    className="absolute inset-1 -z-10 rounded-lg bg-blue-gray"
                  />
                ) : null}
                <Icon aria-hidden="true" size={18} />
                <span className="max-w-full truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
