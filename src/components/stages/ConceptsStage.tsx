import { ArrowRightLeft, Landmark, Scale, ShieldCheck } from "lucide-react";
import {
  ACCOUNT_RULES,
  FINANCIAL_VS_TAX,
  FORMULAS,
  FOUNDATIONS,
  VALUATION_RULES,
} from "@/data/study";
import { Callout } from "@/components/ui/Callout";
import { FormulaCard } from "@/components/ui/FormulaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StudyDisclosure } from "@/components/ui/StudyDisclosure";

export function ConceptsStage() {
  return (
    <div className="space-y-9">
      <SectionHeading
        eyebrow="Parte I y II · Comprensión"
        title="Construye criterio antes de mover cifras"
        description="El CPT nace al traducir un balance financiero a una lectura tributaria. Estas reglas te permiten decidir qué se conserva, qué se elimina y qué valor debe reemplazarse."
      />

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <article className="rounded-[1.75rem] bg-navy-primary p-6 text-white sm:p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-gray">
            <Landmark aria-hidden="true" size={22} />
          </div>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-gray/75">Concepto clave</p>
          <h2 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl">¿Qué es el CPT?</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/78">{FOUNDATIONS.definition}</p>
          <div className="mt-6 rounded-2xl border border-white/12 bg-white/7 p-4 font-mono text-sm font-bold leading-6 text-blue-gray">
            CPT = capital efectivo − pasivo exigible
          </div>
        </article>

        <Callout label="Idea central">
          <p>{FOUNDATIONS.centralIdea}</p>
          <div className="mt-4 flex items-center gap-2 font-mono text-xs font-bold">
            <span className="rounded-lg bg-white/60 px-2.5 py-2">F</span>
            <ArrowRightLeft aria-hidden="true" size={16} />
            <span className="rounded-lg bg-white/60 px-2.5 py-2">T</span>
          </div>
        </Callout>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-3">
          <Scale aria-hidden="true" className="text-petroleum" size={22} />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">No confundir</p>
            <h2 className="font-display text-2xl font-bold text-navy-primary">Patrimonio financiero versus CPT</h2>
          </div>
        </div>

        <div className="space-y-3 md:hidden">
          {FINANCIAL_VS_TAX.map((row) => (
            <article key={row.aspect} className="overflow-hidden rounded-2xl border border-navy-primary/10 bg-white">
              <h3 className="bg-blue-gray px-4 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-petroleum">{row.aspect}</h3>
              <div className="grid grid-cols-2 divide-x divide-navy-primary/10">
                <div className="p-4">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.09em] text-graphite/45">Financiero</span>
                  <p className="mt-1.5 text-sm leading-5 text-graphite/75">{row.financial}</p>
                </div>
                <div className="p-4">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.09em] text-petroleum">Tributario</span>
                  <p className="mt-1.5 text-sm font-medium leading-5 text-navy-primary">{row.tax}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden overflow-hidden rounded-2xl border border-navy-primary/10 md:block">
          <table className="w-full bg-white text-left">
            <thead className="bg-navy-primary text-white">
              <tr>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.1em]">Aspecto</th>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.1em]">Patrimonio financiero</th>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.1em]">Capital Propio Tributario</th>
              </tr>
            </thead>
            <tbody>
              {FINANCIAL_VS_TAX.map((row) => (
                <tr key={row.aspect} className="border-t border-navy-primary/10">
                  <th className="bg-blue-gray/45 px-4 py-3 text-sm text-navy-primary">{row.aspect}</th>
                  <td className="px-4 py-3 text-sm leading-5 text-graphite/70">{row.financial}</td>
                  <td className="px-4 py-3 text-sm font-medium leading-5 text-navy-primary">{row.tax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-navy-primary/10 bg-white p-5 sm:p-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Método del activo</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-navy-primary">La ruta principal del curso</h2>
          <p className="mt-3 text-sm leading-6 text-graphite/70">
            Parte del activo de balance, reemplaza valores F por T, determina capital efectivo, depura el pasivo y calcula el CPT.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs font-bold text-petroleum">
            {['Activo', 'F/T', 'Capital efectivo', 'Pasivo', 'CPT'].map((item, index) => (
              <div key={item} className="contents">
                <span className="rounded-lg bg-blue-gray px-2.5 py-2">{item}</span>
                {index < 4 ? <span aria-hidden="true">→</span> : null}
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border border-navy-primary/10 bg-white p-5 sm:p-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Método del patrimonio</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-navy-primary">Una ruta alternativa</h2>
          <p className="mt-3 text-sm leading-6 text-graphite/70">
            Parte del patrimonio financiero y agrega o deduce ajustes por valores no tributarios. No es lo mismo que la Prueba de Razonabilidad.
          </p>
          <Callout label="Diferencia decisiva" tone="warning">
            La razonabilidad explica la evolución del CPT desde el saldo inicial; no recalcula simplemente el patrimonio financiero.
          </Callout>
        </article>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Artículo 41</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-navy-primary">Escoge el período antes de calcular CCMM</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {VALUATION_RULES.map((rule) => (
            <article key={rule.item} className="rounded-2xl border border-navy-primary/10 bg-white p-4">
              <h3 className="font-bold text-navy-primary">{rule.item}</h3>
              <p className="mt-2 text-sm leading-5 text-graphite/68">{rule.rule}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {FORMULAS.slice(0, 2).map((formula) => (
          <FormulaCard key={formula.id} formula={formula} />
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center gap-3">
          <ShieldCheck aria-hidden="true" className="text-petroleum" size={22} />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Matriz de análisis</p>
            <h2 className="font-display text-2xl font-bold text-navy-primary">Tratamiento cuenta por cuenta</h2>
          </div>
        </div>
        <div className="space-y-2">
          {ACCOUNT_RULES.map((rule, index) => (
            <StudyDisclosure key={rule.account} title={rule.account} eyebrow={`Cuenta ${String(index + 1).padStart(2, '0')}`}>
              <p>{rule.treatment}</p>
              <p className="mt-3 rounded-xl bg-blue-gray px-3 py-2 text-navy-primary">
                <strong>Control:</strong> {rule.control}
              </p>
            </StudyDisclosure>
          ))}
        </div>
      </section>
    </div>
  );
}
