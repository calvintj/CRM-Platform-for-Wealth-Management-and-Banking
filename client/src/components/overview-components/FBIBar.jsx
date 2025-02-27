import { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import XAxisInformation from "./XAxisInformation";
import PropTypes from "prop-types";

export default class FBIBar extends PureComponent {
  render() {
    const { quarterlyFBI } = this.props;
    const customerRisk = this.props.customerRisk;

    const filterKey = customerRisk === "All" ? "All" : customerRisk;
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
              dataKey="name"
              axisLine={true}
              tickLine={true}
              tick={<XAxisInformation data={data} />}
              stroke="#FFFFFF"
              interval={0}
            />
            <YAxis
              tickFormatter={(tick) => (tick / 1000).toLocaleString()}
              tick={true}
              axisLine={true}
              stroke="#FFFFFF"
            >
              <Label
                value="(in thousands)"
                angle={-90}
                position="insideLeft"
                style={{ fill: "#FFFFFF", textAnchor: "middle" }}
              />
            </YAxis>{" "}
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
            <Bar dataKey="value" barSize={50} radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={"#01ACD2"} />;
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
