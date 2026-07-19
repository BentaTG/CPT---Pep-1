export type Formula = Readonly<{
  id: string;
  label: string;
  expression: string;
  note?: string;
}>;

export type ComparisonRow = Readonly<{
  aspect: string;
  financial: string;
  tax: string;
}>;

export type AccountRule = Readonly<{
  account: string;
  treatment: string;
  control: string;
}>;

export type CalculationSign = "+" | "-" | "=" | "base";

export type CalculationRow = Readonly<{
  sign: CalculationSign;
  concept: string;
  amount: number;
  result?: boolean;
}>;

export type GuidedCase = Readonly<{
  id: "case-1" | "case-2" | "practice";
  shortLabel: string;
  company: string;
  difficulty: string;
  focus: string;
  summary: string;
  methodRows: readonly CalculationRow[];
  reasonabilityRows: readonly CalculationRow[];
  capitalEffective: number;
  finalCpt: number;
  difference: number;
  interpretation: string;
}>;

export type ExamTheoryItem = Readonly<{
  id: string;
  statement: string;
  correctAnswer: "true" | "false";
  points: number;
}>;

export type ExamNumericItem = Readonly<{
  id: string;
  label: string;
  hint: string;
  expected: number;
  points: number;
}>;

export const FOUNDATIONS = Object.freeze({
  definition:
    "El Capital Propio Tributario (CPT) es el conjunto de bienes, derechos y obligaciones de una empresa expresados a valores tributarios.",
  centralIdea:
    "No se toma el patrimonio financiero tal como aparece en el balance. Primero se depuran activos y pasivos y, cuando corresponde, se reemplazan los valores financieros por valores tributarios.",
  characteristics: Object.freeze([
    "Puede ser positivo o negativo.",
    "Es una magnitud tributaria; no equivale automáticamente al patrimonio financiero.",
    "Se determina al inicio del ejercicio a partir de los saldos al cierre anterior.",
    "Sirve como base para determinar rentas o cantidades acumuladas pendientes de tributación y otros controles tributarios.",
    "Debe prepararse antes del Formulario N.º 22 y conservarse con sus respaldos.",
  ]),
  taxpayers: Object.freeze([
    "Régimen general: artículo 14 letra A) LIR.",
    "Régimen Pro-Pyme general: artículo 14 letra D) N.º 3.",
    "Régimen Pro-Pyme transparente: artículo 14 letra D) N.º 8.",
  ]),
});

export const FORMULAS: readonly Formula[] = Object.freeze([
  Object.freeze({
    id: "cpt",
    label: "Capital Propio Tributario",
    expression: "CPT = capital efectivo − pasivo exigible",
    note: "Capital efectivo: activo depurado a valor tributario. Pasivo exigible: obligaciones reales frente a terceros.",
  }),
  Object.freeze({
    id: "capital-effective",
    label: "Capital efectivo",
    expression:
      "Capital efectivo = activo de balance + activos T − activos F − partidas sin inversión efectiva",
  }),
  Object.freeze({
    id: "passive",
    label: "Pasivo exigible",
    expression:
      "Pasivo exigible = total pasivo − patrimonio − partidas sin obligación real",
  }),
  Object.freeze({
    id: "ccmm",
    label: "Corrección monetaria",
    expression: "CCMM = base × factor IPC",
    note: "El error más frecuente es escoger el período equivocado, no la multiplicación.",
  }),
  Object.freeze({
    id: "control",
    label: "Diferencia de control",
    expression:
      "Diferencia = CPT razonabilidad − CPT método del activo",
  }),
]);

export const FINANCIAL_VS_TAX: readonly ComparisonRow[] = Object.freeze([
  Object.freeze({
    aspect: "Norma base",
    financial: "Criterios contables y financieros.",
    tax: "LIR y valores tributarios.",
  }),
  Object.freeze({
    aspect: "Activos",
    financial: "Valor contable.",
    tax: "Inversiones efectivas a valor tributario.",
  }),
  Object.freeze({
    aspect: "Pasivos",
    financial: "Incluye cuentas contables y patrimonio según presentación.",
    tax: "Solo obligaciones reales y exigibles.",
  }),
  Object.freeze({
    aspect: "Impuestos diferidos",
    financial: "Pueden reconocerse como activo o pasivo.",
    tax: "Valor tributario cero en los casos de clase.",
  }),
  Object.freeze({
    aspect: "Objetivo",
    financial: "Mostrar la posición financiera.",
    tax: "Medir el patrimonio tributario y validar su evolución.",
  }),
]);

export const VALUATION_RULES = Object.freeze([
  Object.freeze({
    item: "CPT inicial",
    rule: "IPC anual: desde el último día del segundo mes anterior al inicio hasta el último día del mes anterior al balance.",
  }),
  Object.freeze({
    item: "Aumentos de capital",
    rule: "IPC desde el último día del mes anterior al aumento hasta el último día del mes anterior al balance.",
  }),
  Object.freeze({
    item: "Retiros y dividendos",
    rule: "IPC desde el último día del mes anterior al movimiento hasta el último día del mes anterior al balance.",
  }),
  Object.freeze({
    item: "Activo inmovilizado",
    rule: "Saldo anterior con IPC anual; adquisiciones del año desde el mes anterior a la compra.",
  }),
  Object.freeze({
    item: "Existencias",
    rule: "Costo de reposición a la fecha del balance.",
  }),
  Object.freeze({
    item: "Créditos y moneda extranjera",
    rule: "Cotización al cierre o reajuste pactado.",
  }),
]);

export const ACCOUNT_RULES: readonly AccountRule[] = Object.freeze([
  Object.freeze({
    account: "Caja y bancos",
    treatment: "Se mantienen si el valor financiero coincide con el tributario.",
    control: "Conciliar saldo.",
  }),
  Object.freeze({
    account: "Fondos mutuos",
    treatment: "Restar valor financiero y sumar valor tributario.",
    control: "Costo tributario más reajuste; no usar automáticamente valor cuota.",
  }),
  Object.freeze({
    account: "Inversiones relacionadas",
    treatment: "Restar valor financiero y sumar costo tributario corregido.",
    control: "Fecha, costo y factor IPC.",
  }),
  Object.freeze({
    account: "PPM",
    treatment: "Mantener saldo y agregar reajuste no registrado, si corresponde.",
    control: "Planilla mensual de PPM.",
  }),
  Object.freeze({
    account: "Activo fijo",
    treatment: "Eliminar activo financiero; incorporar activo tributario y depreciación tributaria acumulada.",
    control: "Control por bien.",
  }),
  Object.freeze({
    account: "Deudores incobrables",
    treatment: "Reemplazar castigo financiero por el aceptado tributariamente.",
    control: "Antigüedad y porcentajes.",
  }),
  Object.freeze({
    account: "Impuestos diferidos",
    treatment: "Eliminar activo y pasivo: valor tributario cero en los casos.",
    control: "No representan inversión u obligación tributaria real.",
  }),
  Object.freeze({
    account: "Retiros o dividendos a socios",
    treatment: "Eliminar del activo y restar el monto actualizado en razonabilidad.",
    control: "No confundir con dividendos percibidos.",
  }),
  Object.freeze({
    account: "Capital, RCP y utilidades",
    treatment: "Eliminar del pasivo total para llegar al pasivo exigible.",
    control: "Son patrimonio, no deudas frente a terceros.",
  }),
]);

export const METHOD_STEPS = Object.freeze([
  Object.freeze({
    title: "Fija los totales",
    description: "Copia el total de activo y el total de pasivo del balance al 31 de diciembre.",
  }),
  Object.freeze({
    title: "Clasifica cada cuenta",
    description: "Marca patrimonio, diferencias F/T, contra-cuentas y partidas con valor tributario cero.",
  }),
  Object.freeze({
    title: "Prepara los auxiliares",
    description: "Calcula IPC, inversiones, activo fijo, depreciación, PPM e incobrables antes de depurar.",
  }),
  Object.freeze({
    title: "Construye capital efectivo",
    description: "Agrega valores tributarios y elimina valores financieros o partidas sin inversión efectiva.",
  }),
  Object.freeze({
    title: "Depura el pasivo",
    description: "Parte del pasivo total y excluye patrimonio, contra-activos y partidas sin obligación real.",
  }),
  Object.freeze({
    title: "Calcula CPT",
    description: "Resta el pasivo exigible al capital efectivo y deja el resultado visible.",
  }),
  Object.freeze({
    title: "Cuadra por razonabilidad",
    description: "Explica la evolución desde el CPT inicial y usa cualquier diferencia como pista de auditoría.",
  }),
]);

export const REASONABILITY_ROWS = Object.freeze([
  Object.freeze({ item: "CPT inicial", sign: "+ o − según saldo" }),
  Object.freeze({ item: "CCMM del CPT inicial", sign: "+ si es positivo; analizar si es negativo" }),
  Object.freeze({ item: "Aumentos efectivos actualizados", sign: "+" }),
  Object.freeze({ item: "Disminuciones efectivas actualizadas", sign: "−" }),
  Object.freeze({ item: "RLI afecta a IDPC", sign: "+" }),
  Object.freeze({ item: "Pérdida tributaria del ejercicio", sign: "−" }),
  Object.freeze({ item: "Pérdidas anteriores utilizadas", sign: "+" }),
  Object.freeze({ item: "Dividendos percibidos", sign: "+" }),
  Object.freeze({ item: "Retiros o dividendos repartidos", sign: "− reajustado" }),
  Object.freeze({ item: "Partidas Art. 21", sign: "− reajustado" }),
]);

export const DIAGNOSTIC_RULES = Object.freeze([
  Object.freeze({
    difference: "Coincide con la CCMM de un retiro",
    review: "Comprueba si usaste el monto histórico en vez del actualizado.",
  }),
  Object.freeze({
    difference: "Coincide con un retiro completo",
    review: "Verifica su eliminación del activo y su deducción en razonabilidad.",
  }),
  Object.freeze({
    difference: "Coincide con valor F − T",
    review: "Revisa si eliminaste F y agregaste T, o solo registraste una parte.",
  }),
  Object.freeze({
    difference: "Coincide con impuesto diferido",
    review: "Verifica que activo y pasivo hayan sido llevados a valor tributario cero.",
  }),
  Object.freeze({
    difference: "Coincide con depreciación acumulada",
    review: "Revisa la contra-cuenta financiera y la depreciación tributaria.",
  }),
  Object.freeze({
    difference: "$1 o menos",
    review: "Controla decimales internos antes de cambiar la lógica.",
  }),
]);

const caseOneMethod = Object.freeze([
  Object.freeze({ sign: "base", concept: "Total activo", amount: 425_521_945 }),
  Object.freeze({ sign: "+", concept: "Fondos mutuos T", amount: 28_321_037 }),
  Object.freeze({ sign: "+", concept: "Inversión relacionada T", amount: 60_889_774 }),
  Object.freeze({ sign: "+", concept: "Reajuste PPM", amount: 6_130 }),
  Object.freeze({ sign: "-", concept: "Dividendos socios", amount: 80_000_000 }),
  Object.freeze({ sign: "-", concept: "Fondos mutuos F", amount: 25_863_737 }),
  Object.freeze({ sign: "-", concept: "Inversión relacionada F", amount: 42_000_000 }),
  Object.freeze({ sign: "=", concept: "Capital efectivo", amount: 366_875_149, result: true }),
  Object.freeze({ sign: "-", concept: "Total pasivo", amount: 422_001_308 }),
  Object.freeze({ sign: "+", concept: "Capital", amount: 102_097_243 }),
  Object.freeze({ sign: "+", concept: "Revalorización CPT", amount: 108_373_658 }),
  Object.freeze({ sign: "+", concept: "Resultados acumulados", amount: 99_062_931 }),
  Object.freeze({ sign: "+", concept: "Ajuste anticipo clientes", amount: 25_262_046 }),
  Object.freeze({ sign: "=", concept: "CPT al 01.01.2026", amount: 279_669_719, result: true }),
] satisfies readonly CalculationRow[]);

const caseOneReasonability = Object.freeze([
  Object.freeze({ sign: "base", concept: "CPT inicial", amount: 239_639_201 }),
  Object.freeze({ sign: "+", concept: "CCMM CPT inicial", amount: 8_147_733 }),
  Object.freeze({ sign: "+", concept: "Aumento de capital actualizado", amount: 101_200_000 }),
  Object.freeze({ sign: "+", concept: "RLI del ejercicio", amount: 25_180_472 }),
  Object.freeze({ sign: "-", concept: "Dividendos repartidos actualizados", amount: 80_880_000 }),
  Object.freeze({ sign: "-", concept: "Partidas Art. 21", amount: 13_617_686 }),
  Object.freeze({ sign: "=", concept: "CPT final", amount: 279_669_719, result: true }),
] satisfies readonly CalculationRow[]);

const caseTwoMethod = Object.freeze([
  Object.freeze({ sign: "base", concept: "Total activo", amount: 1_000_111_440 }),
  Object.freeze({ sign: "+", concept: "Activo fijo tributario normal", amount: 647_713_877 }),
  Object.freeze({ sign: "+", concept: "Activo fijo tributario acelerado", amount: 57_169_797 }),
  Object.freeze({ sign: "+", concept: "Crédito activo fijo", amount: 3_649_136 }),
  Object.freeze({ sign: "+", concept: "Inversión Chile SpA T", amount: 42_135_914 }),
  Object.freeze({ sign: "-", concept: "Retiros de socios", amount: 37_500_000 }),
  Object.freeze({ sign: "-", concept: "Activo fijo financiero", amount: 501_582_266 }),
  Object.freeze({ sign: "-", concept: "Depreciación acumulada T", amount: 156_183_581 }),
  Object.freeze({ sign: "-", concept: "Activo por impuesto diferido", amount: 11_986_347 }),
  Object.freeze({ sign: "-", concept: "Deudores incobrables T", amount: 18_831_432 }),
  Object.freeze({ sign: "-", concept: "Inversión financiera", amount: 32_780_333 }),
  Object.freeze({ sign: "=", concept: "Capital efectivo", amount: 991_916_205, result: true }),
  Object.freeze({ sign: "-", concept: "Total pasivo", amount: 770_517_206 }),
  Object.freeze({ sign: "+", concept: "Capital pagado", amount: 30_669_339 }),
  Object.freeze({ sign: "+", concept: "Revalorización CPT", amount: 92_738_450 }),
  Object.freeze({ sign: "+", concept: "Utilidades acumuladas", amount: 328_483_691 }),
  Object.freeze({ sign: "+", concept: "Depreciación acumulada financiera", amount: 195_568_436 }),
  Object.freeze({ sign: "+", concept: "Deudores incobrables financieros", amount: 35_128_141 }),
  Object.freeze({ sign: "+", concept: "Pasivo por impuesto diferido", amount: 5_369_064 }),
  Object.freeze({ sign: "=", concept: "CPT al 01.01.2026", amount: 909_356_120, result: true }),
] satisfies readonly CalculationRow[]);

const caseTwoReasonability = Object.freeze([
  Object.freeze({ sign: "base", concept: "CPT inicial", amount: 668_745_650 }),
  Object.freeze({ sign: "+", concept: "CCMM CPT inicial", amount: 22_737_352 }),
  Object.freeze({ sign: "+", concept: "RLI", amount: 141_790_579 }),
  Object.freeze({ sign: "+", concept: "Pérdida de ejercicios anteriores utilizada", amount: 109_456_468 }),
  Object.freeze({ sign: "+", concept: "Dividendos percibidos", amount: 4_500_000 }),
  Object.freeze({ sign: "-", concept: "Retiros repartidos actualizados", amount: 37_873_929 }),
  Object.freeze({ sign: "=", concept: "CPT final", amount: 909_356_120, result: true }),
] satisfies readonly CalculationRow[]);

const practiceMethod = Object.freeze([
  Object.freeze({ sign: "base", concept: "Total activo", amount: 600_000_000 }),
  Object.freeze({ sign: "+", concept: "Bloque Más", amount: 202_000_000 }),
  Object.freeze({ sign: "-", concept: "Bloque Menos", amount: 239_000_000 }),
  Object.freeze({ sign: "=", concept: "Capital efectivo", amount: 563_000_000, result: true }),
  Object.freeze({ sign: "-", concept: "Total pasivo", amount: 500_000_000 }),
  Object.freeze({ sign: "+", concept: "Cuentas a depurar", amount: 382_000_000 }),
  Object.freeze({ sign: "=", concept: "CPT final", amount: 445_000_000, result: true }),
] satisfies readonly CalculationRow[]);

const practiceReasonability = Object.freeze([
  Object.freeze({ sign: "base", concept: "CPT inicial", amount: 320_000_000 }),
  Object.freeze({ sign: "+", concept: "CCMM CPT", amount: 10_880_000 }),
  Object.freeze({ sign: "+", concept: "Aumento actualizado", amount: 40_480_000 }),
  Object.freeze({ sign: "+", concept: "RLI", amount: 90_000_000 }),
  Object.freeze({ sign: "+", concept: "Pérdida anterior utilizada", amount: 20_000_000 }),
  Object.freeze({ sign: "+", concept: "Dividendos percibidos", amount: 5_000_000 }),
  Object.freeze({ sign: "-", concept: "Retiros actualizados", amount: 30_000_000 }),
  Object.freeze({ sign: "-", concept: "Partidas Art. 21", amount: 11_360_000 }),
  Object.freeze({ sign: "=", concept: "CPT final", amount: 445_000_000, result: true }),
] satisfies readonly CalculationRow[]);

export const GUIDED_CASES: readonly GuidedCase[] = Object.freeze([
  Object.freeze({
    id: "case-1",
    shortLabel: "Caso 1",
    company: "Contadores Usach SpA",
    difficulty: "Intermedia",
    focus: "Inversiones, PPM, anticipo, patrimonio y dividendos",
    summary:
      "Aprende a reemplazar valores F/T, depurar el anticipo de clientes y cuadrar un aumento de capital con dividendos repartidos.",
    methodRows: caseOneMethod,
    reasonabilityRows: caseOneReasonability,
    capitalEffective: 366_875_149,
    finalCpt: 279_669_719,
    difference: 0,
    interpretation: "Ambos papeles de trabajo llegan al mismo CPT. Diferencia de control: $0.",
  }),
  Object.freeze({
    id: "case-2",
    shortLabel: "Caso 2",
    company: "Centro de Eventos Ltda.",
    difficulty: "Avanzada",
    focus: "Activo fijo, depreciación, incobrables, diferidos y pérdida",
    summary:
      "Integra controles auxiliares de mayor complejidad y distingue dividendos percibidos de retiros repartidos.",
    methodRows: caseTwoMethod,
    reasonabilityRows: caseTwoReasonability,
    capitalEffective: 991_916_205,
    finalCpt: 909_356_120,
    difference: 0.8,
    interpretation:
      "La planilla conserva decimales internos. La diferencia aproximada de $0,80 desaparece al presentar montos al peso.",
  }),
  Object.freeze({
    id: "practice",
    shortLabel: "Prueba",
    company: "Auditoría Central SpA",
    difficulty: "Evaluación · 100 puntos",
    focus: "Teoría, auxiliares, CPT y razonabilidad",
    summary:
      "Caso de preparación para resolver en 75 minutos y corregir después con la pauta de la guía.",
    methodRows: practiceMethod,
    reasonabilityRows: practiceReasonability,
    capitalEffective: 563_000_000,
    finalCpt: 445_000_000,
    difference: 0,
    interpretation: "El CPT del método del activo coincide con razonabilidad. Diferencia: $0.",
  }),
]);

export const THEORY_QUESTIONS = Object.freeze([
  Object.freeze({
    question: "¿Por qué el CPT no equivale al patrimonio financiero?",
    answer:
      "Porque depura partidas y reemplaza valores contables por valores tributarios. El patrimonio financiero responde a criterios contables; el CPT, a la LIR.",
  }),
  Object.freeze({
    question: "¿Cuál es la diferencia entre capital efectivo y pasivo exigible?",
    answer:
      "El capital efectivo es el activo que representa inversión efectiva a valor tributario. El pasivo exigible reúne obligaciones reales frente a terceros.",
  }),
  Object.freeze({
    question: "¿Qué ocurre con los impuestos diferidos?",
    answer:
      "En la metodología del curso, el activo y el pasivo por impuesto diferido se llevan a valor tributario cero.",
  }),
  Object.freeze({
    question: "¿Por qué se agrega la pérdida anterior utilizada?",
    answer:
      "Porque ya redujo la RLI. Agregarla en razonabilidad evita que el movimiento patrimonial se disminuya dos veces.",
  }),
  Object.freeze({
    question: "¿Qué demuestra una diferencia igual a cero?",
    answer:
      "Demuestra consistencia entre ambos papeles de trabajo, pero no garantiza que cada criterio tributario sea correcto.",
  }),
]);

export const PRACTICE_EXAM = Object.freeze({
  company: "Auditoría Central SpA",
  durationMinutes: 75,
  totalPoints: 100,
  period: "CPT al 01.01.2026",
  introduction:
    "La empresa está acogida al régimen general del artículo 14 letra A). Determina su CPT por método del activo y efectúa la Prueba de Razonabilidad.",
  balance: Object.freeze([
    Object.freeze({ concept: "Total activo", financial: "$600.000.000", tax: "Base" }),
    Object.freeze({ concept: "Total pasivo", financial: "$500.000.000", tax: "Base" }),
    Object.freeze({ concept: "Fondos mutuos", financial: "$30.000.000", tax: "$32.000.000" }),
    Object.freeze({ concept: "Inversión relacionada", financial: "$40.000.000", tax: "$48.000.000" }),
    Object.freeze({ concept: "Activo fijo bruto", financial: "$100.000.000", tax: "$120.000.000" }),
    Object.freeze({ concept: "Depreciación acumulada", financial: "$35.000.000 en pasivo", tax: "$30.000.000" }),
    Object.freeze({ concept: "Deudores incobrables", financial: "$10.000.000 en pasivo", tax: "$8.000.000" }),
    Object.freeze({ concept: "Activo por impuesto diferido", financial: "$6.000.000", tax: "$0" }),
    Object.freeze({ concept: "Pasivo por impuesto diferido", financial: "$5.000.000", tax: "$0" }),
    Object.freeze({ concept: "Retiros de socios", financial: "$25.000.000 en activo", tax: "Eliminar" }),
    Object.freeze({ concept: "Reajuste PPM no registrado", financial: "$0", tax: "$200.000" }),
    Object.freeze({ concept: "Crédito por activo fijo", financial: "$0", tax: "$1.800.000" }),
    Object.freeze({ concept: "Capital", financial: "$120.000.000 en pasivo", tax: "Patrimonio" }),
    Object.freeze({ concept: "Revalorización CPT", financial: "$12.000.000 en pasivo", tax: "Patrimonio" }),
    Object.freeze({ concept: "Utilidades acumuladas", financial: "$200.000.000 en pasivo", tax: "Patrimonio" }),
  ]),
  reasonabilityData: Object.freeze([
    Object.freeze({ concept: "CPT inicial", amount: "$320.000.000" }),
    Object.freeze({ concept: "Factor IPC CPT inicial", amount: "3,4%" }),
    Object.freeze({ concept: "Aumento de capital histórico", amount: "$40.000.000" }),
    Object.freeze({ concept: "Factor IPC aumento", amount: "1,2%" }),
    Object.freeze({ concept: "RLI del ejercicio", amount: "$90.000.000" }),
    Object.freeze({ concept: "Pérdida anterior utilizada", amount: "$20.000.000" }),
    Object.freeze({ concept: "Dividendos percibidos", amount: "$5.000.000" }),
    Object.freeze({ concept: "Retiros repartidos actualizados", amount: "$30.000.000" }),
    Object.freeze({ concept: "Partidas Art. 21 actualizadas", amount: "$11.360.000" }),
  ]),
  theoryItems: Object.freeze([
    Object.freeze({
      id: "financial-equivalence",
      statement: "El CPT equivale automáticamente al patrimonio financiero del balance.",
      correctAnswer: "false",
      points: 3,
    }),
    Object.freeze({
      id: "deferred-tax",
      statement: "En los casos del curso, los impuestos diferidos se llevan a valor tributario cero.",
      correctAnswer: "true",
      points: 3,
    }),
    Object.freeze({
      id: "previous-loss",
      statement: "La pérdida anterior utilizada se agrega en razonabilidad para evitar duplicar su efecto.",
      correctAnswer: "true",
      points: 3,
    }),
    Object.freeze({
      id: "zero-control",
      statement: "Una diferencia cero garantiza que cada criterio tributario aplicado es correcto.",
      correctAnswer: "false",
      points: 3,
    }),
    Object.freeze({
      id: "received-dividend",
      statement: "Los dividendos percibidos representan una entrada y se agregan en razonabilidad.",
      correctAnswer: "true",
      points: 3,
    }),
  ] satisfies readonly ExamTheoryItem[]),
  numericItems: Object.freeze([
    Object.freeze({
      id: "ccmm",
      label: "CCMM del CPT inicial",
      hint: "$320.000.000 × 3,4%",
      expected: 10_880_000,
      points: 5,
    }),
    Object.freeze({
      id: "capital-update",
      label: "Aumento de capital actualizado",
      hint: "Base más su reajuste de 1,2%",
      expected: 40_480_000,
      points: 5,
    }),
    Object.freeze({
      id: "withdrawals-update",
      label: "Retiros actualizados",
      hint: "$29.700.000 históricos + $300.000 de CCMM",
      expected: 30_000_000,
      points: 5,
    }),
    Object.freeze({
      id: "capital-effective",
      label: "Capital efectivo",
      hint: "Total activo + bloque Más − bloque Menos",
      expected: 563_000_000,
      points: 15,
    }),
    Object.freeze({
      id: "passive-required",
      label: "Pasivo exigible",
      hint: "Ingresa el valor positivo de la obligación exigible",
      expected: 118_000_000,
      points: 15,
    }),
    Object.freeze({
      id: "cpt-method",
      label: "CPT final por método del activo",
      hint: "Capital efectivo − pasivo exigible",
      expected: 445_000_000,
      points: 10,
    }),
    Object.freeze({
      id: "cpt-reasonability",
      label: "CPT final por razonabilidad",
      hint: "CPT inicial actualizado + movimientos del ejercicio",
      expected: 445_000_000,
      points: 25,
    }),
    Object.freeze({
      id: "difference",
      label: "Diferencia de control",
      hint: "Razonabilidad − método del activo",
      expected: 0,
      points: 5,
    }),
  ] satisfies readonly ExamNumericItem[]),
});

export const FINAL_CHECKLIST = Object.freeze([
  "Tomé los totales correctos de activo y pasivo.",
  "Eliminé retiros o dividendos a socios del activo.",
  "Reemplacé valores financieros por tributarios en ambos sentidos.",
  "Separé activo fijo bruto y depreciación acumulada.",
  "Llevé impuestos diferidos a valor tributario cero.",
  "Eliminé capital, RCP y utilidades acumuladas del pasivo.",
  "Usé montos actualizados en aumentos, disminuciones y retiros.",
  "Diferencié dividendos percibidos de dividendos repartidos.",
  "Agregué la pérdida de ejercicios anteriores utilizada.",
  "Comparé el CPT final antes y después del redondeo.",
]);
