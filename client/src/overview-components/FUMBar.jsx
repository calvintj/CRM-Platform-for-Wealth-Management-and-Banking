import { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import XAxisInformation from "../components/XAxisInformation";

export default class FUMChart extends PureComponent {
  state = {
    activeIndex: null,
  };

  handleClick = (_, index) => {
    this.setState({ activeIndex: index });
  };

  render() {
    const { quarterlyFUM } = this.props;
    const { activeIndex } = this.state;
    const customerRisk = this.props.customerRisk;

    const filterKey = customerRisk === "all" ? "All" : customerRisk.name;

    const data =
      quarterlyFUM && quarterlyFUM.length
        ? quarterlyFUM.filter((entry) => entry.name.startsWith(filterKey))
        : [];

    return (
      <div
        style={{
          padding: "1rem",
        }}
      >
        <h3 className="text-white text-2xl font-bold mb-4 text-center">
          FUM per Kuartal
        </h3>

        <ResponsiveContainer height={300}>
          <BarChart
            data={data}
            margin={{ top: 30, right: 50, left: 50, bottom: 20 }}
          >
            <XAxis
              dataKey="name"
              axisLine={true}
              tickLine={true}
              tick={<XAxisInformation data={data} />}
              stroke="#FFFFFF"
              interval={0}
            />

            <YAxis
              tick={true}
              axisLine={true}
              stroke="#FFFFFF"
              // domain={[(dataMin) => Math.floor(dataMin * 2) * -1, "auto"]}
            />

            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
              contentStyle={{
                border: "none",
                borderRadius: "1rem",
              }}
              labelStyle={{ color: "black" }}
              formatter={(val) => [val.toLocaleString(), "FUM"]}
              labelFormatter={() => ""}
            />

            <Bar
              dataKey="value"
              onClick={this.handleClick}
              barSize={50}
              radius={[8, 8, 0, 0]}
            >
              {data.map((entry, index) => {
                const baseColor = entry.isForecast ? "#7f8c8d" : "#01ACD2";
                const fillColor = index === activeIndex ? "#33C7E6" : baseColor;
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
      </div>
    );
  }
}

FUMChart.propTypes = {
  quarterlyFUM: PropTypes.array.isRequired,
  customerRisk: PropTypes.string.isRequired,
  setCustomerRisk: PropTypes.func.isRequired,
};
