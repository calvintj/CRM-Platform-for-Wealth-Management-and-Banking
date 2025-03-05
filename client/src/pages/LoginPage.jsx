// REACT  
import { useState } from "react";

// HOOKS
import { useLogin } from "../hooks/login-hooks/login";

// ROUTER
import { Link } from "react-router-dom";

// ASSETS
import Bati from "../assets/Bati.png";
import Polygon from "../assets/Polygon.png";
import Polygon2 from "../assets/Polygon 2.png";

const LoginPage = () => {
  // HOOKS
  const { handleLogin, error, loading } = useLogin();

  // CONTROLLED INPUT STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FUNCTIONS
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    // LOGIN CONTAINER
    <div className="h-screen flex items-center justify-between bg-[#1D283A]">
      <div className="ml-20">
        <img src={Polygon} alt="Polygon" className="w-80 mb-3" />
      </div>
      <div className="border-2 border-white flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* TOP BOX */}
        <div className="flex flex-col items-center justify-center p-8 bg-[#1D283A]">
          {/* LOGO */}
          <img src={Bati} alt="Fund Manager CRM" className="w-80 mb-3" />
          {/* LOGO TEXT */}
          <p className="text-white text-center text-sm">
            Pantau interaksi dan investasi nasabah dengan lancar!
          </p>
        </div>

        {/* BOTTOM BOX */}
        <div className="p-4 flex flex-col">
          {/* WELCOME BACK */}
          <div className="mb-2 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold mb-2">Selamat Datang!</p>
            <p>Masuk untuk mengelola dana Anda!</p>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit}>
            {/* EMAIL INPUT */}
            <div className="mb-2">
              <label htmlFor="email" className="text-sm font-medium text-black">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 mt-1 bg-gray-100 focus:ring-blue-500 rounded-md"
              />
            </div>

            {/* PASSWORD INPUT */}
            <div className="mb-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 mt-1 bg-gray-100 focus:ring-blue-500 rounded-md"
              />
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-3 p-2 bg-red-100 text-red-700 rounded-md text-center">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON & FORGOT PASSWORD LINK */}
            <div className="mb-3 flex justify-between items-center">
              <button
                type="submit"
                className="py-2 px-4 text-white font-bold rounded-md hover:bg-blue-500 bg-blue-600 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="mr-20">
        <img src={Polygon2} alt="Polygon 2" className="w-80 mb-3" />
      </div>
    </div>
  );
};

export default LoginPage;
