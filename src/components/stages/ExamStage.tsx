"use client";

import { Check, RotateCcw, TimerReset } from "lucide-react";
import { useState } from "react";
import { AppliedExam } from "@/components/study/AppliedExam";
import { FINAL_CHECKLIST, FORMULAS, THEORY_QUESTIONS } from "@/data/study";
import { FormulaCard } from "@/components/ui/FormulaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StudyDisclosure } from "@/components/ui/StudyDisclosure";

export function ExamStage() {
  const [checkedItems, setCheckedItems] = useState<ReadonlySet<number>>(new Set());
  const progress = Math.round((checkedItems.size / FINAL_CHECKLIST.length) * 100);

  function toggleItem(index: number) {
    setCheckedItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="space-y-9">
      <SectionHeading
        eyebrow="Evaluación aplicada · PEP 1"
        title="Resuelve un caso completo antes de mirar las respuestas"
        description="Inicia el temporizador, trabaja el caso en papel y entrega tus resultados. El puntaje y las soluciones aparecen únicamente después de finalizar el intento."
      />

      <AppliedExam />

      <section className="border-t border-navy-primary/10 pt-9">
        <StudyDisclosure
          title="Abrir herramientas de repaso"
          eyebrow="Después del simulacro · contiene respuestas"
        >
          <div className="space-y-9 py-2">
            <section className="rounded-[1.75rem] bg-navy-primary p-5 text-white sm:p-7">
              <div className="flex items-start gap-3">
                <TimerReset aria-hidden="true" className="mt-1 shrink-0 text-blue-gray" size={24} />
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-gray/75">Ruta táctica · 10 minutos</p>
                  <h2 className="mt-1 font-display text-2xl font-bold">Ordena el papel antes de calcular</h2>
                </div>
              </div>
              <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
                {[
                  ["0–2", "Totales y marcas"],
                  ["2–4", "Auxiliares"],
                  ["4–6", "Más y menos"],
                  ["6–9", "Pasivo y CPT"],
                  ["9–10", "Razonabilidad"],
                ].map(([time, task]) => (
                  <article key={time} className="rounded-xl border border-white/12 bg-white/7 p-3">
                    <p className="font-mono text-sm font-bold text-blue-gray">{time} min</p>
                    <p className="mt-1 text-xs leading-5 text-white/65">{task}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Checklist final</p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-navy-primary">Diez controles antes de entregar</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-petroleum">{checkedItems.size}/{FINAL_CHECKLIST.length} · {progress}%</span>
                  <button
                    type="button"
                    onClick={() => setCheckedItems(new Set())}
                    className="flex min-h-11 items-center gap-2 rounded-xl border border-navy-primary/15 bg-white px-3 text-xs font-bold text-navy-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroleum"
                  >
                    <RotateCcw aria-hidden="true" size={15} /> Reiniciar
                  </button>
                </div>
              </div>
              <progress
                value={checkedItems.size}
                max={FINAL_CHECKLIST.length}
                aria-label={`${progress}% del checklist completado`}
                className="study-progress mb-4 h-2 w-full overflow-hidden rounded-full"
              />
              <div className="grid gap-2 lg:grid-cols-2">
                {FINAL_CHECKLIST.map((item, index) => {
                  const checked = checkedItems.has(index);
                  return (
                    <label
                      key={item}
                      className="flex min-h-14 cursor-pointer items-start gap-3 rounded-2xl border border-navy-primary/10 bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-petroleum"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleItem(index)}
                        className="peer sr-only"
                      />
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-petroleum/30 bg-blue-gray text-transparent peer-checked:border-success-text peer-checked:bg-success-bg peer-checked:text-success-text">
                        <Check aria-hidden="true" size={15} strokeWidth={2.5} />
                      </span>
                      <span className={checked ? "text-sm leading-6 text-graphite/45 line-through" : "text-sm leading-6 text-graphite/78"}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="mb-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Memoria activa</p>
                <h2 className="mt-1 font-display text-2xl font-bold text-navy-primary">Preguntas que debes poder explicar</h2>
              </div>
              <div className="space-y-2">
                {THEORY_QUESTIONS.map((item, index) => (
                  <StudyDisclosure key={item.question} title={item.question} eyebrow={`Pregunta ${index + 1} · 3 puntos`}>
                    <p>{item.answer}</p>
                  </StudyDisclosure>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Matriz de memoria</p>
                <h2 className="mt-1 font-display text-2xl font-bold text-navy-primary">Fórmulas de control</h2>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {FORMULAS.map((formula) => (
                  <FormulaCard key={formula.id} formula={formula} />
                ))}
              </div>
            </section>
          </div>
        </StudyDisclosure>
      </section>
    </div>
  );
}
