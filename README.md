# CPT — PEP 1

Aplicación web de estudio interactivo para Capital Propio Tributario (CPT) y Prueba de Razonabilidad.

## Desarrollo local

```bash
pnpm install
pnpm dev
```

La aplicación queda disponible en `http://localhost:3000`.

## Validación

```bash
pnpm typecheck
pnpm lint
pnpm test:run
pnpm build
```

## Deploy en Vercel

El proyecto usa Next.js con App Router y no requiere configuración especial. Al importar el repositorio en Vercel, utiliza la raíz del repositorio y deja seleccionado el preset **Next.js**. Vercel detectará `pnpm-lock.yaml` y los comandos definidos en `package.json`.
