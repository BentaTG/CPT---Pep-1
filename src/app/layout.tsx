import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mesa de estudio CPT · PEP 1",
  description:
    "Material interactivo para estudiar Capital Propio Tributario y Prueba de Razonabilidad.",
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
