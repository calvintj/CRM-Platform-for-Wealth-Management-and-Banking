import { useCustomerList } from "../../hooks/customerList-hooks/customerList";

const CustomerListTable = () => {
  // Hooks
  const customerList = useCustomerList();

  return (
    <table className="min-w-full divide-y-2 divide-gray-900 text-sm dark:bg-[#1D283A]">
      <thead>
        <tr className="sticky top-0 z-30">
                  <th className="sticky left-0 z-40 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    Customer ID
                  </th>
                  <th className="sticky top-0 z-30 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    Risk Profile
                  </th>
                  <th className="sticky top-0 z-30 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    AUM Label
                  </th>
                  <th className="sticky top-0 z-30 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    Propensity
                  </th>
                  <th className="sticky top-0 z-30 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    Status
                  </th>
                  <th className="sticky top-0 z-30 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    Tipe Customer
                  </th>
                  <th className="sticky top-0 z-30 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    Pekerjaan
                  </th>
                  <th className="sticky top-0 z-30 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    Status Nikah
                  </th>
                  <th className="sticky top-0 z-30 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    Usia
                  </th>
                  <th className="sticky top-0 z-30 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    Annual Income
                  </th>
                  <th className="sticky top-0 z-30 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    Total FUM
                  </th>
                  <th className="sticky top-0 z-30 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    Total AUM
                  </th>
                  <th className="sticky top-0 z-30 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1D283A]">
                    Total FBI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-900">
                {customerList.map((row, index) => (
                  <tr key={index}>
                    <td className="sticky left-0 z-10 whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-[#1D283A]">
                      {row["Customer ID"]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {row["Risk Profile"]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {row["AUM Label"]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {row["Propensity"]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {row["Priority / Private"]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {row["Customer Type"]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {row["Pekerjaan"]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {row["Status Nikah"]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {row["Usia"]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {row["Annual Income"]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {row["Total FUM"]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {row["Total AUM"]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {row["Total FBI"]}
                    </td>
                  </tr>
                ))}
              </tbody>
    </table>
  );
};

export default CustomerListTable;
