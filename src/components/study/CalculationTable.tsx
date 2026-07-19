import clsx from "clsx";
import type { CalculationRow } from "@/data/study";
import { formatSignedClp } from "@/lib/format";

const signLabels = {
  base: "BASE",
  "+": "+",
  "-": "−",
  "=": "=",
} as const;

export function CalculationTable({
  rows,
  label,
}: Readonly<{ rows: readonly CalculationRow[]; label: string }>) {
  return (
    <div>
      <div className="space-y-2 md:hidden" aria-label={label}>
        {rows.map((row, index) => (
          <div
            key={`${row.concept}-${index}`}
            className={clsx(
              "grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-3 rounded-xl border px-3 py-3",
              row.result
                ? "border-success-text/25 bg-success-bg"
                : "border-navy-primary/10 bg-white",
            )}
          >
            <span
              className={clsx(
                "row-span-2 flex min-h-11 items-center justify-center rounded-lg font-mono text-xs font-bold",
                row.sign === "-"
                  ? "bg-warning-bg text-warning-text"
                  : row.result
                    ? "bg-white/70 text-success-text"
                    : "bg-blue-gray text-petroleum",
              )}
            >
              {signLabels[row.sign]}
            </span>
            <span className="text-sm font-medium leading-5 text-graphite">
              {row.concept}
            </span>
            <span className="mt-1 font-mono text-sm font-bold tabular-nums text-navy-primary">
              {formatSignedClp(row.amount, row.sign)}
            </span>
          </div>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-navy-primary/10 md:block">
        <table className="w-full border-collapse text-left" aria-label={label}>
          <thead className="bg-navy-primary text-white">
            <tr>
              <th className="w-20 px-4 py-3 text-xs uppercase tracking-[0.1em]">Signo</th>
              <th className="px-4 py-3 text-xs uppercase tracking-[0.1em]">Concepto</th>
              <th className="px-4 py-3 text-right text-xs uppercase tracking-[0.1em]">Monto</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row.concept}-${index}`}
                className={clsx(
                  "border-t border-navy-primary/10",
                  row.result ? "bg-success-bg" : "bg-white",
                )}
              >
                <td
                  className={clsx(
                    "px-4 py-3 text-center font-mono text-xs font-bold",
                    row.sign === "-" ? "text-warning-text" : "text-petroleum",
                  )}
                >
                  {signLabels[row.sign]}
                </td>
                <td className={clsx("px-4 py-3 text-sm", row.result && "font-bold text-success-text")}>
                  {row.concept}
                </td>
                <td className={clsx("px-4 py-3 text-right font-mono text-sm font-semibold tabular-nums", row.result ? "text-success-text" : "text-navy-primary")}>
                  {formatSignedClp(row.amount, row.sign)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
