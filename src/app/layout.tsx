import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PEP 1 · CPT y Prueba de Razonabilidad",
  description:
    "Entrenamiento interactivo para Capital Propio Tributario y Prueba de Razonabilidad.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
