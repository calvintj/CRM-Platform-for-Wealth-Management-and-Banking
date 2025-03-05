// Hooks
import { useLogin } from "../hooks/login-hooks/login";

// Assets
import bati from "../assets/bati.png";

const LoginPage = () => {
  // Hooks
  const { handleLogin, error, loading } = useLogin();

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await handleLogin(email, password);
  };

  return (
    // Login Container
    <div className="min-h-screen flex items-center justify-center bg-[#1D283A]">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-[930px] w-full mx-4 border-white border-2">
        {/* Left Box */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-4 bg-[#1D283A]">
          {/* Logo */}
          <img
            src={bati}
            alt="Fund Manager CRM"
            className="w-40 md:w-60 mb-3"
          />
          {/* Logo Text */}
          <small className="text-white text-center font-mono w-72">
            Stay on top of client interactions and investments seamlessly.
          </small>
        </div>

        {/* Right Box */}
        <div className="md:w-1/2 p-4">
          {/* Welcome Back */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p>Log in to continue managing your funds.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="mb-3 p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Email Input */}
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

            {/* Password Input */}
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full p-3 bg-gray-100 text-base rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login Button */}
            <div className="mb-3">
              <button
                type="submit"
                className="w-full py-2 px-4 text-white font-bold rounded hover:bg-black bg-[#1D283A] cursor-pointer"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* Forgot Password */}
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
