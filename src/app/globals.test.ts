import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const tokens = {
  "navy-primary": "#17324D",
  petroleum: "#1C5D6B",
  graphite: "#2D3740",
  "blue-gray": "#EAF1F4",
  "light-gray": "#F3F5F6",
  "success-bg": "#EAF4EF",
  "success-text": "#2F6B55",
  "warning-bg": "#FFF5DD",
  "warning-text": "#946200",
  "danger-bg": "#F7ECEC",
  "danger-text": "#8A3D3D",
} as const;

describe("editorial color tokens", () => {
  it.each(Object.entries(tokens))("defines %s as %s", (name, value) => {
    const css = readFileSync(
      resolve(process.cwd(), "src/app/globals.css"),
      "utf8",
    );

    expect(css).toContain(`--color-${name}: ${value};`);
  });
});
