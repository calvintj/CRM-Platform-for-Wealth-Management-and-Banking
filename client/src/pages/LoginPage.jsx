import { useNavigate } from "react-router-dom";
import bati from "../assets/bati.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/overview");
      } else {
        console.error("Login error:", data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1D283A]">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-[930px] w-full mx-4 border-white border-2">
        {/* Left Box */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-4 bg-[#1D283A]">
          <img src={bati} alt="Fund Manager CRM" className="w-40 md:w-60 mb-3" />
          <small className="text-white text-center font-mono w-72">
            Stay on top of client interactions and investments seamlessly.
          </small>
        </div>

        {/* Right Box */}
        <div className="md:w-1/2 p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p>Log in to continue managing your funds.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                autoFocus
                className="w-full p-3 bg-gray-100 text-base rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full p-3 bg-gray-100 text-base rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="w-full py-2 px-4 text-white font-bold rounded hover:bg-black"
                style={{ backgroundColor: "#1D283A" }}
              >
                Login
              </button>
            </div>
            <div className="mb-5 flex justify-between items-center">
              <div>
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
