import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="bg-white shadow-2xl shadow-green-500 rounded-lg p-6 w-full max-w-md text-center">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-green-500 mb-4">Signup</h1>

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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Signup
          </button>

          <Link
            to="/login"
            className="block mt-4 text-center text-green-600 hover:text-green-800 font-medium"
          >
            Already have an account?{" "}
            <span className="hover:underline hover:underline-offset-4">
              Login
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
