import { useState } from "react";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import PropTypes from "prop-types";

const TaskManager = ({ selectedDate }) => {
  // tasks is an object keyed by a date string like "YYYY-MM-DD".
  // Each property is an array of task strings for that date.
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState("");

  // Convert current selectedDate to "YYYY-MM-DD" format for storing tasks
  const dateKey = format(selectedDate, "yyyy-MM-dd");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newTask],
    }));
    setNewTask("");
  };

  return (
    <div className="p-4 rounded-lg text-white w-full" style={{ backgroundColor: "#1D283A" }}>
      <h3 className="text-lg font-bold mb-3">
        {format(selectedDate, "d MMMM yyyy", { locale: id })}
      </h3>

      <ul className="mb-4">
        {(tasks[dateKey] || []).map((task, index) => (
          <li key={index} className="bg-gray-700 p-2 mt-1 rounded">
            {task}
          </li>
        ))}
      </ul>

      <div className="flex">
        <input
          type="text"
          className="p-2 flex-grow text-black rounded-l"
          placeholder="Tambahkan tugas..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{backgroundColor:"white"}}
        />
        <button className="bg-blue-500 px-4 rounded-r" onClick={addTask}>
          +
        </button>
      </div>
    </div>
  );
};

export default TaskManager;

TaskManager.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};
