"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

type StudyDisclosureProps = Readonly<{
  title: string;
  eyebrow?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}>;

export function StudyDisclosure({
  title,
  eyebrow,
  children,
  defaultOpen = false,
}: StudyDisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();

  return (
    <article className="overflow-hidden rounded-2xl border border-navy-primary/10 bg-white">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-petroleum sm:px-5"
      >
        <span>
          {eyebrow ? (
            <span className="block text-[0.65rem] font-extrabold uppercase tracking-[0.13em] text-petroleum">
              {eyebrow}
            </span>
          ) : null}
          <span className="mt-0.5 block font-semibold text-navy-primary">
            {title}
          </span>
        </span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
          className="shrink-0 text-petroleum"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.08 : 0.22 }}
            className="overflow-hidden"
          >
            <div className="border-t border-navy-primary/10 px-4 py-4 text-sm leading-6 text-graphite/80 sm:px-5">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
