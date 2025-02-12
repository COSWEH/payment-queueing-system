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
    <nav className="bg-orange-500 shadow-md sticky top-0 left-0 w-full z-50">
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
                  className="text-white hover:text-gray-200 transition"
                >
                  Get Number
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className="text-white hover:text-gray-200 transition"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/login"
                  className="text-white hover:text-gray-200 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-white hover:text-gray-200 transition"
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                <div className="p-2 space-x-8">
                  <NavLink
                    to="/teller"
                    className="text-white hover:text-gray-200 transition"
                  >
                    Teller Dashboard
                  </NavLink>

                  <NavLink
                    to="/"
                    onClick={handleLogout}
                    className="text-white hover:text-gray-200 transition"
                  >
                    Logout
                  </NavLink>
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-2 bg-white text-orange-500 px-4 py-2 rounded-lg shadow-sm">
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
        <div className="md:hidden bg-orange-600">
          <div className="flex flex-col space-y-4 p-4">
            {!user ? (
              <>
                <NavLink
                  to="/"
                  className="text-white hover:text-gray-200 transition"
                >
                  Get Number
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className="text-white hover:text-gray-200 transition"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/login"
                  className="text-white hover:text-gray-200 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-white hover:text-gray-200 transition"
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/teller"
                  className="text-white hover:text-gray-200 transition"
                >
                  Teller Dashboard
                </NavLink>

                <NavLink
                  to="/"
                  onClick={handleLogout}
                  className="text-white hover:text-gray-200 transition"
                >
                  Logout
                </NavLink>

                {/* User Profile */}
                <div className="flex items-center space-x-2 bg-white text-orange-500 px-4 py-2 rounded-lg shadow-sm">
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
