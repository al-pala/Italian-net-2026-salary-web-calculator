import { describe, expect, it } from "vitest";
import { calculateIrpef } from "../src/calculator/irpef";

describe("calculateIrpef", () => {
  it("applica il 23% fino a 28.000 €", () => {
    expect(calculateIrpef(28000)).toBeCloseTo(6440, 2);
  });

  it("applica correttamente lo scaglione 28.000-50.000 €", () => {
    const expected =
      28000 * 0.23 +
      22000 * 0.33;

    expect(calculateIrpef(50000)).toBeCloseTo(
      expected,
      2
    );
  });

  it("applica il 43% oltre 50.000 €", () => {
    const expected =
      28000 * 0.23 +
      22000 * 0.33 +
      10000 * 0.43;

    expect(calculateIrpef(60000)).toBeCloseTo(
      expected,
      2
    );
  });

  it("restituisce zero per reddito nullo", () => {
    expect(calculateIrpef(0)).toBe(0);
  });
});