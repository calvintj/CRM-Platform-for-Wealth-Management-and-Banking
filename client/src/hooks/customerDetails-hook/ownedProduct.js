import { useState, useEffect } from "react";
import fetchOwnedProduct from "../../services/customerDetails-services/fetchOwnedProduct";

const useOwnedProduct = (customerID) => {
  const [ownedProduct, setOwnedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOwnedProduct(customerID);
        setOwnedProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [customerID]);

  return { ownedProduct, loading, error };
};

export default useOwnedProduct;
