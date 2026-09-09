import { useState } from "react";
import { calculateNet } from "./calculator/calculateNet.js";
import "./App.css";
import jetHrLogo from "./assets/jet-hr-logo.png";
import SalaryChart from "./components/SalaryChart.jsx";
import { taxRules2026 } from "./config/taxRules2026.js";

function SourceLink({ source }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="source-link"
      title={`Fonte: ${source.label}`}
      aria-label={`Fonte: ${source.label}`}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 10.5V16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="12"
          cy="7.5"
          r="1"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}

function App() {
  const [ral, setRal] = useState("");
  const [months, setMonths] = useState("12");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    setError("");
    setResult(null);

    const salary = Number(ral);

    if (!Number.isFinite(salary) || salary <= 0) {
      setError("Inserisci una RAL valida maggiore di zero.");
      return;
    }

    try {
      const calculation = calculateNet(salary);
      setResult(calculation);
    } catch (err) {
      setError(err.message);
    }
  }

  const monthlyGross =
    result && months
      ? result.grossSalary / Number(months)
      : 0;

  const monthlyNet =
    result && months
      ? result.annualNet / Number(months)
      : 0;

  return (
    <main className="app">
      <section className="calculator-card">

        <header className="header">
          <img
            src={jetHrLogo}
            alt="Jet HR"
            className="logo"
          />

          <p className="eyebrow">PRODUCT BUILDER</p>

          <h1>Calcola il tuo stipendio netto</h1>

          <p className="subtitle">
            Inserisci la tua RAL per ottenere una stima dello
            stipendio netto.
          </p>
        </header>

        <section className="inputs">

          <div className="input-group">
            <label htmlFor="ral">RAL annua</label>

            <div className="input-wrapper">
              <input
                id="ral"
                type="number"
                min="0"
                step="100"
                placeholder="es. 30000"
                value={ral}
                onChange={(e) => setRal(e.target.value)}
              />

              <span>€</span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="months">Mensilità</label>

            <select
              id="months"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
            >
              <option value="12">12 mensilità</option>
              <option value="13">13 mensilità</option>
              <option value="14">14 mensilità</option>
            </select>
          </div>

          <button
            type="button"
            className="calculate-button"
            onClick={handleCalculate}
          >
            Calcola lo stipendio
          </button>

        </section>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {result && (
          <section className="result">

            <div className="main-result">
              <span>Stipendio netto medio</span>

              <strong>
                {monthlyNet.toLocaleString("it-IT", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                €
              </strong>

              <small>
                su {months} mensilità
              </small>
            </div>

            <div className="summary">

              <div>
                <span>RAL</span>

                <strong>
                  {result.grossSalary.toLocaleString("it-IT", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  €
                </strong>
              </div>

              <div>
                <span>Lordo mensile medio</span>

                <strong>
                  {monthlyGross.toLocaleString("it-IT", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  €
                </strong>
              </div>

              <div>
                <span>Netto annuale</span>

                <strong>
                  {result.annualNet.toLocaleString("it-IT", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  €
                </strong>
              </div>

            </div>

            <SalaryChart result={result} />

            <details className="details">

              <summary>Dettaglio del calcolo</summary>

              <div className="details-content">

                {/* CONTRIBUTI */}

                <div>
                  <span>
                    Contributi previdenziali{" "}
                    <SourceLink
                      source={taxRules2026.sources.contributions}
                    />
                  </span>

                  <strong>
                    -{" "}
                    {Math.round(
                      result.contributions.totalContributions
                    ).toLocaleString("it-IT")}{" "}
                    €
                  </strong>
                </div>

                {/* REDDITO IMPONIBILE */}

                <div>
                  <span>
                    Reddito imponibile{" "}
                    <SourceLink
                      source={taxRules2026.sources.contributions}
                    />
                  </span>

                  <strong>
                    {Math.round(
                      result.taxableIncome
                    ).toLocaleString("it-IT")}{" "}
                    €
                  </strong>
                </div>

                {/* IRPEF LORDA */}

                <div>
                  <span>
                    IRPEF lorda{" "}
                    <SourceLink
                      source={taxRules2026.sources.irpef}
                    />
                  </span>

                  <strong>
                    {Math.round(
                      result.irpef.gross
                    ).toLocaleString("it-IT")}{" "}
                    €
                  </strong>
                </div>

                {/* DETRAZIONE LAVORO DIPENDENTE */}

                <div>
                  <span>
                    Detrazioni lavoro dipendente{" "}
                    <SourceLink
                      source={taxRules2026.sources.employeeDeduction}
                    />
                  </span>

                  <strong>
                    -{" "}
                    {Math.round(
                      result.irpef.deductions.employeeDeduction
                    ).toLocaleString("it-IT")}{" "}
                    €
                  </strong>
                </div>

                {/* DETRAZIONE AGGIUNTIVA */}

                <div>
                  <span>
                    Detrazione aggiuntiva{" "}
                    <SourceLink
                      source={taxRules2026.sources.additionalDeduction}
                    />
                  </span>

                  <strong>
                    -{" "}
                    {Math.round(
                      result.irpef.deductions.additionalDeduction
                    ).toLocaleString("it-IT")}{" "}
                    €
                  </strong>
                </div>

                {/* IRPEF NETTA */}

                <div>
                  <span>
                    IRPEF netta{" "}
                    <SourceLink
                      source={taxRules2026.sources.irpef}
                    />
                  </span>

                  <strong>
                    {Math.round(
                      result.irpef.net
                    ).toLocaleString("it-IT")}{" "}
                    €
                  </strong>
                </div>

                {/* ADDIZIONALE REGIONALE */}

                <div>
                  <span>
                    Addizionale regionale{" "}
                    <SourceLink
                      source={taxRules2026.sources.regionalTax}
                    />
                  </span>

                  <strong>
                    {Math.round(
                      result.regionalTax
                    ).toLocaleString("it-IT")}{" "}
                    €
                  </strong>
                </div>

                {/* ADDIZIONALE COMUNALE */}

                <div>
                  <span>
                    Addizionale comunale{" "}
                    <SourceLink
                      source={taxRules2026.sources.municipalTax}
                    />
                  </span>

                  <strong>
                    {Math.round(
                      result.municipalTax
                    ).toLocaleString("it-IT")}{" "}
                    €
                  </strong>
                </div>

              </div>
            </details>

          </section>
        )}

        <footer>
          <p>
            Stima indicativa basata sulle regole fiscali configurate
            nel prototipo.
          </p>
        </footer>

      </section>
    </main>
  );
}

export default App;