// Components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StackedBarChart from "../components/customerList-components/StackedBarChart";
import CustomerListTable from "../components/customerList-components/CustomerListTable";

export default function CustomerListPage() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        
        {/* MAIN CONTENT AREA */}
        <main className="grid grid-rows gap-2 flex-1 overflow-y-auto mr-2 my-2">
          {/* Stacked Bar Chart */}
          <div className="grid rounded-2xl bg-[#1D283A]">
            <StackedBarChart />
          </div>

          {/* Customer List Table */}
          <div className="grid rounded-2xl overflow-x-auto h-[300px]">
            <CustomerListTable />
          </div>
        </main>
      </div>
    </div>
  );
}
