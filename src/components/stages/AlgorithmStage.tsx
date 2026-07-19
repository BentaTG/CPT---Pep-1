import { AlertCircle, ArrowDown, CheckCircle2, Search } from "lucide-react";
import {
  DIAGNOSTIC_RULES,
  FORMULAS,
  METHOD_STEPS,
  REASONABILITY_ROWS,
} from "@/data/study";
import { Callout } from "@/components/ui/Callout";
import { FormulaCard } from "@/components/ui/FormulaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AlgorithmStage() {
  return (
    <div className="space-y-9">
      <SectionHeading
        eyebrow="Parte III · Procedimiento"
        title="Depura en un orden que puedas auditar"
        description="El orden reduce errores: clasifica, prepara auxiliares, construye capital efectivo, depura el pasivo y recién entonces arma la razonabilidad."
      />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="mb-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Secuencia completa</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-navy-primary">Método del activo, paso a paso</h2>
          </div>
          <ol className="space-y-3">
            {METHOD_STEPS.map((step, index) => (
              <li key={step.title} className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-3">
                {index < METHOD_STEPS.length - 1 ? (
                  <span aria-hidden="true" className="absolute bottom-[-0.75rem] left-[1.45rem] top-12 w-px bg-petroleum/20" />
                ) : null}
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-petroleum/20 bg-blue-gray font-mono text-sm font-bold text-petroleum">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <article className="rounded-2xl border border-navy-primary/10 bg-white px-4 py-4 sm:px-5">
                  <h3 className="font-bold text-navy-primary">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-graphite/68">{step.description}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <FormulaCard formula={FORMULAS[0]} />
          <Callout label="Clave de examen" tone="success">
            Calcula CPT primero. Usa la razonabilidad como un segundo papel de trabajo independiente y compara al final.
          </Callout>
          <Callout label="Atención" tone="warning">
            No registres solo una diferencia F/T sin saber qué eliminaste y qué incorporaste. La trazabilidad importa tanto como el efecto neto.
          </Callout>
        </aside>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Segundo papel de trabajo</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-navy-primary">Prueba de Razonabilidad</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-graphite/68">
            Explica por qué el CPT aumentó o disminuyó desde el inicio del ejercicio hasta el resultado final.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)]">
          <div className="overflow-hidden rounded-2xl border border-navy-primary/10 bg-white">
            {REASONABILITY_ROWS.map((row, index) => (
              <div key={row.item} className="grid grid-cols-[minmax(0,1fr)_8.5rem] border-t border-navy-primary/10 first:border-t-0">
                <div className="px-4 py-3 text-sm text-graphite sm:px-5">
                  <span className="mr-2 font-mono text-[0.65rem] text-graphite/35">{String(index + 1).padStart(2, "0")}</span>
                  {row.item}
                </div>
                <div className="flex items-center justify-center border-l border-navy-primary/10 bg-blue-gray/55 px-3 py-3 text-center font-mono text-xs font-bold text-petroleum">
                  {row.sign}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <FormulaCard
              formula={{
                id: "reasonability",
                label: "CPT final esperado",
                expression: "CPT inicial + CCMM + capital + resultados ± otras partidas",
              }}
            />
            <Callout label="Pérdida anterior utilizada">
              Se agrega porque ya redujo la RLI. Así evitas que la explicación patrimonial disminuya dos veces.
            </Callout>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-3">
          <Search aria-hidden="true" className="text-petroleum" size={22} />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Médico de descuadres</p>
            <h2 className="font-display text-2xl font-bold text-navy-primary">La diferencia es una pista</h2>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {DIAGNOSTIC_RULES.map((rule) => (
            <article key={rule.difference} className="rounded-2xl border border-navy-primary/10 bg-white p-4">
              <div className="flex items-center gap-2 text-warning-text">
                <AlertCircle aria-hidden="true" size={17} />
                <h3 className="text-sm font-bold">{rule.difference}</h3>
              </div>
              <div className="my-3 flex items-center gap-2 text-petroleum/45">
                <span className="h-px flex-1 bg-petroleum/15" />
                <ArrowDown aria-hidden="true" size={14} />
                <span className="h-px flex-1 bg-petroleum/15" />
              </div>
              <p className="text-sm leading-5 text-graphite/68">{rule.review}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-success-text/20 bg-success-bg p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0 text-success-text" size={22} />
          <div>
            <h2 className="font-display text-xl font-bold text-success-text">Qué significa que cuadre</h2>
            <p className="mt-2 text-sm leading-6 text-success-text/85">
              Una diferencia cero demuestra consistencia entre ambos papeles de trabajo. No demuestra que todos los criterios sean correctos: el mismo error puede repetirse en ambos cálculos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
