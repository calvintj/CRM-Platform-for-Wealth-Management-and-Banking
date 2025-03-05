// COMPONENTS
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// OVERVIEW COMPONENTS
import TotalCustomer from "../components/overview-components/TotalCustomerGauge";
import AUMTotal from "../components/overview-components/AUMTotalGauge";
import FBITotal from "../components/overview-components/FBITotalGauge";
import FUMBar from "../components/overview-components/FUMBar";
import FBIBar from "../components/overview-components/FBIBar";
import CustomerOverview from "../components/overview-components/CustomerOverviewPie";
import TopProducts from "../components/overview-components/TopProducts";

// HOOKS
import { useState } from "react";
import { useTotalCustomer } from "../hooks/overview-hooks/totalCustomer";
import { useTotalAUM } from "../hooks/overview-hooks/totalAUM";
import { useTotalFBI } from "../hooks/overview-hooks/totalFBI";
import { useQuarterlyFBI } from "../hooks/overview-hooks/quarterlyFBI";
import { useQuarterlyFUM } from "../hooks/overview-hooks/quarterlyFUM";
import { useTopProducts } from "../hooks/overview-hooks/topProducts";

// PAGE
export default function OverviewPage() {
  // STATE
  const [customerRisk, setCustomerRisk] = useState("All");

  // HOOKS
  const [customerData] = useTotalCustomer(customerRisk);
  const [aumData] = useTotalAUM(customerRisk);
  const [fbiData] = useTotalFBI(customerRisk);
  const [quarterlyFUM] = useQuarterlyFUM(customerRisk);
  const [quarterlyFBI] = useQuarterlyFBI(customerRisk);
  const [topProducts] = useTopProducts(customerRisk);

  // RENDER
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <Navbar customerRisk={customerRisk} setCustomerRisk={setCustomerRisk} />

        {/* DASHBOARD CONTENT */}
        <main className="flex flex-col gap-2 flex-1 overflow-y-auto mr-2 my-2">
          {/* Total Customer, AUM, and FBI */}
          <div className="flex flex-col md:flex-row gap-2">
            {/* Total Customer */}
            <div
              className="flex-1 rounded-2xl"
              style={{ backgroundColor: "#1D283A" }}
            >
              <TotalCustomer
                customerRisk={customerRisk}
                customerData={customerData}
              />
            </div>

            {/* Total AUM */}
            <div
              className="flex-1 rounded-2xl"
              style={{ backgroundColor: "#1D283A" }}
            >
              <AUMTotal customerRisk={customerRisk} aumData={aumData} />
            </div>

            {/* Total FBI */}
            <div
              className="flex-1 rounded-2xl"
              style={{ backgroundColor: "#1D283A" }}
            >
              <FBITotal customerRisk={customerRisk} fbiData={fbiData} />
            </div>
          </div>

          {/* Quarterly FUM and Customer Overview */}
          <div className="flex flex-col md:flex-row gap-2">
            {/* Quarterly FUM */}
            <div
              className="flex-[2] rounded-2xl"
              style={{ backgroundColor: "#1D283A" }}
            >
              <FUMBar customerRisk={customerRisk} quarterlyFUM={quarterlyFUM} />
            </div>

            {/* Customer Overview */}
            <div
              className="flex-1 rounded-2xl"
              style={{ backgroundColor: "#1D283A" }}
            >
              <CustomerOverview
                setCustomerRisk={setCustomerRisk}
                customerData={customerData}
                customerRisk={customerRisk}
              />
            </div>
          </div>

          {/* Quarterly FBI and Top Products */}
          <div className="flex flex-col md:flex-row gap-2">
            {/* Quarterly FBI */}
            <div
              className="flex-[2] rounded-2xl"
              style={{ backgroundColor: "#1D283A" }}
            >
              <FBIBar customerRisk={customerRisk} quarterlyFBI={quarterlyFBI} quarterlyFUM={quarterlyFUM}/>
            </div>

            {/* Top Products */}
            <div
              className="flex-1 rounded-2xl"
              style={{ backgroundColor: "#1D283A" }}
            >
              <TopProducts
                customerRisk={customerRisk}
                topProducts={topProducts}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
