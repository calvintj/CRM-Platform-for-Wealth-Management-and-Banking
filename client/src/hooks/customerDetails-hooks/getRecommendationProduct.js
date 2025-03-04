import { useState, useEffect } from "react";
import fetchRecommendationProduct from "../../services/customerDetails-services/fetchRecommendationProduct";

const useGetRecommendationProduct = (customerID) => {
  const [recommendationProduct, setRecommendationProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecommendationProduct(customerID);
        setRecommendationProduct(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [customerID]);
  console.log("test333", recommendationProduct);

  return { recommendationProduct, loading, error };
};

export default useGetRecommendationProduct;