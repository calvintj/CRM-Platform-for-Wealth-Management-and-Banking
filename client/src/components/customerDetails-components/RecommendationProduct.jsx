import useGetRecommendationProduct from "../../hooks/customerDetails-hooks/getRecommendationProduct";
import PropTypes from "prop-types";

export default function RecommendationProduct({ customerID }) {
  const { recommendationProduct, loading, error } =
    useGetRecommendationProduct(customerID);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul>
        {recommendationProduct.map((product, index) => (
          <li key={product.product} className="p-4 text-sm">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="font-bold truncate w-60">
                  {product.product}
                </span>
                <span className="text-gray-400">{product.asset_type}</span>
              </div>
              {index % 2 === 1 ? (
                <p className="bg-green-500 rounded-md text-black w-15 text-center flex items-center justify-center text-md">
                  Beli
                </p>
              ) : (
                <p className="bg-red-500 rounded-md text-white w-15 text-center flex items-center justify-center text-md">
                  Jual
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

RecommendationProduct.propTypes = {
  customerID: PropTypes.string.isRequired,
};
