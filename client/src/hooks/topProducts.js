import { useState, useEffect } from "react";
import fetchTopProducts from "../services/fetchTopProducts";

export function useTopProducts(customerRisk) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTopProducts(customerRisk);
        let filteredData = [];

        // Filter data based on customerRisk
        if (customerRisk === "all") {
          filteredData = data.all;
        } else if (customerRisk.name === "Conservative") {
          filteredData = data.conservative;
        } else if (customerRisk.name === "Balanced") {
          filteredData = data.balanced;
        } else if (customerRisk.name === "Moderate") {
          filteredData = data.moderate;
        } else if (customerRisk.name === "Growth") {
          filteredData = data.growth;
        } else if (customerRisk.name === "Aggressive") {
          filteredData = data.aggressive;
        }

        setChartData(filteredData);
      } catch (error) {
        console.error("Error loading top products:", error);
      }
    };

    loadData();
  }, [customerRisk]);

  return [chartData, setChartData];
}
