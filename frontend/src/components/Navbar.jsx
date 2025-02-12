import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, CircleUser } from "lucide-react";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
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
                <div className="flex items-center space-x-2 bg-white text-green-500 px-4 py-2 rounded-lg shadow-sm">
                  <CircleUser size={20} />
                  <span className="font-medium">{user.username}</span>
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
                <div className="flex items-center space-x-2 bg-white text-green-500 px-4 py-2 rounded-lg shadow-sm">
                  <CircleUser size={20} />
                  <span className="font-medium">{user.username}</span>
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
