"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import {
  STAGE_NAV_ITEMS,
  type StageId,
} from "@/data/navigation";

type BottomNavProps = Readonly<{
  activeStage: StageId;
  onStageChange: (stage: StageId) => void;
}>;

export function BottomNav({ activeStage, onStageChange }: BottomNavProps) {
  const shouldReduceMotion = useReducedMotion();
  const indicatorTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, bounce: 0, duration: 0.3 };

  return (
    <nav
      aria-label="Etapas de aprendizaje"
      className="app-bottom-nav fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md border-t border-white/70 bg-white/80 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_32px_rgba(23,50,77,0.10)] backdrop-blur-xl"
    >
      <div className="grid grid-cols-5 gap-1">
        {STAGE_NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const isActive = id === activeStage;

          return (
            <motion.button
              key={id}
              type="button"
              aria-current={isActive ? "page" : undefined}
              aria-label={label}
              onClick={() => onStageChange(id)}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.1 }}
              className={clsx(
                "relative isolate flex min-h-14 min-w-0 touch-manipulation flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[0.625rem] font-semibold leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroleum focus-visible:ring-offset-2",
                isActive
                  ? "text-navy-primary"
                  : "text-graphite/65 hover:text-petroleum",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="active-stage-indicator"
                  aria-hidden="true"
                  transition={indicatorTransition}
                  className="absolute inset-1 -z-10 rounded-[0.65rem] bg-blue-gray"
                />
              ) : null}
              <Icon aria-hidden="true" size={18} strokeWidth={1.9} />
              <span className="max-w-full truncate">{label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
