"use client";

import clsx from "clsx";
import {
  AlarmClock,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  LockKeyhole,
  RotateCcw,
  Send,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PRACTICE_EXAM } from "@/data/study";
import { formatClp } from "@/lib/format";

type TheoryAnswers = Readonly<Record<string, "true" | "false" | undefined>>;
type NumericAnswers = Readonly<Record<string, string>>;

function parseClpInput(value: string): number {
  const digits = value.replace(/[^\d-]/g, "");
  return digits === "" || digits === "-" ? Number.NaN : Number(digits);
}

function formatRemaining(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

export function AppliedExam() {
  const initialSeconds = PRACTICE_EXAM.durationMinutes * 60;
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [remaining, setRemaining] = useState(initialSeconds);
  const [theoryAnswers, setTheoryAnswers] = useState<TheoryAnswers>({});
  const [numericAnswers, setNumericAnswers] = useState<NumericAnswers>({});

  useEffect(() => {
    if (!started || submitted || remaining === 0) return;

    const timer = window.setInterval(() => {
      if (remaining <= 1) {
        setRemaining(0);
        setSubmitted(true);
        return;
      }

      setRemaining(remaining - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [remaining, started, submitted]);

  const score = useMemo(() => {
    const theoryScore = PRACTICE_EXAM.theoryItems.reduce(
      (total, item) =>
        total + (theoryAnswers[item.id] === item.correctAnswer ? item.points : 0),
      0,
    );
    const numericScore = PRACTICE_EXAM.numericItems.reduce(
      (total, item) =>
        total +
        (parseClpInput(numericAnswers[item.id] ?? "") === item.expected
          ? item.points
          : 0),
      0,
    );

    return theoryScore + numericScore;
  }, [numericAnswers, theoryAnswers]);

  function resetExam() {
    setStarted(false);
    setSubmitted(false);
    setRemaining(initialSeconds);
    setTheoryAnswers({});
    setNumericAnswers({});
  }

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-navy-primary/12 bg-white shadow-[0_18px_45px_rgba(23,50,77,0.08)]">
      <header className="bg-navy-primary px-5 py-6 text-white sm:px-7 sm:py-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-gray/80">
              <ClipboardCheck aria-hidden="true" size={17} />
              Simulacro aplicado
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              {PRACTICE_EXAM.company}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/72">
              {PRACTICE_EXAM.introduction}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:w-72">
            <div className="rounded-xl border border-white/12 bg-white/7 p-3">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-blue-gray/65">Tiempo</p>
              <p className="mt-1 font-mono text-xl font-bold">{formatRemaining(remaining)}</p>
            </div>
            <div className="rounded-xl border border-white/12 bg-white/7 p-3">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-blue-gray/65">Puntaje</p>
              <p className="mt-1 font-mono text-xl font-bold">{submitted ? score : "—"}/100</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
          {!started ? (
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-navy-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-gray"
            >
              <AlarmClock aria-hidden="true" size={17} /> Comenzar prueba
            </button>
          ) : submitted ? (
            <button
              type="button"
              onClick={resetExam}
              className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-navy-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-gray"
            >
              <RotateCcw aria-hidden="true" size={17} /> Nuevo intento
            </button>
          ) : (
            <span className="flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/7 px-4 text-sm font-bold text-blue-gray">
              <AlarmClock aria-hidden="true" size={17} /> Prueba en curso
            </span>
          )}
          <span className="text-xs text-white/55">
            {PRACTICE_EXAM.durationMinutes} minutos · {PRACTICE_EXAM.totalPoints} puntos · respuestas ocultas hasta entregar
          </span>
        </div>
      </header>

      {!started ? (
        <div className="flex items-start gap-3 border-b border-warning-text/20 bg-warning-bg px-5 py-4 text-warning-text sm:px-7">
          <LockKeyhole aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
          <p className="text-sm leading-6">
            Puedes revisar los antecedentes antes de comenzar. Los campos se habilitarán cuando inicies el temporizador.
          </p>
        </div>
      ) : null}

      {submitted ? (
        <div
          role="status"
          className={clsx(
            "flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7",
            score >= 60
              ? "border-success-text/20 bg-success-bg text-success-text"
              : "border-warning-text/20 bg-warning-bg text-warning-text",
          )}
        >
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em]">Resultado del intento</p>
            <p className="mt-1 font-display text-2xl font-bold">
              {score >= 60 ? "Aprobaste el simulacro" : "Conviene revisar el papel de trabajo"}
            </p>
          </div>
          <p className="font-mono text-3xl font-bold">{score}/100</p>
        </div>
      ) : null}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-9 px-5 py-7 sm:px-7 lg:px-8"
      >
        <section>
          <div className="mb-4 flex items-center gap-3">
            <FileText aria-hidden="true" className="text-petroleum" size={20} />
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Antecedentes A</p>
              <h3 className="font-display text-xl font-bold text-navy-primary">Balance y valores tributarios</h3>
            </div>
          </div>
          <div className="space-y-2 md:hidden">
            {PRACTICE_EXAM.balance.map((row) => (
              <article key={row.concept} className="rounded-xl border border-navy-primary/10 bg-light-gray p-3">
                <h4 className="text-sm font-bold text-navy-primary">{row.concept}</h4>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <p><span className="block text-graphite/45">Financiero</span><strong className="mt-1 block font-mono text-graphite">{row.financial}</strong></p>
                  <p><span className="block text-petroleum/65">Tributario</span><strong className="mt-1 block font-mono text-petroleum">{row.tax}</strong></p>
                </div>
              </article>
            ))}
          </div>
          <div className="hidden overflow-hidden rounded-2xl border border-navy-primary/10 md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-primary text-white">
                <tr><th className="px-4 py-3">Concepto</th><th className="px-4 py-3">Valor financiero</th><th className="px-4 py-3">Valor tributario / ajuste</th></tr>
              </thead>
              <tbody>
                {PRACTICE_EXAM.balance.map((row) => (
                  <tr key={row.concept} className="border-t border-navy-primary/10">
                    <th className="bg-blue-gray/35 px-4 py-3 font-medium text-navy-primary">{row.concept}</th>
                    <td className="px-4 py-3 font-mono text-graphite/72">{row.financial}</td>
                    <td className="px-4 py-3 font-mono font-semibold text-petroleum">{row.tax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Antecedentes B</p>
          <h3 className="mt-1 font-display text-xl font-bold text-navy-primary">Datos para razonabilidad</h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {PRACTICE_EXAM.reasonabilityData.map((row) => (
              <div key={row.concept} className="flex items-center justify-between gap-3 rounded-xl border border-navy-primary/10 bg-blue-gray/45 px-3 py-3">
                <span className="text-xs leading-5 text-graphite/65">{row.concept}</span>
                <strong className="shrink-0 font-mono text-xs text-navy-primary">{row.amount}</strong>
              </div>
            ))}
          </div>
        </section>

        <fieldset
          disabled={!started || submitted}
          className={clsx("space-y-4", !started && "opacity-60")}
        >
          <legend className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Parte I · Teoría · 15 puntos</legend>
          {PRACTICE_EXAM.theoryItems.map((item, index) => {
            const correct = theoryAnswers[item.id] === item.correctAnswer;
            return (
              <div key={item.id} className={clsx("rounded-2xl border p-4", submitted ? (correct ? "border-success-text/25 bg-success-bg" : "border-danger-text/20 bg-danger-bg") : "border-navy-primary/10 bg-white")}>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-petroleum">{index + 1}.</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-6 text-navy-primary">{item.statement}</p>
                    <div className="mt-3 flex gap-2">
                      {(["true", "false"] as const).map((answer) => (
                        <label key={answer} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-navy-primary/10 bg-white px-3 text-sm">
                          <input
                            type="radio"
                            name={item.id}
                            value={answer}
                            checked={theoryAnswers[item.id] === answer}
                            onChange={() => setTheoryAnswers((current) => ({ ...current, [item.id]: answer }))}
                            className="accent-petroleum"
                          />
                          {answer === "true" ? "Verdadero" : "Falso"}
                        </label>
                      ))}
                    </div>
                    {submitted ? (
                      <p className={clsx("mt-3 flex items-center gap-1.5 text-xs font-bold", correct ? "text-success-text" : "text-danger-text")}>
                        {correct ? <CheckCircle2 aria-hidden="true" size={15} /> : <XCircle aria-hidden="true" size={15} />}
                        {correct ? `Correcto · ${item.points} puntos` : `Respuesta correcta: ${item.correctAnswer === "true" ? "Verdadero" : "Falso"}`}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </fieldset>

        <fieldset
          disabled={!started || submitted}
          className={clsx("space-y-4", !started && "opacity-60")}
        >
          <legend className="text-xs font-extrabold uppercase tracking-[0.12em] text-petroleum">Parte II · Desarrollo aplicado · 85 puntos</legend>
          <p className="text-sm leading-6 text-graphite/65">
            Prepara tus bloques Más y Menos en papel. Luego ingresa los resultados de control sin puntos ni símbolo peso.
          </p>
          <div className="grid gap-3 lg:grid-cols-2">
            {PRACTICE_EXAM.numericItems.map((item) => {
              const answer = numericAnswers[item.id] ?? "";
              const correct = parseClpInput(answer) === item.expected;
              return (
                <label key={item.id} className={clsx("rounded-2xl border p-4", submitted ? (correct ? "border-success-text/25 bg-success-bg" : "border-danger-text/20 bg-danger-bg") : "border-navy-primary/10 bg-white")}>
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-sm font-bold text-navy-primary">{item.label}</span>
                    <span className="shrink-0 font-mono text-xs font-bold text-petroleum">{item.points} pts</span>
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-graphite/55">{item.hint}</span>
                  <span className="relative mt-3 block">
                    <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-graphite/45">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={answer}
                      onChange={(event) => setNumericAnswers((current) => ({ ...current, [item.id]: event.target.value }))}
                      aria-label={item.label}
                      placeholder="0"
                      className="min-h-12 w-full rounded-xl border border-navy-primary/15 bg-white pl-7 pr-3 font-mono text-sm font-bold text-navy-primary outline-none focus:border-petroleum focus:ring-2 focus:ring-petroleum/15"
                    />
                  </span>
                  {submitted ? (
                    <span className={clsx("mt-3 flex items-center gap-1.5 text-xs font-bold", correct ? "text-success-text" : "text-danger-text")}>
                      {correct ? <CheckCircle2 aria-hidden="true" size={15} /> : <XCircle aria-hidden="true" size={15} />}
                      {correct ? "Correcto" : `Resultado esperado: ${formatClp(item.expected)}`}
                    </span>
                  ) : null}
                </label>
              );
            })}
          </div>
        </fieldset>

        {!submitted ? (
          <div className="flex flex-col gap-3 border-t border-navy-primary/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-graphite/55">
              Al entregar se detiene el intento y se muestran puntaje y respuestas correctas.
            </p>
            <button
              type="submit"
              disabled={!started}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-petroleum px-6 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroleum focus-visible:ring-offset-2"
            >
              <Send aria-hidden="true" size={17} /> Entregar prueba
            </button>
          </div>
        ) : null}
      </form>
    </section>
  );
}
