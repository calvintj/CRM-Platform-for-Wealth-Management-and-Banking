import PropTypes from "prop-types";
import React from "react";

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
  customerData,
  setCustomerRisk,
  customerRisk,
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(() => {
    // Initialize selectedIndex based on customerRisk if available
    const riskIndex = customerData
      .filter((entry) => entry.name !== "All")
      .findIndex((entry) => entry.name === customerRisk?.name);
    return riskIndex >= 0 ? riskIndex : null;
  });

  React.useEffect(() => {
    // Update selectedIndex when customerRisk changes externally
    const riskIndex = customerData
      .filter((entry) => entry.name !== "All")
      .findIndex((entry) => entry.name === customerRisk?.name);
    setSelectedIndex(riskIndex >= 0 ? riskIndex : null);
  }, [customerRisk, customerData]);

  if (
    customerData.length === 0 ||
    customerData.every((item) => item.value === 0)
  ) {
    return <div className="text-center text-gray-400">No data available</div>;
  }

  return (
    <div
      style={{
        padding: "1rem",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Profil Risiko Nasabah
      </h3>

      <ResponsiveContainer aspect={1.4}>
        <PieChart
          onClick={() => {
            setSelectedIndex(null);
            setCustomerRisk({ name: "All" });
          }}
        >
          <Pie
            data={customerData.filter((entry) => entry.name !== "All")}
            innerRadius={60}
            outerRadius={100}
            labelLine={false}
            label={renderCustomizedLabel}
            dataKey="value"
            paddingAngle={2}
          >
            {customerData
              .filter((entry) => entry.name !== "All")
              .map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    selectedIndex === null || selectedIndex === index
                      ? colors[index % colors.length]
                      : "#808080"
                  }
                  stroke="none"
                  opacity={
                    selectedIndex === null || selectedIndex === index ? 1 : 0.3
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setCustomerRisk({ name: entry.name, value: entry.value });
                    setSelectedIndex(index === selectedIndex ? null : index);
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
  customerRisk: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
    }),
  ]),
};
