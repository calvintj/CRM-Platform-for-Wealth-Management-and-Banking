// PieChart.js

import React from 'react';
import { PieChart as RePieChart, Pie, Cell, Label } from 'recharts';

export default function GaugeChart() {
  // Example values
  const currentValue = 121;
  const targetValue = 150;

  // Two slices: "Completed" vs. "Remaining"
  const data = [
    { name: 'Completed', value: currentValue, color: '#2ABC36' },
    { name: 'Remaining', value: targetValue - currentValue, color: '#FFFFFF' },
  ];

  // Dimensions for the chart
  const chartWidth = 300;
  const chartHeight = 180;

  // Center x/y
  const cx = 150; // half of chartWidth
  const cy = 130; // lower this if you see it's cut off

  const innerRadius = 80;
  const outerRadius = 100;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Title above the chart */}
      <div className="text-white font-semibold mt-4">Total AUM</div>

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
              fill: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 'bold',
              textAnchor: 'middle',
            }}
          />
          {/* Target label */}
          <Label
            value={`Target: ${targetValue}`}
            position="center"
            dy={20}
            style={{
              fill: '#CCCCCC',
              fontSize: '14px',
              textAnchor: 'middle',
            }}
          />
        </Pie>
      </RePieChart>
    </div>
  );
}
