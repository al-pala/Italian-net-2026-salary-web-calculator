# ClearSalary

A web application for estimating Italian net salary starting from the gross annual salary (RAL).

ClearSalary was developed as part of the Jet HR Product Builder Challenge.

## Live Demo

[Try ClearSalary]([https://majestic-macaron-f4fb0d.netlify.app/](https://clearsalary.netlify.app/))

## Features

- Calculate estimated annual and monthly net salary from RAL
- Support for 12, 13 and 14 monthly payments
- Breakdown of:
  - Social security contributions
  - Taxable income
  - Gross and net IRPEF
  - Employee tax deductions
  - Regional tax
  - Municipal tax
- Visual representation of salary composition
- Links to the official sources used for the tax rules
- Responsive layout for desktop and mobile

## Tech Stack

- React
- Vite
- JavaScript
- Recharts
- CSS
- Git & GitHub
- Netlify

## Tax Rules

The calculator uses tax and contribution rules configured for 2026.

The prototype currently includes:

- Employee social security contributions
- Italian IRPEF brackets
- Employee tax deductions
- Additional employee tax benefits
- Lombardy regional income tax
- Milan municipal income tax

Official sources are linked directly within the application.

## Project Structure

```text
src/
├── assets/
│   └── jet-hr-logo.png
├── calculator/
│   ├── calculateNet.js
│   ├── contributions.js
│   ├── deductions.js
│   ├── irpef.js
│   ├── municipalTax.js
│   └── regionalTax.js
├── components/
│   └── SalaryChart.jsx
├── config/
│   └── taxRules2026.js
├── App.jsx
├── App.css
└── main.jsx
