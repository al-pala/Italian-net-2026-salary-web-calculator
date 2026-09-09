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
        { upTo: 15000, rate: 0.0123 },
        { upTo: 28000, rate: 0.0158 },
        { upTo: 50000, rate: 0.0172 },
        { upTo: Infinity, rate: 0.0173 },
    ],
  },

  municipalTax: {
    municipality: "Milano",

    rate: 0.008,

    exemptionThreshold: 23000,
  },

sources: {
  contributions: {
    label: "INPS – aliquote contributive 2026",
    url: "https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.06.circolare-numero-67-del-18-06-2026_15295.html",
  },

  irpef: {
    label: "Agenzia delle Entrate – IRPEF",
    url: "https://infoprecompilata.agenziaentrate.gov.it/portale/quadro-rc",
  },

  employeeDeduction: {
    label: "Agenzia delle Entrate – detrazioni lavoro dipendente",
    url: "https://infoprecompilata.agenziaentrate.gov.it/portale/semplificata-mod-lavoro-dipendente-e-pensioni",
  },

  additionalDeduction: {
    label: "Agenzia delle Entrate – ulteriore detrazione",
    url: "https://infoprecompilata.agenziaentrate.gov.it/portale/semplificata-mod-lavoro-dipendente-e-pensioni",
  },

  regionalTax: {
    label: "Regione Lombardia – addizionale regionale IRPEF",
    url: "https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/red-addizionale-regionale-irpef",
  },

  municipalTax: {
    label: "Comune di Milano – addizionale comunale IRPEF",
    url: "https://www.comune.milano.it/argomenti/tributi/addizionale-comunale-irpef",
  },
},

};