import { useCustomerList } from "../../hooks/customerList-hooks/customerList";

const CustomerListTable = () => {
  const customerList = useCustomerList();

  return (
    <div 
      className="w-full overflow-x-auto overflow-y-auto rounded-2xl max-h-[500px]" 
    >
      <table className="min-w-full divide-y-2 divide-gray-900 text-sm dark:bg-[#1D283A]">
        <thead>
          <tr className="sticky top-0 z-30 bg-white dark:bg-[#1D283A]">
            <th className="sticky left-0 z-40 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Customer ID
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Profil Resiko
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              AUM Label
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Propensity
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Status
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Tipe Customer
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Pekerjaan
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Status Nikah
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Usia
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Pendapatan Tahunan
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Total FUM
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Total AUM
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
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
    </div>
  );
};

export default CustomerListTable;
