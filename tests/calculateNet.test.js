import { describe, expect, it } from "vitest";
import { calculateNet } from "../src/calculator/calculateNet";

describe("calculateNet", () => {
  it("calcola il netto per una RAL di 30.000 €", () => {
    const result = calculateNet(30000);

    expect(result.grossSalary).toBe(30000);

    expect(result.contributions.totalContributions)
      .toBeGreaterThan(0);

    expect(result.taxableIncome)
      .toBeGreaterThan(0);

    expect(result.irpef.gross)
      .toBeGreaterThan(0);

    expect(result.irpef.net)
      .toBeGreaterThanOrEqual(0);

    expect(result.regionalTax)
      .toBeGreaterThan(0);

    expect(result.municipalTax)
      .toBeGreaterThan(0);

    expect(result.annualNet)
      .toBeGreaterThan(0);

    expect(result.annualNet)
      .toBeLessThan(30000);

    expect(result.monthlyNet)
      .toBeCloseTo(result.annualNet / 12, 2);
  });

  it("restituisce un netto positivo per una RAL di 50.000 €", () => {
    const result = calculateNet(50000);

    expect(result.annualNet).toBeGreaterThan(0);
    expect(result.annualNet).toBeLessThan(50000);
  });

  it("applica il contributo aggiuntivo oltre 56.224 €", () => {
    const result = calculateNet(60000);

    expect(result.contributions.additionalContributions)
      .toBeGreaterThan(0);
  });

  it("rifiuta una RAL non valida", () => {
    expect(() => calculateNet(0))
      .toThrow();

    expect(() => calculateNet(-1000))
      .toThrow();
  });
});