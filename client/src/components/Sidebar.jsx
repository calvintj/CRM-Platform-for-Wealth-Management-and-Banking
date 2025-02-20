import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/persen white.png";

import { RiRobot3Line } from "react-icons/ri";

export default function Sidebar() {
  const navigate = useNavigate();
  // Define a common class for the links
  const linkClass =
    "text-gray-300 hover:text-white flex items-center gap-2 py-2 px-3 rounded-md";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to the login page
  };

  return (
    <aside
      className="w-23 p-1 flex flex-col m-2 rounded-2xl items-center"
      style={{ backgroundColor: "#1D283A" }}
    >
      {/* Logo or brand */}
      <div className="mt-4 mb-8 flex items-center">
        <img src={Logo} alt="Bati Logo" className="w-10 h-10" />
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1">
        <NavLink
          to="/overview"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
        </NavLink>

        <NavLink
          to="/customer-details"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </NavLink>

        <NavLink
          to="/task-manager"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </NavLink>

        <NavLink
          to="/news"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
            />
          </svg>
        </NavLink>

        <NavLink
          to="/chatbot"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          <RiRobot3Line />
        </NavLink>
      </nav>

      {/* Footer or user profile section */}
      <div className="mt-auto">
        <button
          className="text-gray-300 hover:text-white py-2"
          onClick={handleLogout}
        >
          <NavLink to="/">Log Out</NavLink>
        </button>
      </div>
    </aside>
  );
}
