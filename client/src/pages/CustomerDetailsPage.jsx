import { useState } from "react";
import { useCustomerDetails } from "../hooks/customerDetails-hooks/customerDetails";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// Components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CustomerDropdown from "../components/customerDetails-components/CustomerDropdown";
import RecommendationProduct from "../components/customerDetails-components/RecommendationProduct";
import PortfolioPie from "../components/customerDetails-components/PortfolioPie";
import OptimizedPortfolio from "../components/customerDetails-components/OptimizedPortfolio";
import OwnedProductTable from "../components/customerDetails-components/OwnedProductTable";
import ActivityManager from "../components/customerDetails-components/ActivityManager";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

// Hooks
import useGetReturnPercentage from "../hooks/customerDetails-hooks/getReturnPercentage";

// Icons
import { GrOptimize } from "react-icons/gr";

export default function CustomerDetailsPage() {
  // State hooks
  const [searchParams] = useSearchParams();

  const [customerID, setCustomerID] = useState("");
  const { data, loading } = useCustomerDetails(customerID);
  const [currentPortfolio, setCurrentPortfolio] = useState("current");
  const { returnPercentage } = useGetReturnPercentage(customerID);

  useEffect(() => {
    const customerID = searchParams.get("customerID");
    if (customerID) {
      setCustomerID(customerID);
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <Navbar />

        {/* DASHBOARD CONTENT */}
        <main className="grid grid-cols-12 gap-2 flex-1 overflow-y-auto mr-2 mt-2 overscroll-contain">
          {/* Left Column - Customer Details */}
          <div className="flex flex-col gap-2 col-span-3">
            {/* Customer Dropdown */}
            <div className="rounded-2xl flex items-center justify-between p-2 bg-[#1D283A]">
              <div className="font-bold">ID Nasabah: {customerID}</div>

              <CustomerDropdown
                customerID={customerID}
                setCustomerID={setCustomerID}
              />
            </div>
            {/* Customer Details */}
            <div className="flex flex-col rounded-2xl gap-4 p-4 bg-[#1D283A]">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <>
                  <div className="bg-gray-700 rounded-2xl flex items-center justify-between p-2">
                    <h2 className="pl-2 font-bold">Status</h2>
                    <h2 className="pr-2">{data?.Priority_Private || "N/A"}</h2>
                  </div>

                  <div className="bg-gray-700 rounded-2xl flex items-center justify-between p-2">
                    <h2 className="pl-2 font-bold">Usia</h2>
                    <h2 className="pr-2">{data?.Usia || "N/A"}</h2>
                  </div>

                  <div className="bg-gray-700 rounded-2xl flex items-center justify-between p-2">
                    <h2 className="pl-2 font-bold">Status Pernikahan</h2>
                    <h2 className="pr-2">{data?.Status_Nikah || "N/A"}</h2>
                  </div>

                  <div className="bg-gray-700 rounded-2xl flex items-center justify-between p-2">
                    <h2 className="pl-2 font-bold">Profil Resiko</h2>
                    <h2 className="pr-2">{data?.Risk_Profile || "N/A"}</h2>
                  </div>

                  <div className="bg-gray-700 rounded-2xl flex items-center justify-between p-2">
                    <h2 className="pl-2 font-bold">Vintage</h2>
                    <h2 className="pr-2">{data?.Vintage || "N/A"}</h2>
                  </div>
                </>
              )}
            </div>

            {/* Actions Recommended */}
            <div className="ml-2 font-bold">Rekomendasi</div>
            <div
              className="rounded-2xl flex-grow mb-2"
              style={{ backgroundColor: "#1D283A" }}
            >
              {/* <RecommendationProduct customerID={customerID} /> */}
            </div>
          </div>

          {/* Right Column - FUM, AUM, FBI and Portfolio */}
          <div className="flex flex-col gap-2 col-span-9">
            <div className="grid grid-cols-3 gap-2">
              {/* FUM */}
              <div
                className="rounded-2xl flex flex-col justify-center items-center text-2xl p-4"
                style={{ backgroundColor: "#1D283A" }}
              >
                <h1 className="font-bold">FUM</h1>
                <h1>
                  {data?.Total_FUM
                    ? `Rp ${Number(data.Total_FUM).toLocaleString("id-ID")}`
                    : "N/A"}
                </h1>
              </div>

              {/* AUM */}
              <div
                className="rounded-2xl flex flex-col items-center justify-center text-2xl p-4"
                style={{ backgroundColor: "#1D283A" }}
              >
                <h1 className="font-bold">AUM</h1>
                <h1>
                  {data?.Total_AUM
                    ? `Rp ${Number(data.Total_AUM).toLocaleString("id-ID")}`
                    : "N/A"}
                </h1>
              </div>

              {/* FBI */}
              <div
                className="rounded-2xl flex flex-col items-center justify-center text-2xl p-4"
                style={{ backgroundColor: "#1D283A" }}
              >
                <h1 className="font-bold">FBI</h1>
                <h1>
                  {data?.Total_FBI
                    ? `Rp ${Number(data.Total_FBI).toLocaleString("id-ID")}`
                    : "N/A"}
                </h1>
              </div>
            </div>

            {/* Portfolio Allocation */}
            <div className="grid grid-cols-2 gap-2 h-[420px]">
              {/* Current & Optimized Allocation */}
              <div className="rounded-2xl bg-[#1D283A]">
                {/* Portfolio Transition Animation */}
                <div>
                  {currentPortfolio === "optimized" ? (
                    <OptimizedPortfolio customerID={customerID} />
                  ) : (
                    <PortfolioPie customerID={customerID} />
                  )}
                </div>
                {/* Header with Return Info and Toggle Button */}
                <div className="flex justify-between items-center px-4 py-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-white">
                      {currentPortfolio === "current"
                        ? "Current Return"
                        : "Expected Return"}
                    </p>
                    {currentPortfolio === "current" ? (
                      <p className="bg-[#01ACD2] text-black rounded-md text-center w-12 py-1">
                        {`${(
                          Number(returnPercentage[0]?.current_return) * 100
                        ).toFixed(0)}%`}
                      </p>
                    ) : (
                      <div className="flex gap-2">
                        <p className="bg-[#01ACD2] text-black rounded-md text-center w-12 py-1">
                          {`${(
                            Number(returnPercentage[0]?.expected_return) * 100
                          ).toFixed(0)}%`}
                        </p>
                        <p
                          className={`flex items-center justify-center rounded-md text-center w-12 py-1 ${
                            (Number(returnPercentage[0]?.expected_return) -
                              Number(returnPercentage[0]?.current_return)) *
                              100 >
                            0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {(Number(returnPercentage[0]?.expected_return) -
                            Number(returnPercentage[0]?.current_return)) *
                            100 >
                          0 ? (
                            <ArrowUpIcon className="w-4 h-4" />
                          ) : (
                            <ArrowDownIcon className="w-4 h-4" />
                          )}
                          {`${Math.abs(
                            (Number(returnPercentage[0]?.expected_return) -
                              Number(returnPercentage[0]?.current_return)) *
                              100
                          ).toFixed(0)}%`}
                        </p>
                      </div>
                    )}
                  </div>
                  <GrOptimize
                    className="text-[#01ACD2] text-5xl border-2 border-[#01ACD2] rounded-md p-2 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                    onClick={() =>
                      setCurrentPortfolio(
                        currentPortfolio === "current" ? "optimized" : "current"
                      )
                    }
                  />
                </div>
              </div>

              {/* Allocation Detail */}
              <div
                className="rounded-2xl"
                style={{ backgroundColor: "#1D283A" }}
              >
                <ActivityManager customerID={customerID} />
              </div>
            </div>

            <div className="ml-2">
              <p className="font-bold">Kepemilikan Produk</p>
              <p className="text-sm text-gray-400">Kuartal Terakhir</p>
            </div>
            <div
              className="rounded-2xl flex-grow mb-2"
              style={{ backgroundColor: "#1D283A" }}
            >
              <OwnedProductTable customerID={customerID} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
