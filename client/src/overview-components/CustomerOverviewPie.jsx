import React from "react";
import PropTypes from "prop-types";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: "0.9rem", fontWeight: "bold" }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const defaultData = [
  { name: "Conservative", value: 45 },
  { name: "Balanced", value: 25 },
  { name: "Moderate", value: 15 },
  { name: "Aggressive", value: 15 },
];

const defaultColors = ["#F52720", "#01ACD2", "#2ABC36", "#F0FF1B"];

export default function RiskProfilePie({
  data = defaultData,
  colors = defaultColors,
  title = "Profil Risiko Nasabah",
}) {
  return (
    <div
      style={{
        borderRadius: "8px",
        padding: "1rem",
        width: "100%",
        color: "#fff",
      }}
      role="region"
      aria-label="Risk Profile Distribution Chart"
    >
      <h3 style={{ textAlign: "center", margin: "0 0 1.2rem", fontSize: "1.2rem" }}>
        {title}
      </h3>

      <ResponsiveContainer width="100%" aspect={1.5}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            labelLine={false}
            label={renderCustomizedLabel}
            dataKey="value"
            onMouseEnter={(data, index) => {
              // Optional: Add hover effects here
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{ border: "none", borderRadius: "1rem" }}
          />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            iconType="circle"
            wrapperStyle={{ color: "#fff", fontSize: "0.9rem" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

RiskProfilePie.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  colors: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};
