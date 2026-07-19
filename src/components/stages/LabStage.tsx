"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, FlaskConical, Scale, Target } from "lucide-react";
import { GUIDED_CASES, type GuidedCase } from "@/data/study";
import { formatClp } from "@/lib/format";
import {
  isRecord,
  STUDY_STORAGE_KEYS,
  usePersistentState,
} from "@/lib/usePersistentState";
import { CalculationTable } from "@/components/study/CalculationTable";
import { Callout } from "@/components/ui/Callout";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Worksheet = "method" | "reasonability";
type LaboratoryProgress = Readonly<{
  selectedCaseId: GuidedCase["id"];
  worksheet: Worksheet;
}>;

const guidedCaseIds = new Set(GUIDED_CASES.map(({ id }) => id));
const initialLaboratoryProgress: LaboratoryProgress = {
  selectedCaseId: "case-1",
  worksheet: "method",
};

function isLaboratoryProgress(value: unknown): value is LaboratoryProgress {
  return (
    isRecord(value) &&
    typeof value.selectedCaseId === "string" &&
    guidedCaseIds.has(value.selectedCaseId as GuidedCase["id"]) &&
    (value.worksheet === "method" || value.worksheet === "reasonability")
  );
}

export function LabStage() {
  const [laboratoryProgress, setLaboratoryProgress] = usePersistentState(
    STUDY_STORAGE_KEYS.laboratory,
    initialLaboratoryProgress,
    isLaboratoryProgress,
  );
  const { selectedCaseId, worksheet } = laboratoryProgress;
  const reduceMotion = useReducedMotion();
  const selectedCase = GUIDED_CASES.find(({ id }) => id === selectedCaseId) ?? GUIDED_CASES[0];

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Parte IV y V · Aplicación"
        title="Trabaja casos que dejan rastro"
        description="Cada caso conserva sus partidas, signos y subtotales. Alterna entre método del activo y razonabilidad para comprobar cómo ambos caminos llegan al mismo CPT."
      />

      <section aria-label="Selector de caso" className="grid grid-cols-3 gap-2 rounded-2xl border border-navy-primary/10 bg-white p-2">
        {GUIDED_CASES.map((studyCase) => (
          <button
            key={studyCase.id}
            type="button"
            aria-pressed={selectedCaseId === studyCase.id}
            onClick={() => {
              setLaboratoryProgress({
                selectedCaseId: studyCase.id,
                worksheet: "method",
              });
            }}
            className={clsx(
              "min-h-12 rounded-xl px-2 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroleum sm:text-sm",
              selectedCaseId === studyCase.id
                ? "bg-navy-primary text-white"
                : "text-graphite/65 hover:bg-blue-gray hover:text-navy-primary",
            )}
          >
            {studyCase.shortLabel}
          </button>
        ))}
      </section>

      <motion.div
        key={selectedCase.id}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.08 : 0.2 }}
        className="space-y-6"
      >
          <section className="overflow-hidden rounded-[1.75rem] bg-navy-primary text-white">
            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-gray/75">
                  <FlaskConical aria-hidden="true" size={16} />
                  {selectedCase.difficulty}
                </div>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em]">{selectedCase.company}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">{selectedCase.summary}</p>
                <div className="mt-5 flex items-start gap-2 rounded-xl border border-white/12 bg-white/7 px-3 py-3 text-sm text-blue-gray">
                  <Target aria-hidden="true" className="mt-0.5 shrink-0" size={17} />
                  <span><strong>Foco:</strong> {selectedCase.focus}</span>
                </div>
              </div>
              <div className="rounded-2xl bg-white p-4 text-navy-primary">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-petroleum">CPT final</p>
                <p className="mt-2 break-words font-mono text-2xl font-bold tabular-nums sm:text-3xl">{formatClp(selectedCase.finalCpt)}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-success-text">
                  <CheckCircle2 aria-hidden="true" size={15} />
                  Control {selectedCase.difference === 0 ? "$0" : formatClp(selectedCase.difference, 2)}
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Papel de trabajo</p>
                <h2 className="mt-1 font-display text-2xl font-bold text-navy-primary">
                  {worksheet === "method" ? "Método del activo" : "Prueba de Razonabilidad"}
                </h2>
              </div>
              <div className="grid grid-cols-2 rounded-xl border border-navy-primary/10 bg-white p-1">
                <button
                  type="button"
                  aria-pressed={worksheet === "method"}
                  onClick={() =>
                    setLaboratoryProgress((current) => ({
                      ...current,
                      worksheet: "method",
                    }))
                  }
                  className={clsx(
                    "min-h-11 rounded-lg px-3 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroleum",
                    worksheet === "method" ? "bg-blue-gray text-navy-primary" : "text-graphite/55",
                  )}
                >
                  Activo
                </button>
                <button
                  type="button"
                  aria-pressed={worksheet === "reasonability"}
                  onClick={() =>
                    setLaboratoryProgress((current) => ({
                      ...current,
                      worksheet: "reasonability",
                    }))
                  }
                  className={clsx(
                    "min-h-11 rounded-lg px-3 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroleum",
                    worksheet === "reasonability" ? "bg-blue-gray text-navy-primary" : "text-graphite/55",
                  )}
                >
                  Razonabilidad
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={worksheet}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.05 : 0.16 }}
              >
                <CalculationTable
                  rows={worksheet === "method" ? selectedCase.methodRows : selectedCase.reasonabilityRows}
                  label={`${selectedCase.company}: ${worksheet === "method" ? "método del activo" : "Prueba de Razonabilidad"}`}
                />
              </motion.div>
            </AnimatePresence>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <Callout label="Interpretación" tone="success">
              {selectedCase.interpretation}
            </Callout>
            {selectedCase.id === "case-2" ? (
              <Callout label="Diferencia decisiva" tone="danger">
                Dividendos percibidos: entrada para la empresa, se agregan. Retiros o dividendos repartidos: salida hacia propietarios, se restan actualizados.
              </Callout>
            ) : (
              <Callout label="Control antes de cuadrar" tone="warning">
                Confirma los valores F/T y los auxiliares antes de mover partidas. Una cuadratura correcta no reemplaza la revisión técnica.
              </Callout>
            )}
          </section>

          <section className="rounded-2xl border border-navy-primary/10 bg-white p-5">
            <div className="flex items-center gap-2 text-petroleum">
              <Scale aria-hidden="true" size={19} />
              <h2 className="font-display text-xl font-bold text-navy-primary">Dos métodos, un control</h2>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-blue-gray p-4">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-petroleum">Capital efectivo</p>
                <p className="mt-2 font-mono text-lg font-bold text-navy-primary">{formatClp(selectedCase.capitalEffective)}</p>
              </div>
              <div className="rounded-xl bg-success-bg p-4">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-success-text">CPT por activo</p>
                <p className="mt-2 font-mono text-lg font-bold text-success-text">{formatClp(selectedCase.finalCpt)}</p>
              </div>
              <div className="rounded-xl bg-success-bg p-4">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-success-text">CPT razonabilidad</p>
                <p className="mt-2 font-mono text-lg font-bold text-success-text">{formatClp(selectedCase.finalCpt)}</p>
              </div>
            </div>
          </section>
      </motion.div>
    </div>
  );
}
