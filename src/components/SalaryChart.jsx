import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const COLORS = ["#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];


function SalaryChart({ result }) {
  const data = [
    {
      name: "Netto",
      value: result.annualNet,
    },
    {
      name: "Contributi",
      value: result.contributions.totalContributions,
    },
    {
      name: "IRPEF",
      value: result.irpef.net,
    },
    {
      name: "Addizionali",
      value: result.regionalTax + result.municipalTax,
    },
  ];

  return (
    <div className="salary-chart">
      <h3>Composizione della RAL</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ value }) => Math.round(value).toLocaleString("it-IT") + " €"}
          >
            {data.map((entry, index) => (
                <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
                />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) =>
              `${Math.round(value).toLocaleString("it-IT")} €`
            }
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalaryChart;