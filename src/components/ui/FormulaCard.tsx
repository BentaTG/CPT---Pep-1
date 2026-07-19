import { Sigma } from "lucide-react";
import type { Formula } from "@/data/study";

export function FormulaCard({ formula }: Readonly<{ formula: Formula }>) {
  return (
    <article className="overflow-hidden rounded-2xl border border-petroleum/20 bg-white shadow-[0_12px_30px_rgba(23,50,77,0.06)]">
      <div className="flex items-center gap-2 border-b border-petroleum/15 bg-blue-gray/70 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-petroleum">
        <Sigma aria-hidden="true" size={16} />
        {formula.label}
      </div>
      <p className="px-4 py-5 font-mono text-sm font-semibold leading-7 text-navy-primary sm:text-base">
        {formula.expression}
      </p>
      {formula.note ? (
        <p className="border-t border-petroleum/10 px-4 py-3 text-sm leading-5 text-graphite/70">
          {formula.note}
        </p>
      ) : null}
    </article>
  );
}
