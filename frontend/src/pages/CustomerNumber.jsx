import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserRound, Hash } from "lucide-react";

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
      <Toaster />
      <div className="bg-white shadow-2xl shadow-green-500 rounded-lg p-6 w-full max-w-md text-center">
        <form onSubmit={handleGetNumber}>
          <h1 className="text-3xl font-bold text-green-500 mb-4">
            Get Your Number
          </h1>

          {success && <p className="text-green-500 mb-2">{success}</p>}

          <div className="relative mb-4">
            <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <button
            onClick={handleGetNumber}
            className="w-full text-lg py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
          >
            Get Number
            <Hash className="h-5 w-5" />
          </button>
        </form>

        {displayName && (
          <div className="mt-4 p-2 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-green-600">Latest Queue Name:</p>
              <UserRound className="h-6 w-6 text-green-500" />
              <span className="text-2xl font-semibold text-green-500">
                {displayName}
              </span>
            </div>
          </div>
        )}
        {number !== 0 && (
          <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-green-600">
                Latest Queue Number:
              </p>
              <Hash className="h-6 w-6 text-green-500" />
              <span className="text-2xl font-semi text-green-500">
                {number}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerNumber;
