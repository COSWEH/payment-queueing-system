import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center bg-gray-200 h-screen">
                <div className="text-center text-white bg-orange-500 p-6 rounded-md shadow-lg">
                  <Link to="/" className="font-extrabold text-xl">
                    Go back
                  </Link>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
