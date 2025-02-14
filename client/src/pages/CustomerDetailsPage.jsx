import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Calendar from "../components/Calendar";
import TaskManager from "../components/TaskManager";

export default function TaskManagerPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <Navbar />

        {/* DASHBOARD CONTENT */}
        <main className="grid grid-cols-4 gap-2 flex-1 overflow-y-auto mr-2 my-2">
          <div className="grid grid-rows-20 gap-2">
            <div className="row-span-1 ml-2">Customer ID</div>
            <div
              className="rounded-2xl row-span-2"
              style={{ backgroundColor: "#1D283A" }}
            ></div>
            <div
              className="rounded-2xl row-span-10"
              style={{ backgroundColor: "#1D283A" }}
            ></div>
            <div className="row-span-1 ml-2">Actions Recommended</div>
            <div
              className="rounded-2xl row-span-7"
              style={{ backgroundColor: "#1D283A" }}
            ></div>
          </div>

          <div className="grid grid-rows-20 gap-2 col-span-3">
            <div className="grid grid-cols-3 gap-2 row-span-3">
              <div
                className="rounded-2xl"
                style={{ backgroundColor: "#1D283A" }}
              ></div>
              <div
                className="rounded-2xl"
                style={{ backgroundColor: "#1D283A" }}
              ></div>
              <div
                className="rounded-2xl"
                style={{ backgroundColor: "#1D283A" }}
              ></div>
            </div>
            <div className="grid grid-cols-2 row-span-9 gap-2">
              <div
                className="rounded-2xl"
                style={{ backgroundColor: "#1D283A" }}
              ></div>
              <div
                className="rounded-2xl"
                style={{ backgroundColor: "#1D283A" }}
              ></div>
            </div>
            <div className="row-span-1 ml-2">Product Holding</div>
            <div className="row-span-1 ml-2">By Quarter</div>
            <div
              className="rounded-2xl row-span-7"
              style={{ backgroundColor: "#1D283A" }}
            ></div>
          </div>
        </main>
      </div>
    </div>
  );
}
