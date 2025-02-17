import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [windowNo, setWindowNo] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [windowAvailability, setWindowAvailability] = useState({});

  const { login, error, isLoading } = useLogin();

  useEffect(() => {
    const checkAllWindowsAvailability = async () => {
      for (let i = 1; i <= 5; i++) {
        try {
          const response = await fetch(
            "http://localhost:5000/teller/checkWindowNo",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ window_no: i }),
            }
          );
          const data = await response.json();
          setWindowAvailability((prev) => ({
            ...prev,
            [i]: data.message,
          }));
        } catch (error) {
          console.error("Error checking window availability:", error);
        }
      }
    };

    checkAllWindowsAvailability();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password, windowNo);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Toaster />

      <div className="bg-white shadow-2xl shadow-green-500 rounded-lg p-6 w-full max-w-md text-center">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-green-500 mb-4">Login</h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition mb-4"
          />

          <div className="relative w-full">
            <input
              type={isHidden ? "password" : "text"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition mb-4 pr-10"
            />
            <button
              type="button"
              onClick={() => setIsHidden(!isHidden)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {isHidden ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <select
            value={windowNo}
            onChange={(e) => setWindowNo(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition mb-4"
          >
            <option disabled value="">
              Select Window Number
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option
                key={num}
                value={num}
                disabled={windowAvailability[num] === "Occupied"}
                className={
                  windowAvailability[num] === "Available"
                    ? "text-green-600"
                    : "text-gray-800"
                }
              >
                Window {num} - {windowAvailability[num] || "Checking..."}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>

          <Link
            to="/signup"
            className="block mt-4 text-center text-green-600 hover:text-green-800 font-medium"
          >
            Don't have an account?{" "}
            <span className="hover:underline hover:underline-offset-4">
              Signup
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
