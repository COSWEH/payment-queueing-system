import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, UserCog } from "lucide-react";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { QueueContext } from "../context/QueueContext";

const Navbar = () => {
  const { fetchQueue } = useContext(QueueContext);
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    console.log("user", user.id);
    await logout(user.id);
  };

  const handleResetQueue = async () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the queue?"
    );

    if (!confirmReset) return;

    try {
      const response = await fetch("http://localhost:5000/queue", {
        method: "DELETE", // Change DELETE to POST
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "An error occurred");

      alert(data.message);
      setDropdownOpen(false);
      fetchQueue();
    } catch (err) {
      console.error("Error resetting queue:", err);
      alert("Failed to reset queue. Please try again.");
    }
  };

  return (
    <nav className="bg-green-500 shadow-md sticky top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-white font-bold text-xl">
            Payment Queueing System
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {!user ? (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition ${
                      isActive ? "border-b-2" : ""
                    }`
                  }
                >
                  Get Number
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition ${
                      isActive ? "border-b-2" : ""
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition ${
                      isActive ? "border-b-2" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition ${
                      isActive ? "border-b-2" : ""
                    }`
                  }
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                <div className="p-2 space-x-8">
                  <NavLink
                    to="/teller"
                    className={({ isActive }) =>
                      `text-white hover:text-gray-200 transition ${
                        isActive ? "border-b-2" : ""
                      }`
                    }
                  >
                    Teller Dashboard
                  </NavLink>

                  <NavLink
                    to="/"
                    onClick={handleLogout}
                    className={({ isActive }) =>
                      `text-white hover:text-gray-200 transition ${
                        isActive ? "border-b-2" : ""
                      }`
                    }
                  >
                    Logout
                  </NavLink>
                </div>

                {/* User Profile */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 bg-white text-green-500 px-4 py-2 rounded-lg shadow-sm cursor-pointer"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    <UserCog size={25} />
                    <span className="font-medium">{user.username}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                      <button
                        className="block w-full text-left rounded-lg text-white px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer"
                        onClick={handleResetQueue}
                      >
                        Reset Queue
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-600">
          <div className="flex flex-col space-y-4 p-4">
            {!user ? (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition ${
                      isActive ? "border-b-2" : ""
                    }`
                  }
                >
                  Get Number
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition ${
                      isActive ? "border-b-2" : ""
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition ${
                      isActive ? "border-b-2" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition ${
                      isActive ? "border-b-2" : ""
                    }`
                  }
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/teller"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition ${
                      isActive ? "border-b-2" : ""
                    }`
                  }
                >
                  Teller Dashboard
                </NavLink>

                <NavLink
                  to="/"
                  onClick={handleLogout}
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition ${
                      isActive ? "border-b-2" : ""
                    }`
                  }
                >
                  Logout
                </NavLink>

                {/* User Profile */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 bg-white text-green-500 px-4 py-2 rounded-lg shadow-sm cursor-pointer"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    <UserCog size={25} />
                    <span className="font-medium">{user.username}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                      <button
                        className="block w-full text-left rounded-lg text-white px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer"
                        onClick={handleResetQueue}
                      >
                        Reset Queue
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
