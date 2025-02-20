import { useState, useEffect } from "react";
import fetchTotalCustomer from "../services/fetchTotalCustomer";

export function useTotalCustomerData(customerRisk) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchTotalCustomer(customerRisk);
        console.log("Raw API result:", result);
        const formattedData = [
          {
            name: "Conservative",
            value: parseInt(result.conservative) || 0,
          },
          { name: "Balanced", value: parseInt(result.balanced) || 0 },
          { name: "Moderate", value: parseInt(result.moderate) || 0 },
          { name: "Growth", value: parseInt(result.growth) || 0 },
          { name: "Aggressive", value: parseInt(result.aggressive) || 0 },
        //   { name: "All", value: parseInt(result.all) || 0 },
        ];
        console.log("Formatted data:", formattedData);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    loadData();
  }, [customerRisk]);

  return [chartData, setChartData];
}
