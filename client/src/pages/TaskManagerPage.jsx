// HOOKS
import { useState } from "react";
import useManagedNumbers from "../hooks/taskManager-hooks/getManagedNumbers";
import useIncreasedNumbers from "../hooks/taskManager-hooks/getIncreasedNumbers";

// COMPONENTS
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Calendar from "../components/Calendar";
import TaskManager from "../components/TaskManager";
import PortfolioPie from "../components/TaskManager-components/PortfolioPie";
import LastTransaction from "../components/TaskManager-components/LastTransaction";

// ASSETS
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

export default function TaskManagerPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { managedNumbers, loading } = useManagedNumbers();
  const { increasedNumbers } = useIncreasedNumbers();
  const aumIncrease =
    ((increasedNumbers?.currentQuarter?.all_aum -
      increasedNumbers?.lastQuarter?.all_aum) /
      increasedNumbers?.lastQuarter?.all_aum) *
    100;
  const fbiIncrease =
    ((increasedNumbers?.currentQuarter?.all_fbi -
      increasedNumbers?.lastQuarter?.all_fbi) /
      increasedNumbers?.lastQuarter?.all_fbi) *
    100;
  const customerIncrease =
    ((increasedNumbers?.currentQuarter?.all_customers -
      increasedNumbers?.lastQuarter?.all_customers) /
      increasedNumbers?.lastQuarter?.all_customers) *
    100;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <Navbar />

        {/* DASHBOARD CONTENT */}
        <main className="flex flex-col md:flex-row gap-2 flex-1 overflow-y-auto mr-2 my-2">
          {/* Left Column */}
          <div className="flex flex-col gap-2 md:w-1/4">
            <div
              className="flex-1 rounded-2xl"
              style={{ backgroundColor: "#1D283A" }}
            >
              <TaskManager selectedDate={selectedDate} />
            </div>
            <div
              className="flex-1 rounded-2xl"
              style={{ backgroundColor: "#1D283A" }}
            >
              <Calendar
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-2 md:w-3/4">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 rounded-2xl p-4 bg-[#1D283A] text-2xl">
                <h1 className="font-bold">Total AUM</h1>
                <div className="flex flex-row items-center">
                  <h1>
                    {managedNumbers?.all_aum
                      ? `Rp ${Number(managedNumbers.all_aum).toLocaleString('id-ID')}`
                      : "N/A"}
                  </h1>
                  <h1
                    className={`text-sm ${
                      aumIncrease > 0 ? "text-green-500" : aumIncrease < 0 ? "text-red-500" : "text-orange-500"
                    } flex flex-row items-center`}
                  >
                    {aumIncrease > 0 ? (
                      <ArrowUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4" />
                    )}
                    {aumIncrease.toFixed(2)}%
                  </h1>
                </div>
                <p className="text-sm text-gray-400">vs kuartal sebelumnya</p>
              </div>
              <div className="flex-1 rounded-2xl p-4 bg-[#1D283A] text-2xl">
                <h1 className="font-bold">Total FBI</h1>
                <div className="flex flex-row">
                  <h1>
                    {managedNumbers?.all_fbi
                      ? `Rp ${Number(managedNumbers.all_fbi).toLocaleString('id-ID')}`
                      : "N/A"}
                  </h1>
                  <h1
                    className={`text-sm ${
                      fbiIncrease > 0 ? "text-green-500" : fbiIncrease < 0 ? "text-red-500" : "text-orange-500"
                    } flex flex-row items-center`}
                  >
                    {fbiIncrease > 0 ? (
                      <ArrowUpIcon className="w-4 h-4" />
                    ) : fbiIncrease < 0 ? (
                      <ArrowDownIcon className="w-4 h-4" />
                    ) : (
                      <span className="w-4 h-4" />
                    )}
                    {fbiIncrease.toFixed(2)}%
                  </h1>
                </div>
                <p className="text-sm text-gray-400">vs kuartal sebelumnya</p>
              </div>
              <div className="flex-1 rounded-2xl p-4 bg-[#1D283A] text-2xl">
                <h1 className="font-bold">Total Customers</h1>
                <div className="flex flex-row">
                  <h1>{managedNumbers?.all_customers || "N/A"}</h1>
                  <h1
                    className={`text-sm ${
                      customerIncrease > 0
                        ? "text-green-500"
                        : customerIncrease < 0
                        ? "text-red-500"
                        : "text-orange-500"
                    } flex flex-row items-center`}
                  >
                    {customerIncrease > 0 ? (
                      <ArrowUpIcon className="w-4 h-4" />
                    ) : customerIncrease < 0 ? (
                      <ArrowDownIcon className="w-4 h-4" />
                    ) : (
                      // Optionally, choose a neutral icon or leave it blank when the value is 0.
                      <span className="w-4 h-4" />
                    )}
                    {customerIncrease.toFixed(2)}%
                  </h1>
                </div>
                <p className="text-sm text-gray-400">vs kuartal sebelumnya</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 flex-1">
              <div className="flex-1 rounded-2xl bg-[#1D283A]">
                <PortfolioPie />
              </div>
              <div className="flex-1 rounded-2xl bg-[#1D283A]">
                <LastTransaction />
              </div>
            </div>
            <p className="text-lg font-bold">Transaksi Potensial</p>
            <div className="flex-1 rounded-2xl bg-[#1D283A]"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
