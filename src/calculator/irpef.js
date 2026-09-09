import { taxRules2026 } from "../config/taxRules2026.js";

export function calculateIrpef(taxableIncome) {
  const brackets = taxRules2026.irpef.brackets;

  let tax = 0;
  let previousLimit = 0;

  for (const bracket of brackets) {
    const taxableAmount = Math.min(
      Math.max(taxableIncome - previousLimit, 0),
      bracket.upTo - previousLimit
    );

    tax += taxableAmount * bracket.rate;

    if (taxableIncome <= bracket.upTo) {
      break;
    }

    previousLimit = bracket.upTo;
  }

  return tax;
}