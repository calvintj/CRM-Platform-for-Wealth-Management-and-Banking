// Hooks
import { useState } from "react";
import { useCustomerDetails } from "../hooks/customerDetails-hook/customerDetails";

// Components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CustomerDropdown from "../components/customerDetails-components/CustomerDropdown";
import PortfolioPie from "../components/customerDetails-components/PortfolioPie";

export default function CustomerDetailsPage() {
  // State
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [customerID, setCustomerID] = useState("1");
  const { data, loading } = useCustomerDetails(customerID);

  // Add console log to debug
  console.log("Customer data:", data);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <Navbar />

        {/* DASHBOARD CONTENT */}
        <main className="grid grid-cols-12 gap-2 flex-1 overflow-y-auto mr-2 my-2">
          {/* Left Column - Customer Details */}
          <div className="flex flex-col gap-2 col-span-3">
            {/* ID Nasabah */}
            <div className="ml-2">ID Nasabah</div>

            {/* Dropdown */}
            <div
              className="rounded-2xl p-2 flex items-center justify-center"
              style={{ backgroundColor: "#1D283A" }}
            >
              <CustomerDropdown
                customerID={customerID}
                setCustomerID={setCustomerID}
              />
            </div>

            {/* Customer Details */}
            <div
              className="flex flex-col rounded-2xl gap-4 p-4"
              style={{ backgroundColor: "#1D283A" }}
            >
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <>
                  <div className="bg-gray-700 rounded-2xl items-center flex justify-between p-2 font-bold">
                    <h2 className="pl-2">Status</h2>
                    <h2 className="pr-2">{data?.Priority_Private || "N/A"}</h2>
                  </div>

                  <div className="bg-gray-700 rounded-2xl justify-between items-center flex p-2 font-bold">
                    <h2 className="pl-2">Usia</h2>
                    <h2 className="pr-2">{data?.Usia || "N/A"}</h2>
                  </div>

                  <div className="bg-gray-700 rounded-2xl justify-between items-center flex p-2 font-bold">
                    <h2 className="pl-2">Status Pernikahan</h2>
                    <h2 className="pr-2">{data?.Status_Nikah || "N/A"}</h2>
                  </div>

                  <div className="bg-gray-700 rounded-2xl justify-between items-center flex p-2 font-bold">
                    <h2 className="pl-2">Profil Resiko</h2>
                    <h2 className="pr-2">{data?.Risk_Profile || "N/A"}</h2>
                  </div>

                  <div className="bg-gray-700 rounded-2xl justify-between items-center flex p-2 font-bold">
                    <h2 className="pl-2">Vintage</h2>
                    <h2 className="pr-2">{data?.Vintage || "N/A"}</h2>
                  </div>
                </>
              )}
            </div>

            {/* Actions Recommended */}
            <div className="ml-2">Actions Recommended</div>
            <div
              className="rounded-2xl flex-grow mb-2"
              style={{ backgroundColor: "#1D283A" }}
            ></div>
          </div>

          {/* Right Column - FUM, AUM, FBI and Portfolio */}
          <div className="flex flex-col gap-2 col-span-9">
            <div className="grid grid-cols-3 gap-2">
              {/* FUM */}
              <div
                className="rounded-2xl flex flex-col justify-center items-center font-bold text-2xl p-4"
                style={{ backgroundColor: "#1D283A" }}
              >
                <h1>FUM</h1>
                <h1>
                  {data?.Total_FUM
                    ? `Rp ${data.Total_FUM.toLocaleString("en-US")}`
                    : "N/A"}
                </h1>
              </div>

              {/* AUM */}
              <div
                className="rounded-2xl flex flex-col items-center justify-center font-bold text-2xl p-4"
                style={{ backgroundColor: "#1D283A" }}
              >
                <h1>AUM</h1>
                <h1>{data?.Total_AUM || "N/A"}</h1>
              </div>

              {/* FBI */}
              <div
                className="rounded-2xl flex flex-col items-center justify-center font-bold text-2xl p-4"
                style={{ backgroundColor: "#1D283A" }}
              >
                <h1>FBI</h1>
                <h1>{data?.Total_FBI || "N/A"}</h1>
              </div>
            </div>

            {/* Portfolio Allocation */}
            <div className="grid md:grid-cols-2 gap-2">
              {/* Current Allocation & Optimized Allocation */}
              <div
                className="rounded-2xl"
                style={{ backgroundColor: "#1D283A" }}
              >
                <PortfolioPie />
              </div>

              {/* Allocation Detail */}
              <div
                className="rounded-2xl"
                style={{ backgroundColor: "#1D283A" }}
              ></div>
            </div>

            {/* Product Holding */}
            <div className="ml-2">Product Holding</div>

            {/* By Quarter */}
            <div className="ml-2">By Quarter</div>
            <div
              className="rounded-2xl flex-grow mb-2"
              style={{ backgroundColor: "#1D283A" }}
            ></div>
          </div>
        </main>
      </div>
    </div>
  );
}
