import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import id from "date-fns/locale/id";

const Calendar = ({ onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysShort = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  // Start/end of the current month
  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  // List all dates in the current month
  const daysInMonth = [];
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInMonth.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  // Utility to check if two dates are the same day
  const isSameDay = (d1, d2) =>
    d1?.getFullYear() === d2?.getFullYear() &&
    d1?.getMonth() === d2?.getMonth() &&
    d1?.getDate() === d2?.getDate();

  return (
    <div className="text-white p-4 rounded-lg w-full" style={{ backgroundColor: "#1D283A" }}>
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="px-2 py-1 bg-gray-600 rounded"
        >
          ⬅️
        </button>
        <h2 className="text-xl font-bold">
          {format(currentMonth, "MMMM yyyy", { locale: id })}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="px-2 py-1 bg-gray-600 rounded"
        >
          ➡️
        </button>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 gap-1 text-center font-bold mb-2">
        {daysShort.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* All dates in the month */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {daysInMonth.map((date) => {
          const isSelected = isSameDay(date, selectedDate);

          return (
            <div
              key={date}
              className={`cursor-pointer p-2 rounded-md hover:bg-blue-600
                ${isSelected ? "bg-blue-500" : ""}
              `}
              onClick={() => onDateSelect(date)}
            >
              {format(date, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
