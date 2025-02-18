import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom tick component to show quarter on one line and year on the next line
function CustomXAxisTick(props) {
  const { x, y, payload, index, data } = props;
  const { quarter, year } = data[index];

  // Decide if/where to show the year label
  let showYear = false;
  let displayYear = "";
  if (index === 2) {
    showYear = true;
    displayYear = "2023";
  } else if (index === 5) {
    showYear = true;
    displayYear = "2024";
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        fill="#fff"
        textAnchor="middle"
        style={{ fontSize: "0.9rem" }}
      >
        {quarter}
      </text>
      {showYear && (
        <text
          x={0}
          y={0}
          dx={-70}
          dy={30}
          fill="#fff"
          textAnchor="middle"
          style={{ fontSize: "0.9rem" }}
        >
          {displayYear}
        </text>
      )}
    </g>
  );
}

export default class FUMChart extends PureComponent {
  state = {
    data: [
      { quarter: "Q1", year: 2023, fum: 30000 },
      { quarter: "Q2", year: 2023, fum: 29000 },
      { quarter: "Q3", year: 2023, fum: 31000 },
      { quarter: "Q4", year: 2023, fum: 32000 },
      { quarter: "Q1", year: 2024, fum: 33000 },
      { quarter: "Q2", year: 2024, fum: 28000, isForecast: true },
    ],
    activeIndex: 0,
  };

  handleClick = (_, index) => {
    this.setState({ activeIndex: index });
  };

  render() {
    const { data, activeIndex } = this.state;
    const activeItem = data[activeIndex];

    return (
      <div
        style={{
          backgroundColor: "#1D283A",
          borderRadius: "8px",
          padding: "1rem",
          color: "#fff",
          width: "100%",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
          }}
        >
          FUM per Kuartal
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 0, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis
              dataKey="quarter"
              axisLine={false}
              tickLine={false}
              tick={<CustomXAxisTick data={data} />}
            />

            <YAxis
              tick={false}
              axisLine={false}
              label={{
                value: "in Rp000",
                angle: -90,
                position: "insideLeft",
                fill: "#fff",
                dx: 80,
                dy: 50,
              }}
            />

            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
              contentStyle={{
                border: "none",
                borderRadius: "1rem",
              }}
              labelStyle={{ color:"black" }}
              formatter={(val) => val.toLocaleString()}
            />

            <Bar
              dataKey="fum"
              onClick={this.handleClick}
              barSize={50}
              radius={[8, 8, 0, 0]}
            >
              {data.map((entry, index) => {
                const baseColor = entry.isForecast ? "#7f8c8d" : "#2ABC36";
                const fillColor = index === activeIndex ? "#2ecc71" : baseColor;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={fillColor}
                    cursor="pointer"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* <p style={{ marginTop: "1rem", textAlign: "center" }}>
          {`FUM of "${activeItem.quarter} ${
            activeItem.year
          }" : ${activeItem.fum.toLocaleString()}`}
        </p> */}
      </div>
    );
  }
}
