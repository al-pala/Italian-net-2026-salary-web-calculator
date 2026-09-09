export const taxRules2026 = {
  year: 2026,

  employee: {
    contract: "permanent",

    location: {
      region: "Lombardia",
      municipality: "Milano",
    },

    socialContributionRate: 0.0919,

    additionalContribution: {
      threshold: 56224,
      rate: 0.01,
    },

    contributionCeiling: 122295,
  },

  irpef: {
    brackets: [
      {
        upTo: 28000,
        rate: 0.23,
      },
      {
        upTo: 50000,
        rate: 0.33,
      },
      {
        upTo: Infinity,
        rate: 0.43,
      },
    ],
  },

  employeeDeduction: {
    brackets: {
      firstThreshold: 15000,
      secondThreshold: 28000,
      thirdThreshold: 50000,

      firstFixedAmount: 1955,

      secondBaseAmount: 1910,
      secondVariableAmount: 1190,

      thirdBaseAmount: 1910,

      additionalAmount: 0,
      additionalMinIncome: 25000,
      additionalMaxIncome: 35000,
    },
  },

  additionalEmployeeBenefit: {
    incomeThreshold: 20000,

    nonTaxableBenefit: {
      upTo: 8500,
      rateUpTo8500: 0.071,

      upTo15000: 15000,
      rate8500To15000: 0.053,

      upTo20000: 20000,
      rate15000To20000: 0.048,
    },

    additionalDeduction: {
      upTo: 32000,
      maxAmount: 1000,

      maxIncome: 40000,
    },
  },

  regionalTax: {
    region: "Lombardia",

    brackets: [
      {
        upTo: 15000,
        rate: 0.0123,
      },
      {
        upTo: 28000,
        rate: 0.0158,
      },
      {
        upTo: 55000,
        rate: 0.0172,
      },
      {
        upTo: 75000,
        rate: 0.0173,
      },
      {
        upTo: Infinity,
        rate: 0.0174,
      },
    ],
  },

  municipalTax: {
    municipality: "Milano",

    rate: 0.008,

    exemptionThreshold: 23000,
  },
};