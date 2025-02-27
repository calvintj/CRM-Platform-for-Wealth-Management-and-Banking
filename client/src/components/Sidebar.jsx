// ROUTER
import { NavLink, useNavigate } from "react-router-dom";

// ASSETS
import Logo from "../assets/persen white.png";

// ICONS
import { RxDashboard } from "react-icons/rx";
import { FaListUl } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { RiRobot3Line } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

export default function Sidebar() {
  // ROUTER
  const navigate = useNavigate();

  // STYLES
  const linkClass =
    "text-gray-300 hover:text-white p-4 rounded-md";

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to the login page
  };

  return (
    // SIDEBAR
    <aside
      className="w-20 p-1 flex flex-col m-2 rounded-2xl items-center"
      style={{ backgroundColor: "#1D283A" }}
    >
      {/* Logo or brand */}
      <div className="mt-4 mb-8 flex items-center">
        <NavLink to="/overview">
          <img src={Logo} alt="Bati Logo" className="w-10 h-10" />
        </NavLink>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1">
        {/* Overview */}
        <NavLink
          to="/overview"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          <RxDashboard className="text-4xl" />
        </NavLink>

        {/* Customer List */}
        <NavLink
          to="/customer-list"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          <FaListUl className="text-4xl" />
        </NavLink>

        {/* Customer Details */}
        <NavLink
          to="/customer-details"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          <IoPersonOutline className="text-4xl" />
        </NavLink>

        {/* Task Manager */}
        <NavLink
          to="/task-manager"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          <MdOutlineTaskAlt className="text-4xl" />
        </NavLink>

        {/* Chatbot */}
        <NavLink
          to="/chatbot"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          <RiRobot3Line className="text-4xl" />
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button
          className="text-gray-300 hover:text-white py-2"
          onClick={handleLogout}
        >
          <NavLink to="/">
            <BiLogOut className="text-4xl" />
          </NavLink>
        </button>
      </div>
    </aside>
  );
}
