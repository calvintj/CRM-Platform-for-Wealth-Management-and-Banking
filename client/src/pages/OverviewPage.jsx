import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import TotalCustomer from "../overview-components/TotalCustomerGauge";
import AUMTotal from "../overview-components/AUMTotalGauge";
import FBITotal from "../overview-components/FBITotalGauge";
import FUMBar from "../overview-components/FUMBar";
import FBIBar from "../overview-components/FBIBar";
import CustomerOverview from "../overview-components/CustomerOverviewPie";

export default function OverviewPage() {
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
              <TotalCustomer />
            </div>
            <div className="rounded-2xl" style={{ backgroundColor: "#1D283A" }}>
              <AUMTotal />
            </div>
            <div className="rounded-2xl" style={{ backgroundColor: "#1D283A" }}>
              <FBITotal />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div
              className="rounded-2xl col-span-2"
              style={{ backgroundColor: "#1D283A" }}
            >
              <FUMBar />
            </div>
            <div
              className="rounded-2xl"
              style={{ backgroundColor: "#1D283A" }}
            >
              <CustomerOverview />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div
              className="rounded-2xl col-span-2"
              style={{ backgroundColor: "#1D283A" }}
            >
              <FBIBar />
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
