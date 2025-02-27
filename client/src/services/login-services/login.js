export const loginService = {
  /**
   * Authenticates a user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} Response data containing token and user info
   */
  
  login: async (email, password) => {
    // Fetch the login endpoint
    const response = await fetch("http://localhost:5000/api/auth/login", {
      // POST request
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Parse the response as JSON
    const data = await response.json();

    // If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    // Return the data
    return data;
  },
};
