import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

import TotalCustomer from "../overview-components/TotalCustomerGauge";
import AUMTotal from "../overview-components/AUMTotalGauge";
import FBITotal from "../overview-components/FBITotalGauge";
import FUMBar from "../overview-components/FUMBar";
import FBIBar from "../overview-components/FBIBar";
import CustomerOverview from "../overview-components/CustomerOverviewPie";

import { useTotalCustomer } from "../hooks/totalCustomer";
import { useTotalAUM } from "../hooks/totalAUM";
import { useTotalFBI } from "../hooks/totalFBI";

export default function OverviewPage() {
  const [customerRisk, setCustomerRisk] = useState("all");
  const [customerData] = useTotalCustomer(customerRisk);
  const [aumData] = useTotalAUM(customerRisk);
  const [fbiData] = useTotalFBI(customerRisk);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <Navbar />

        {/* DASHBOARD CONTENT */}
        <main className="grid gap-2 flex-1 overflow-y-auto mr-2 my-2">
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl" style={{ backgroundColor: "#1D283A" }}>
              <TotalCustomer
                customerRisk={customerRisk}
                customerData={customerData}
              />
            </div>
            <div className="rounded-2xl" style={{ backgroundColor: "#1D283A" }}>
              <AUMTotal customerRisk={customerRisk} aumData={aumData} />
            </div>
            <div className="rounded-2xl" style={{ backgroundColor: "#1D283A" }}>
              <FBITotal customerRisk={customerRisk} fbiData={fbiData} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div
              className="rounded-2xl col-span-2"
              style={{ backgroundColor: "#1D283A" }}
            >
              <FUMBar customerRisk={customerRisk} />
            </div>
            <div className="rounded-2xl" style={{ backgroundColor: "#1D283A" }}>
              <CustomerOverview
                setCustomerRisk={setCustomerRisk}
                customerData={customerData}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div
              className="rounded-2xl col-span-2"
              style={{ backgroundColor: "#1D283A" }}
            >
              <FBIBar customerRisk={customerRisk} />
            </div>
            <div
              className="rounded-2xl"
              style={{ backgroundColor: "#1D283A" }}
            ></div>
          </div>
        </main>
      </div>
    </div>
  );
}
