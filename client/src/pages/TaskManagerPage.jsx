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
          <div className="grid grid-rows-2 gap-2">
            <div className="rounded-2xl" style={{ backgroundColor: "#1D283A" }}>
              <TaskManager selectedDate={selectedDate} />
            </div>
            <div className="rounded-2xl" style={{ backgroundColor: "#1D283A" }}>
              <Calendar
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
            </div>
          </div>

          <div className="grid grid-rows-3 gap-2 col-span-3">
            <div className="grid grid-cols-3 gap-2">
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
            <div className="grid grid-cols-2 gap-2">
              <div
                className="rounded-2xl"
                style={{ backgroundColor: "#1D283A" }}
              ></div>
              <div
                className="rounded-2xl"
                style={{ backgroundColor: "#1D283A" }}
              ></div>
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

{
  /* <iframe
              width="1000"
              height="600"
              src="https://lookerstudio.google.com/embed/reporting/9743bdd2-de2b-44e1-8114-e2436cb4ca2f/page/UvVrE"
              frameBorder="0"
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              style={{ backgroundColor: "#1D283A" }}
            ></iframe> */
}
