import { useState, useEffect } from "react";
import fetchReprofileRiskTarget from "../../services/taskManager-services/fetchReprofileRiskTarget";

const useReprofileRiskTarget = () => {
  const [reProfileRiskTarget, setReProfileRiskTarget] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReprofileRiskTarget();
        setReProfileRiskTarget(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { reProfileRiskTarget, loading, error };
};

export default useReprofileRiskTarget;
