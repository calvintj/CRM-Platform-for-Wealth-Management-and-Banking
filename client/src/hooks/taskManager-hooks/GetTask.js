import { useState, useEffect } from "react";
import { getTask } from "../../services/taskManager-services/TaskAPI";

const useGetTask = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTask();
        setTask(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("halo", task)
  return { task, loading, error };
};

export default useGetTask;
