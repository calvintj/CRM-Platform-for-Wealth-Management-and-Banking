import PropTypes from "prop-types";
import { useEffect } from "react";
import usePotentialTransaction from "../../hooks/taskManager-hooks/PotentialTransaction";

export default function OwnedProductTable({ currentPage, setPageCount }) {
  // Hook
  const { potentialTransaction, loading, error } = usePotentialTransaction();
  const itemsPerPage = 5;

  // Calculate and update page count when data loads or changes
  useEffect(() => {
    if (potentialTransaction && potentialTransaction.length > 0) {
      const newPageCount = Math.ceil(
        potentialTransaction.length / itemsPerPage
      );
      setPageCount(newPageCount);
    } else {
      setPageCount(0);
    }
  }, [potentialTransaction, itemsPerPage, setPageCount]);

  if (loading) {
    return <div>Loading potential transaction data...</div>;
  }

  if (error) {
    return <div>Error loading potential transaction data: {error.message}</div>;
  }

  // Calculate pagination values
  const offset = currentPage * itemsPerPage;
  const currentItems = potentialTransaction.slice(
    offset,
    offset + itemsPerPage
  );

  return (
    <div className="h-[230px] flex flex-col">
      <div className="flex-1 overflow-auto rounded-2xl">
        {/* <div className="rounded-2xl mx-2"> */}
        <table className="divide-y-2 divide-gray-900 text-sm text-center w-full">
          <thead className="sticky top-0 bg-[#1D283A] z-10">
            <tr>
              <th className="py-2">ID Nasabah</th>
              <th>Nama Produk</th>
              <th>Untung/Rugi (%)</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-900">
            {currentItems.map((product, index) => (
              <tr key={index}>
                <td className="py-2">{product.id_nasabah}</td>
                <td>{product.nama_produk}</td>
                <td>
                  <span
                    className={
                      product.profit > 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {product.profit > 0
                      ? product.profit
                      : `(${Math.abs(product.profit)})`}
                  </span>
                </td>
                <td className="p-2">
                  <div className="flex justify-center items-center w-full h-full">
                    {product.profit > 0 ? (
                      <p className="text-black bg-green-500 rounded-md w-24">
                        Ambil Profit
                      </p>
                    ) : (
                      <p className="text-black bg-yellow-500 rounded-md w-24">
                        Janji Temu
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* </div> */}
      </div>
    </div>
  );
}

OwnedProductTable.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setPageCount: PropTypes.func.isRequired,
};
