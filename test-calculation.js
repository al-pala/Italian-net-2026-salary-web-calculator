import readline from "node:readline";

import { calculateContributions } from "./src/calculator/contributions.js";
import { calculateIrpef } from "./src/calculator/irpef.js";
import {
  calculateTotalDeductions,
} from "./src/calculator/deductions.js";
import { calculateRegionalTax } from "./src/calculator/regionalTax.js";
import { calculateMunicipalTax } from "./src/calculator/municipalTax.js";
import { calculateNet } from "./src/calculator/calculateNet.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Inserisci la RAL: ", (input) => {
  const ral = Number(input);

  try {
    // 1. Contributi
    const contributions = calculateContributions(ral);

    // 2. Reddito imponibile
    const taxableIncome =
      ral - contributions.totalContributions;

    // 3. IRPEF
    const grossIrpef = calculateIrpef(taxableIncome);

    // 4. Detrazioni
    const deductions =
      calculateTotalDeductions(30000);

    // 5. Addizionale regionale
    const regionalTax =
      calculateRegionalTax(taxableIncome);

    // 6. Addizionale comunale
    const municipalTax =
      calculateMunicipalTax(taxableIncome);

    // 7. Calcolo completo
    const result = calculateNet(ral);

    console.log("\n================================");
    console.log("       DETTAGLIO CALCOLO");
    console.log("================================");

    console.log("\n[INPUT]");
    console.log(`RAL: ${ral.toFixed(2)} €`);

    console.log("\n[CONTRIBUTIONS]");
    console.log(
      `Reddito contributivo: ${contributions.contributoryIncome.toFixed(2)} €`
    );
    console.log(
      `Contributi ordinari: ${contributions.ordinaryContributions.toFixed(2)} €`
    );
    console.log(
      `Contributi aggiuntivi: ${contributions.additionalContributions.toFixed(2)} €`
    );
    console.log(
      `Totale contributi: ${contributions.totalContributions.toFixed(2)} €`
    );

    console.log("\n[TAXABLE INCOME]");
    console.log(
      `Reddito imponibile: ${taxableIncome.toFixed(2)} €`
    );

    console.log("\n[IRPEF]");
    console.log(
      `IRPEF lorda: ${grossIrpef.toFixed(2)} €`
    );
    console.log(
      `Detrazione lavoro dipendente: ${deductions.employeeDeduction.toFixed(2)} €`
    );
    console.log(
      `Detrazione aggiuntiva: ${deductions.additionalDeduction.toFixed(2)} €`
    );
    console.log(
      `Totale detrazioni: ${deductions.totalDeductions.toFixed(2)} €`
    );
    console.log(
      `IRPEF netta: ${result.irpef.net.toFixed(2)} €`
    );

    console.log("\n[REGIONAL TAX]");
    console.log(
      `Addizionale Lombardia: ${regionalTax.toFixed(2)} €`
    );

    console.log("\n[MUNICIPAL TAX]");
    console.log(
      `Addizionale Milano: ${municipalTax.toFixed(2)} €`
    );

    console.log("\n[BENEFIT]");
    console.log(
      `Beneficio non imponibile: ${result.nonTaxableBenefit.toFixed(2)} €`
    );

    console.log("\n================================");
    console.log("          RISULTATO");
    console.log("================================");

    console.log(
      `Netto annuale:  ${result.annualNet.toFixed(2)} €`
    );

    console.log(
      `Netto mensile:  ${result.monthlyNet.toFixed(2)} €`
    );

    console.log("================================\n");

  } catch (error) {
    console.error(`\nErrore: ${error.message}`);
  }

  rl.close();
});