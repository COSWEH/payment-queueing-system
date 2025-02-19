import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, UserCog, RefreshCw, ChevronDown } from "lucide-react";
import { toast } from "react-hot-toast";

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
    console.log("user", user.id);

    // Confirm Reset Toast
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-2xl rounded-lg pointer-events-auto flex flex-col ring-1 ring-black/5`}
      >
        <div className="flex-1 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-base font-medium text-gray-900">
                Reset Queue Confirmation
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Are you sure you want to reset the queue? This action cannot be
                undone.
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-t border-gray-200 divide-x divide-gray-200">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              setDropdownOpen(false);
              try {
                const response = await fetch("http://localhost:5000/queue", {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ teller_id: user.id }),
                });

                if (response.status === 404) {
                  throw new Error("No queue found to reset");
                }

                const data = await response.json();
                if (!response.ok)
                  throw new Error(data.error || "An error occurred");

                // Success Toast
                toast.custom(
                  (t) => (
                    <div
                      className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                      } max-w-md w-full bg-white shadow-2xl rounded-lg pointer-events-auto flex ring-1 ring-black/5`}
                    >
                      <div className="flex-1 p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-6 w-6 text-green-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div className="ml-3 flex-1">
                            <h3 className="text-base font-medium text-gray-900">
                              Success
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {data.message}
                            </p>
                          </div>
                          <button
                            onClick={() => toast.dismiss(t.id)}
                            className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ),
                  { duration: 5000 }
                );

                setDropdownOpen(false);
                fetchQueue();
              } catch (err) {
                console.error("Error resetting queue:", err);

                // Error Toast
                toast.custom(
                  (t) => (
                    <div
                      className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                      } max-w-md w-full bg-white shadow-2xl rounded-lg pointer-events-auto flex ring-1 ring-black/5`}
                    >
                      <div className="flex-1 p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-6 w-6 text-red-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div className="ml-3 flex-1">
                            <h3 className="text-base font-medium text-gray-900">
                              Error
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Failed to reset queue. Please try again.
                            </p>
                          </div>
                          <button
                            onClick={() => toast.dismiss(t.id)}
                            className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          >
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ),
                  { duration: 5000 }
                );
              }
            }}
            className="flex-1 flex items-center justify-center py-4 text-sm font-medium text-green-600 hover:text-green-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-150"
          >
            Confirm Reset
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              setDropdownOpen(false);
            }}
            className="flex-1 flex items-center justify-center py-4 text-sm font-medium text-red-600 hover:text-red-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-150"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <nav className="bg-green-500 shadow-md sticky top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-white font-bold text-base md:text-lg lg:text-xl xl:text-2xl">
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
                    to="/login"
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
                    className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-green-500 px-4 py-2 rounded-lg shadow-sm cursor-pointer transition-all duration-200 ease-in-out"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    <UserCog size={25} className="text-green-600" />
                    <span className="font-medium">{user.username}</span>
                    <ChevronDown
                      size={20}
                      className={`transform transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden transform transition-all duration-200 ease-in-out">
                      <div className="py-2">
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                          onClick={handleResetQueue}
                        >
                          <RefreshCw size={18} className="mr-2" />
                          Reset Queue
                        </button>
                      </div>
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
                    className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-green-500 px-4 py-2 rounded-lg shadow-sm cursor-pointer transition-all duration-200 ease-in-out"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    <UserCog size={25} className="text-green-600" />
                    <span className="font-medium">{user.username}</span>
                    <ChevronDown
                      size={20}
                      className={`transform transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden transform transition-all duration-200 ease-in-out">
                      <div className="py-2">
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                          onClick={handleResetQueue}
                        >
                          <RefreshCw size={18} className="mr-2" />
                          Reset Queue
                        </button>
                      </div>
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
