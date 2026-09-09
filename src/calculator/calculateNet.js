import { calculateContributions } from "./contributions.js";
import { calculateIrpef } from "./irpef.js";
import {
  calculateTotalDeductions,
} from "./deductions.js";
import { calculateRegionalTax } from "./regionalTax.js";
import { calculateMunicipalTax } from "./municipalTax.js";
import { taxRules2026 } from "../config/taxRules2026.js";

export function calculateNet(grossSalary) {
  if (!Number.isFinite(grossSalary) || grossSalary <= 0) {
    throw new Error("La RAL deve essere maggiore di zero.");
  }

  // 1. Contributi previdenziali a carico del lavoratore
  const contributions =
    calculateContributions(grossSalary);

  // 2. Reddito imponibile IRPEF
  //
  // Semplificazione del prototipo:
  // RAL - contributi previdenziali del lavoratore
  const taxableIncome =
    grossSalary - contributions.totalContributions;

  // 3. IRPEF lorda
  const grossIrpef =
    calculateIrpef(taxableIncome);

  // 4. Detrazioni da lavoro dipendente
  const deductions =
    calculateTotalDeductions(grossSalary);

  // 5. IRPEF netta
  const netIrpef = Math.max(
    0,
    grossIrpef - deductions.totalDeductions
  );

  // 6. Addizionale regionale
  const regionalTax =
    calculateRegionalTax(taxableIncome);

  // 7. Addizionale comunale
  const municipalTax =
    calculateMunicipalTax(taxableIncome);

  // 8. Somma aggiuntiva non imponibile 2026
  let nonTaxableBenefit = 0;

  const benefit =
    taxRules2026.additionalEmployeeBenefit
      .nonTaxableBenefit;

  if (grossSalary <= benefit.upTo8500) {
    nonTaxableBenefit =
      grossSalary * benefit.rateUpTo8500;
  } else if (grossSalary <= benefit.upTo15000) {
    nonTaxableBenefit =
      grossSalary * benefit.rate8500To15000;
  } else if (grossSalary <= benefit.upTo20000) {
    nonTaxableBenefit =
      grossSalary * benefit.rate15000To20000;
  }

  // 9. Netto annuale
  const annualNet =
    grossSalary
    - contributions.totalContributions
    - netIrpef
    - regionalTax
    - municipalTax
    + nonTaxableBenefit;

  // 10. Media mensile
  const monthlyNet = annualNet / 12;

  return {
    grossSalary,

    contributions,

    taxableIncome,

    irpef: {
      gross: grossIrpef,
      deductions,
      net: netIrpef,
    },

    regionalTax,
    municipalTax,

    nonTaxableBenefit,

    annualNet,
    monthlyNet,
  };
}