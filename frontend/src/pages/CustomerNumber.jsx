import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const CustomerNumber = () => {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [success, setSuccess] = useState("");

  const fetchLatestQueue = async () => {
    try {
      const response = await fetch("http://localhost:5000/queue/number", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch latest queue data");
      }

      const latestData = await response.json();

      setNumber(latestData.queue_number || 0);
      setDisplayName(latestData.name || "");
    } catch (err) {
      console.error("Error fetching latest queue data:", err);
    }
  };

  useEffect(() => {
    fetchLatestQueue();
  }, []);

  const handleGetNumber = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("Please enter your name first!");
      return;
    }

    const newNumber = parseInt(number, 10) + 1;

    console.log(newNumber);

    const data = { name, number: newNumber };

    try {
      const response = await fetch("http://localhost:5000/queue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.error || "An error occurred during submission");
      }

      toast.success(`Your number is ${newNumber}`);
      setNumber(newNumber);
      setDisplayName(name);
      setName("");
      setSuccess(res.data || "Queue updated successfully");
    } catch (err) {
      toast.error(err.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Toaster position="top-right" />
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <form onSubmit={handleGetNumber}>
          <h1 className="text-3xl font-bold text-orange-500 mb-4">
            Get Your Number
          </h1>

          {success && <p className="text-green-500 mb-2">{success}</p>}

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition mb-4"
          />

          <button
            onClick={handleGetNumber}
            className="w-full text-lg py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Get Number
          </button>
        </form>

        {displayName && (
          <p className="mt-4 text-lg font-semibold text-orange-500">
            <span className="text-sm">Latest Queue Name:</span> {displayName}
          </p>
        )}
        {number !== 0 && (
          <p className="mt-4 text-lg font-semibold text-orange-500">
            <span className="text-sm">Latest Queue Number:</span> {number}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerNumber;
