import { taxRules2026 } from "../config/taxRules2026.js";
console.log(
  "CONFIG ADDITIONAL AMOUNT =",
  taxRules2026.employeeDeduction.brackets.additionalAmount
);

/**
 * Calcola la detrazione ordinaria per lavoro dipendente.
 *
 * @param {number} income - Reddito complessivo
 * @returns {number} detrazione
 */
export function calculateEmployeeDeduction(income) {
  const rules = taxRules2026.employeeDeduction.brackets;

  const {
    firstThreshold,
    secondThreshold,
    thirdThreshold,
    firstFixedAmount,
    secondBaseAmount,
    secondVariableAmount,
    thirdBaseAmount,
  } = rules;

  const {
    additionalAmount,
    additionalMinIncome,
    additionalMaxIncome,
  } = taxRules2026.employeeDeduction.brackets;

  
  if (income <= 0) {
    return 0;
  }

  // Redditi fino a 15.000 €

let plus = 0;

console.log("PRIMA:");
console.log("income =", income);
console.log("additionalMinIncome =", additionalMinIncome);
console.log("additionalMaxIncome =", additionalMaxIncome);
console.log("additionalAmount =", additionalAmount);

if (
  income > additionalMinIncome &&
  income <= additionalMaxIncome
) {
  console.log("IF VERO");
  plus = additionalAmount;
  console.log("plus =", plus);
}

  if (income <= firstThreshold) {
    return firstFixedAmount;
  }

  // Redditi tra 15.000 € e 28.000 €
  if (income <= secondThreshold) {
    const deduction = 
      secondBaseAmount +
      secondVariableAmount *
        ((secondThreshold - income) /
          (secondThreshold - firstThreshold))+plus;

    return deduction;
  }

  // Redditi tra 28.000 € e 50.000 €
  if (income <= thirdThreshold) {
    const deduction =
      thirdBaseAmount *
      ((thirdThreshold - income) /
        (thirdThreshold - secondThreshold))+plus;

    // Maggiorazione di 65 € per redditi > 25.000 €
    // e <= 35.000 €
    /*if (
      income > additionalMinIncome &&
      income <= additionalMaxIncome
    ) {
      return deduction + additionalAmount;
    }*/

    
    return deduction;
  }

  // Oltre 50.000 €
  return 0;
}

/**
 * Ulteriore detrazione prevista per il 2026
 * per i redditi da lavoro dipendente nella fascia prevista.
 *
 * @param {number} income - Reddito complessivo
 * @returns {number} ulteriore detrazione
 */
export function calculateAdditionalDeduction(income) {
  const rules =
    taxRules2026.additionalEmployeeBenefit.additionalDeduction;

  if (
    income <= rules.upTo &&
    income >= 20000
  ) {
    return rules.maxAmount;
  }

  if (
    income > rules.upTo &&
    income < rules.maxIncome
  ) {
    return (
      rules.maxAmount *
      ((rules.maxIncome - income) /
        (rules.maxIncome - rules.upTo))
    );
  }

  return 0;
}

/**
 * Calcola il totale delle detrazioni.
 *
 * @param {number} income - Reddito complessivo
 * @returns {object}
 */
export function calculateTotalDeductions(income) {
  const employeeDeduction =
    calculateEmployeeDeduction(income);

  const additionalDeduction =
    calculateAdditionalDeduction(income);

  console.log("employeeDeduction:", employeeDeduction);
  console.log("additionalDeduction:", additionalDeduction);
  console.log(
    "totalDeductions:",
    employeeDeduction + additionalDeduction);
 
  return {
    employeeDeduction,
    additionalDeduction,
    totalDeductions:
      employeeDeduction + additionalDeduction,
  };
}