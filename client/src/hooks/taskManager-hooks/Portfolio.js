import { useState, useEffect } from "react";
import fetchPortfolio from "../../services/taskManager-services/fetchPortfolio";

const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        setLoading(true);
        const data = await fetchPortfolio();
        setPortfolio(data);

        // Transform portfolio data for the pie chart
        if (data && data.length > 0) {
          const portfolio = data[0]; // Get the first item from the array

          const transformed = [
            { name: "CASA", value: parseFloat(portfolio?.casa) || 0 },
            { name: "Saving Bond", value: parseFloat(portfolio?.sb) || 0 },
            { name: "Deposito", value: parseFloat(portfolio?.deposito) || 0 },
            { name: "Reksadana", value: parseFloat(portfolio?.rd) || 0 },
          ].filter((item) => item.value > 0); // Only include items with values > 0

          setTransformedData(transformed);
        } else {
          setTransformedData([]);
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getPortfolio();
  }, []);

  console.log("transformedData:", transformedData);
  console.log("portfolio:", portfolio);
  return { portfolio, transformedData, loading, error };
};

export default usePortfolio;
