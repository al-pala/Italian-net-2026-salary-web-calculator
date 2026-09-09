import { taxRules2026 } from "../config/taxRules2026.js";

export function calculateContributions(grossSalary) {
  const {
    socialContributionRate,
    additionalContribution,
    contributionCeiling,
  } = taxRules2026.employee;

  // I contributi ordinari sono calcolati entro il massimale previsto.
  const contributoryIncome = Math.min(
    grossSalary,
    contributionCeiling
  );

  const ordinaryContributions =
    contributoryIncome * socialContributionRate;

  // Contributo aggiuntivo dell'1% sulla parte eccedente
  // la soglia di 56.224 €.
  const additionalContributoryIncome = Math.max(
    0,
    contributoryIncome - additionalContribution.threshold
  );

  const additionalContributions =
    additionalContributoryIncome *
    additionalContribution.rate;

  const totalContributions =
    ordinaryContributions + additionalContributions;

  return {
    contributoryIncome,
    ordinaryContributions,
    additionalContributions,
    totalContributions,
  };
}