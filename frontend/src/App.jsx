import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Frown } from "lucide-react";
// pages
import CustomerNumber from "./pages/CustomerNumber";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TellerDashboard from "./pages/TellerDashboard";

//components
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CustomerNumber />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teller" element={<TellerDashboard />} />

          {/* 404 Page Not Found */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center bg-gray-100 h-screen">
                <Frown className="text-green-500" size={125} />
                <h1 className="text-6xl font-bold text-green-500 mb-2">404</h1>
                <p className="text-gray-700 text-xl mb-6">Page not found</p>
                <Link
                  to="/"
                  className="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-600 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
