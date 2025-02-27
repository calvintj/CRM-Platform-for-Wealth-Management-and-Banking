// Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Services
import { loginService } from "../../services/login-services/login";

/**
 * Custom hook for handling login functionality
 * @returns {Object} Login-related functions and state
 */

export const useLogin = () => {
  // State
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // Functions
  const handleLogin = async (email, password) => {
    // Set loading to true
    setLoading(true);
    // Set error to null
    setError(null);

    try {
      // Login the user 
      const data = await loginService.login(email, password);
      // Set the token in local storage
      localStorage.setItem("token", data.token);
      // Set loading to false
      setLoading(false);
      // Navigate to the overview page
      navigate("/overview");
      // Return true
    } catch (error) {
      // Log the error
      console.error("Error during login:", error);
      // Set the error message
      setError(error.message);
      // Set loading to false
      setLoading(false);
      // Return false
      return false;
    }
  };

  // Return the functions and state
  return {
    handleLogin,
    error,
    loading,
  };
};
