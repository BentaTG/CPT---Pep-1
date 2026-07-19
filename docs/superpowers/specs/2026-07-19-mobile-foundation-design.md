# Diseño de la base arquitectónica y visual mobile-first

**Fecha:** 2026-07-19  
**Estado:** Diseño conversacional aprobado; pendiente de revisión escrita  
**Alcance:** Inicialización del proyecto, app shell, navegación inferior y placeholders de las cinco etapas.

## Objetivo

Crear la base técnica y visual de la aplicación de estudio para PEP 1: Capital Propio Tributario (CPT) y Prueba de Razonabilidad. La entrega debe funcionar primero entre 360 px y 430 px, conservar la identidad editorial de la guía y dejar una arquitectura desacoplada para incorporar posteriormente el contenido tributario.

## Stack y configuración

- Next.js estable actual con App Router y TypeScript estricto.
- Tailwind CSS estable actual con enfoque CSS-first cuando la versión instalada lo soporte.
- Framer Motion para transiciones, indicador compartido y microinteracciones.
- Lucide React para los cinco iconos de navegación.
- `clsx` para composición condicional de clases.
- Tokens cromáticos definidos una sola vez en el tema global de Tailwind. Solo se usará `tailwind.config.ts` si la versión estable instalada lo requiere.

## Tokens editoriales

| Token | Valor | Uso principal |
| --- | --- | --- |
| `navy-primary` | `#17324D` | Títulos y superficies de alto contraste |
| `petroleum` | `#1C5D6B` | Interacción primaria, subtítulos y foco |
| `graphite` | `#2D3740` | Texto de lectura y cifras |
| `blue-gray` | `#EAF1F4` | Conceptos clave y tarjetas base |
| `light-gray` | `#F3F5F6` | Fondo general y separadores |
| `success-bg` | `#EAF4EF` | Fondo de cuadratura correcta |
| `success-text` | `#2F6B55` | Texto de cuadratura correcta |
| `warning-bg` | `#FFF5DD` | Fondo de advertencia o límite |
| `warning-text` | `#946200` | Texto de advertencia o límite |
| `danger-bg` | `#F7ECEC` | Fondo de error frecuente |
| `danger-text` | `#8A3D3D` | Texto de diferencia decisiva |

El significado nunca dependerá exclusivamente del color: los estados futuros combinarán color, etiqueta, icono o estructura semántica.

## Arquitectura de archivos

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── layout/
│       ├── BottomNav.tsx
│       └── MobileShell.tsx
└── data/
    └── navigation.ts
```

`navigation.ts` definirá los identificadores, etiquetas, títulos, descripciones e iconos de las cinco etapas. Los componentes consumirán esos datos sin incorporar contenido tributario mutable ni duplicado.

## Componentes

### `MobileShell`

Será un componente de layout sin estado. Envolverá el contenido con la composición exigida: `max-w-md mx-auto min-h-screen bg-[#F3F5F6] shadow-2xl relative pb-20 overflow-x-hidden flex flex-col`. El fondo exterior separará visualmente el dispositivo simulado en escritorio.

La tipografía usará la pila del sistema y `font-optical-sizing`. Los encabezados tendrán tracking negativo ligero y leading compacto; el cuerpo conservará tracking neutro y leading legible.

### `BottomNav`

Será un componente cliente controlado mediante:

```ts
type BottomNavProps = {
  activeStage: StageId;
  onStageChange: (stage: StageId) => void;
};
```

Mostrará cinco destinos persistentes:

1. Radar — `Compass`.
2. Conceptos — `Layers`.
3. Algoritmo — `GitMerge`.
4. Laboratorio — `Calculator`.
5. Examen — `Timer`.

Cada botón tendrá `type="button"`, nombre accesible, `aria-current="page"` solo cuando corresponda y una zona táctil de al menos 44 px. La distribución usará cinco columnas iguales y `min-w-0` para impedir desbordamiento a 360 px.

La barra quedará fija al borde inferior, centrada y limitada al mismo `max-w-md` del shell. Usará una superficie translúcida con desenfoque y una alternativa más sólida cuando el usuario prefiera transparencia reducida.

### Vista de etapa

`page.tsx` será un componente cliente que mantendrá un único `StageId` activo. Seleccionar una pestaña actualizará ese estado y reemplazará la vista placeholder correspondiente. Cada placeholder identificará claramente la etapa y anticipará su finalidad sin incorporar todavía ejercicios ni cifras tributarias.

## Movimiento

El indicador activo será una pastilla compartida con `layoutId`. Framer Motion la reorientará desde su posición visual actual, por lo que un segundo toque podrá interrumpir y redirigir la transición.

La indicación conceptual de Apple `damping ratio: 1.0` y `response: 0.3 s` se traducirá a la API soportada por Framer Motion como un resorte sin rebote con respuesta de 0,3 segundos: `type: "spring"`, `bounce: 0`, `duration: 0.3`. No se usará `damping: 1`, porque en Framer Motion ese número no representa una razón de amortiguamiento y produciría un rebote excesivo.

El contenido de etapa usará `AnimatePresence` y transiciones breves sobre `opacity` y `transform`. Con `prefers-reduced-motion`, el desplazamiento se eliminará y se conservará una señal discreta de opacidad o cambio instantáneo.

## Flujo de datos

1. `page.tsx` inicializa la etapa `radar`.
2. `BottomNav` recibe la etapa activa y emite un `StageId` al tocar un destino.
3. `page.tsx` actualiza el estado.
4. La pastilla compartida se desplaza al destino activo.
5. `AnimatePresence` sustituye el placeholder usando el mismo identificador.

No habrá persistencia, rutas independientes ni almacenamiento local en esta entrega. Esas capacidades quedan fuera del alcance inicial.

## Accesibilidad y comportamiento responsive

- Zona táctil mínima verificable de 44 px en cada pestaña.
- Navegación operable por teclado y foco visible en azul petróleo.
- `nav` con etiqueta accesible y estado activo expuesto semánticamente.
- Respeto por movimiento y transparencia reducidos.
- Ausencia de scroll horizontal accidental entre 360 px y 430 px.
- Texto y nombres de etapa legibles sin depender solo de los iconos.

## Estrategia de pruebas

- Prueba inicial que confirme cinco pestañas y sus nombres accesibles.
- Prueba del estado inicial `Radar`.
- Prueba de selección que confirme el cambio a cada placeholder y `aria-current`.
- Prueba estructural de la clase o regla que garantiza al menos 44 px por destino.
- Verificación con lint, TypeScript y build de producción.
- Inspección visual en 360 px, 390 px, 430 px y escritorio centrado si el entorno de navegador está disponible.

## Criterios de aceptación

1. El proyecto inicia con App Router, TypeScript estricto y Tailwind CSS estable actual.
2. Las dependencias obligatorias quedan declaradas e instaladas.
3. Los once tokens editoriales tienen exactamente los valores definidos por `AGENTS.md`.
4. `MobileShell` reproduce la composición mobile-first exigida.
5. La barra contiene Radar, Conceptos, Algoritmo, Laboratorio y Examen.
6. Cada destino ofrece una zona táctil mínima de 44 px.
7. La pastilla activa se anima con un resorte interrumpible y críticamente amortiguado.
8. El contenido placeholder cambia según el estado controlado en `page.tsx`.
9. No existe desbordamiento horizontal accidental.
10. Las verificaciones automatizadas finalizan correctamente.

## Fuentes normativas del proyecto

Este diseño adopta, en orden de precedencia, `AGENTS.md`, `docs/01-product-specs.md`, `docs/03-ui-ux-architecture.md`, `skills/apple_design.md` y `references/Guia_PEP1_CPT_Razonabilidad_Revision.md`. Las cifras y siglas tributarias de la guía no se modifican; en esta primera entrega solo se prepara la estructura que las alojará.
