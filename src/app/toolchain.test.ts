import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const packageJson = JSON.parse(
  readFileSync(join(process.cwd(), "package.json"), "utf8"),
) as { engines?: { node?: string } };

describe("toolchain contract", () => {
  it("advertises the Node range supported by jsdom", () => {
    expect(packageJson.engines?.node).toBe("^20.19.0 || ^22.13.0 || >=24.0.0");
  });
});
