import { describe, expect, it } from "vitest";
import { GUIDED_CASES } from "@/data/study";
import { formatClp } from "@/lib/format";

function sumRows(rows: (typeof GUIDED_CASES)[number]["methodRows"]): number {
  return rows
    .filter(({ result }) => !result)
    .reduce(
      (total, row) => total + (row.sign === "-" ? -row.amount : row.amount),
      0,
    );
}

describe("study data", () => {
  it("preserves the three key CPT results from the guide", () => {
    expect(GUIDED_CASES.map(({ finalCpt }) => finalCpt)).toEqual([
      279_669_719,
      909_356_120,
      445_000_000,
    ]);
  });

  it("preserves exact control differences", () => {
    expect(GUIDED_CASES.map(({ difference }) => difference)).toEqual([
      0,
      0.8,
      0,
    ]);
  });

  it("keeps published rows within the guide's one-peso rounding tolerance", () => {
    for (const studyCase of GUIDED_CASES) {
      expect(Math.abs(sumRows(studyCase.methodRows) - studyCase.finalCpt)).toBeLessThanOrEqual(1);
      expect(
        Math.abs(sumRows(studyCase.reasonabilityRows) - studyCase.finalCpt),
      ).toBeLessThanOrEqual(1);
    }
  });

  it("formats Chilean pesos explicitly", () => {
    expect(formatClp(279_669_719)).toBe("$279.669.719");
    expect(formatClp(0.8, 2)).toBe("$0,80");
  });
});
