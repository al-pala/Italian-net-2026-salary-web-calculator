import { taxRules2026 } from "../config/taxRules2026.js";

export function calculateMunicipalTax(taxableIncome) {
  const {
    rate,
    exemptionThreshold,
  } = taxRules2026.municipalTax;

  if (taxableIncome <= exemptionThreshold) {
    return 0;
  }

  // La soglia di 23.000 € è un'esenzione,
  // non una franchigia.
  return taxableIncome * rate;
}