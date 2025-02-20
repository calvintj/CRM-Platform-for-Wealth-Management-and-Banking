// PieChart.js
import { PieChart as RePieChart, Pie, Cell, Label } from "recharts";
import PropTypes from "prop-types";

export default function GaugeChart({ customerData, customerRisk }) {
  const currentValue =
    customerRisk?.value || customerData.reduce((sum, item) => sum + item.value, 0);
  const targetValue = 500;

  // Two slices: "Completed" vs. "Remaining"
  const data = [
    { name: "Completed", value: currentValue, color: "#F52720" },
    { name: "Remaining", value: targetValue - currentValue, color: "#FFFFFF" },
  ];

  // Dimensions for the chart
  const chartWidth = 300;
  const chartHeight = 150;

  // Center x/y
  const cx = 150; // half of chartWidth
  const cy = 105; // lower this if you see it's cut off

  const innerRadius = 75;
  const outerRadius = 95;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Title above the chart */}
      <div className="text-white font-semibold mt-4" style={{ fontSize: "1.5rem" }}>Jumlah Nasabah</div>

      <RePieChart width={chartWidth} height={chartHeight}>
        <Pie
          dataKey="value"
          data={data}
          startAngle={180}
          endAngle={0}
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          {/* Main value */}
          <Label
            value={currentValue}
            position="center"
            dy={-10}
            style={{
              fill: "#FFFFFF",
              fontSize: "24px",
              fontWeight: "bold",
              textAnchor: "middle",
            }}
          />
          {/* Target label */}
          <Label
            value={`Target: ${targetValue}`}
            position="center"
            dy={20}
            style={{
              fill: "#CCCCCC",
              fontSize: "14px",
              textAnchor: "middle",
            }}
          />
        </Pie>
      </RePieChart>
    </div>
  );
}

GaugeChart.propTypes = {
  customerRisk: PropTypes.shape({
    value: PropTypes.shape({
      all: PropTypes.number,
    }),
  }),
  customerData: PropTypes.arrayOf(PropTypes.object),
};
