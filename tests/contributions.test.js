import { describe, expect, it } from "vitest";
import { calculateContributions } from "../src/calculator/contributions.js";

describe("calculateContributions", () => {
  it("calcola i contributi ordinari", () => {
    const result = calculateContributions(30000);

    expect(result.ordinaryContributions).toBeCloseTo(
      30000 * 0.0919,
      2
    );
  });

  it("applica l'1% oltre 56.224 €", () => {
    const result = calculateContributions(60000);

    expect(result.additionalContributions).toBeCloseTo(
      (60000 - 56224) * 0.01,
      2
    );
  });

  it("non applica l'1% sotto la soglia", () => {
    const result = calculateContributions(50000);

    expect(result.additionalContributions).toBe(0);
  });

  it("rispetta il massimale contributivo", () => {
    const result = calculateContributions(150000);

    expect(result.contributoryIncome).toBe(122295);
  });
});