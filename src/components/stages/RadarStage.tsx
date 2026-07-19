"use client";

import { ArrowRight, Check, Clock3, Route } from "lucide-react";
import { STAGE_NAV_ITEMS, type StageId } from "@/data/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";

type RadarStageProps = Readonly<{
  visitedStages: ReadonlySet<StageId>;
  onNavigate: (stage: StageId) => void;
}>;

export function RadarStage({ visitedStages, onNavigate }: RadarStageProps) {
  const completed = Math.max(0, visitedStages.size - 1);
  const progress = Math.round((completed / 4) * 100);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Radar de aprendizaje"
        title="Del balance a una cuadratura que puedas explicar"
        description="La guía completa se convirtió en un recorrido de estudio: primero comprendes las reglas, luego depuras, practicas con cifras reales y finalmente repasas bajo presión de examen."
      />

      <section className="relative overflow-hidden rounded-[1.75rem] bg-navy-primary px-5 py-7 text-white shadow-[0_20px_55px_rgba(23,50,77,0.18)] sm:px-7 lg:px-9 lg:py-9">
        <div className="absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-20 rounded-full border-[32px] border-white/5" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-gray/80">
              Trazabilidad tributaria
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-sm font-bold sm:text-base">
              {[
                ["F", "Valor financiero"],
                ["T", "Valor tributario"],
                ["CPT", "Capital propio"],
                ["$0", "Control"],
              ].map(([code, label], index) => (
                <div key={code} className="contents">
                  <div className="rounded-xl border border-white/15 bg-white/8 px-3 py-2.5">
                    <span className="block text-blue-gray">{code}</span>
                    <span className="mt-0.5 block font-sans text-[0.65rem] font-medium text-white/55">
                      {label}
                    </span>
                  </div>
                  {index < 3 ? <ArrowRight aria-hidden="true" size={16} className="text-white/35" /> : null}
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-xl text-sm leading-6 text-white/70">
              La meta no es memorizar filas aisladas. Debes reconocer qué representa cada cuenta, por qué cambia su valor y cómo ese cambio llega al resultado final.
            </p>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/7 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-blue-gray/75">
                Recorrido explorado
              </span>
              <span className="font-mono text-xl font-bold">{progress}%</span>
            </div>
            <progress
              value={completed}
              max={4}
              aria-label={`${progress}% del recorrido explorado`}
              className="study-progress mt-3 h-2 w-full overflow-hidden rounded-full"
            />
            <button
              type="button"
              onClick={() => onNavigate("conceptos")}
              className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-navy-primary transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-gray"
            >
              Comenzar por conceptos
              <ArrowRight aria-hidden="true" size={17} />
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-petroleum">Ruta recomendada</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-navy-primary">Cinco estaciones, un solo papel de trabajo</h2>
          </div>
          <Route aria-hidden="true" className="hidden text-petroleum sm:block" size={26} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {STAGE_NAV_ITEMS.filter(({ id }) => id !== "radar").map((stage, index) => {
            const visited = visitedStages.has(stage.id);
            const Icon = stage.icon;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => onNavigate(stage.id)}
                className="group min-h-44 rounded-2xl border border-navy-primary/10 bg-white p-5 text-left shadow-[0_10px_28px_rgba(23,50,77,0.05)] transition-[transform,border-color] hover:-translate-y-1 hover:border-petroleum/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroleum"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-gray text-petroleum">
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  {visited ? (
                    <span className="flex items-center gap-1 rounded-full bg-success-bg px-2 py-1 text-[0.65rem] font-bold text-success-text">
                      <Check aria-hidden="true" size={12} /> Visitado
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-graphite/35">0{index + 2}</span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-primary group-hover:text-petroleum">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-graphite/65">{stage.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          ["Primera vuelta", "Conceptos y fórmulas sin presión.", "35 min"],
          ["Segunda vuelta", "Casos guiados ocultando resultados.", "45 min"],
          ["Última revisión", "Checklist, signos y diferencias.", "10 min"],
        ].map(([title, text, time]) => (
          <article key={title} className="rounded-2xl border border-navy-primary/10 bg-blue-gray/60 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-petroleum">
              <Clock3 aria-hidden="true" size={15} /> {time}
            </div>
            <h3 className="mt-3 font-bold text-navy-primary">{title}</h3>
            <p className="mt-1 text-sm leading-5 text-graphite/65">{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
