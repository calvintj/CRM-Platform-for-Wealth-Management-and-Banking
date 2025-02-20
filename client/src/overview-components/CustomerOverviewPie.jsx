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

const defaultColors = ["#F52720", "#01ACD2", "#2ABC36", "#FBB716", "#F0FF1B"];

export default function RiskProfilePie({
  colors = defaultColors,
  title = "Profil Risiko Nasabah",
  customerData,
  setCustomerRisk,
}) {
  console.log(customerData);
  if (customerData.length === 0 || customerData.every((item) => item.value === 0)) {
    return <div className="text-center text-gray-400">No data available</div>;
  }

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
      <h3
        style={{
          textAlign: "center",
          margin: "0 0 1.2rem",
          fontSize: "1.2rem",
        }}
      >
        {title}
      </h3>

      <ResponsiveContainer width="100%" aspect={1.5}>
        <PieChart>
          <Pie
            data={customerData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            labelLine={false}
            label={renderCustomizedLabel}
            dataKey="value"
            paddingAngle={2}
          >
            {customerData
              .map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  stroke="none"
                  onClick={() => {
                    setCustomerRisk({ name: entry.name, value: entry.value });
                  }}
                />
              ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value} customers`}
            contentStyle={{
              background: "white",
              border: "none",
              borderRadius: "4px",
              color: "black",
            }}
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
  colors: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  setCustomerRisk: PropTypes.func,
  customerData: PropTypes.arrayOf(PropTypes.object),
};
