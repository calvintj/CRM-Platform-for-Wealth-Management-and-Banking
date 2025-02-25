import { PureComponent } from "react";
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
import PropTypes from "prop-types";

export default class FBIBar extends PureComponent {
  state = {
    activeIndex: null,
  };

  handleClick = (_, index) => {
    this.setState({ activeIndex: index });
  };

  render() {
    const { quarterlyFBI } = this.props;
    const { activeIndex } = this.state;
    const customerRisk = this.props.customerRisk;

    // Use the passed data or fallback to an empty array if not provided
    const filterKey = customerRisk === "all" ? "All" : customerRisk.name;

    // Filter the data based on the filterKey.
    const data =
      quarterlyFBI && quarterlyFBI.length
        ? quarterlyFBI.filter((entry) => entry.name.startsWith(filterKey))
        : [];

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
        <h3 className="text-white text-2xl font-bold mb-4 text-center">
          FBI per Kuartal
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 30, right: 50, left: 50, bottom: 20 }}
          >
            <XAxis
              dataKey="name" // Changed from "quarter" to "name" if using hook data format
              axisLine={true}
              tickLine={true}
              tick={<XAxisInformation data={data} />}
              stroke="#FFFFFF"
              interval={0}
            />
            <YAxis tick={true} axisLine={true} stroke="#FFFFFF" />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
              contentStyle={{
                border: "none",
                borderRadius: "1rem",
              }}
              labelStyle={{ color: "black" }}
              formatter={(val) => [val.toLocaleString(), "FBI"]}
              labelFormatter={() => ""}
            />
            <Bar
              dataKey="value" // Changed from "fbi" to "value"
              onClick={this.handleClick}
              barSize={50}
              radius={[8, 8, 0, 0]}
            >
              {data.map((entry, index) => {
                // Adjust color logic if your data includes an "isForecast" flag or similar property
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

FBIBar.propTypes = {
  quarterlyFBI: PropTypes.array.isRequired,
  customerRisk: PropTypes.string.isRequired,
  setCustomerRisk: PropTypes.func.isRequired,
};
