import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TopProducts({ topProducts, customerRisk }) {
  // Determine the risk category name to filter data
  const riskCategory = typeof customerRisk === 'string' 
    ? customerRisk 
    : customerRisk.name;

  const data = topProducts
    .filter((item) => {
      // For "all", we filter items with the "All" category.
      if (riskCategory === "all") {
        return item.category === "All";
      }
      return item.category === riskCategory;
    })
    .map((item) => ({
      name: item.product,
      value: item.amount,
    }));

  // Debug logs for troubleshooting
  console.log("customerRisk:", customerRisk);
  console.log("topProducts:", topProducts);
  console.log("processed data:", data);

  return (
    <div className="w-[450px] h-[300px] p-5">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">
        Produk Teratas
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" barCategoryGap="20%">
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#fff" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.1)" }}
            contentStyle={{
              border: "none",
              borderRadius: "1rem",
              backgroundColor: "white",
            }}
            labelStyle={{ color: "black" }}
            itemStyle={{ color: "black" }}
          />
          <Bar dataKey="value" fill="#06AED4" radius={[8, 8, 8, 8]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

TopProducts.propTypes = {
  topProducts: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.string,
      amount: PropTypes.number,
      category: PropTypes.string,
    })
  ).isRequired,
  customerRisk: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ]).isRequired,
};
