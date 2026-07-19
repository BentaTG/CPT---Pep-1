"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { MobileShell } from "@/components/layout/MobileShell";
import { getStage, type StageId } from "@/data/navigation";

export default function Home() {
  const [activeStage, setActiveStage] = useState<StageId>("radar");
  const shouldReduceMotion = useReducedMotion();
  const stage = getStage(activeStage);
  const StageIcon = stage.icon;

  const stageMotion = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
      };

  return (
    <MobileShell>
      <header className="bg-navy-primary px-5 pb-7 pt-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-gray">
          PEP 1 · Entrenamiento CPT
        </p>
        <h1 className="mt-2 text-[clamp(1.75rem,8vw,2.25rem)] font-bold leading-[1.05] tracking-[-0.025em]">
          Capital Propio Tributario
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
          Avanza desde la comprensión hasta una resolución segura y verificable.
        </p>
      </header>

      <main aria-live="polite" className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.section
            key={stage.id}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={stageMotion}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.22 }}
            className="rounded-3xl border border-white/90 bg-white p-5 shadow-[0_16px_40px_rgba(23,50,77,0.08)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-gray text-petroleum">
              <StageIcon aria-hidden="true" size={22} strokeWidth={1.9} />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-petroleum">
              {stage.eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-navy-primary">
              {stage.title}
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-6 text-graphite/80">
              {stage.description}
            </p>
            <div className="mt-6 rounded-2xl border-l-4 border-petroleum bg-blue-gray p-4">
              <p className="text-sm font-semibold text-navy-primary">
                Módulo preparado
              </p>
              <p className="mt-1 text-sm leading-5 text-graphite/75">
                Esta base alojará el contenido interactivo de la etapa en la siguiente iteración.
              </p>
            </div>
          </motion.section>
        </AnimatePresence>
      </main>

      <BottomNav activeStage={activeStage} onStageChange={setActiveStage} />
    </MobileShell>
  );
}
