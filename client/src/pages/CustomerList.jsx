import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function CustomerListPage() {
  // STATE
  const [customerRisk, setCustomerRisk] = useState("all");
  const [customerList, setCustomerList] = useState([]);

  const data = [
    { name: "a", value: 12 },
    { name: "b", value: 20 },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const rm_number = tokenPayload.rm_number;

    fetch(
      `http://localhost:5000/api/customer-list/customer-list?rm_number=${rm_number}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setCustomerList(data);
      })
      .catch((err) => {
        console.error("Error fetching customer list:", err);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar customerRisk={customerRisk} setCustomerRisk={setCustomerRisk} />

        <main className="grid grid-rows gap-2 flex-1 overflow-y-auto mr-2 my-2">
          <div className="grid rounded-2xl bg-[#1D283A]">
            <BarChart width={730} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </div>

            <div className="grid rounded-2xl overflow-x-auto h-[300px]">
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
            </div>
          
        </main>
      </div>
    </div>
  );
}
