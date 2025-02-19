import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QueueList from "../components/QueueList";
import { Toaster } from "react-hot-toast";

import { useAuthContext } from "../hooks/useAuthContext";

const TellerDashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined || user === null) {
      return;
    }

    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen p-4 bg-gray-50">
        <p className="text-2xl md:text-3xl lg:text-4xl text-red-600 font-semibold text-center">
          You are not authorized to view this page
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 mb-4 px-4 flex flex-col justify-center items-center min-h-screen">
      <Toaster />
      <QueueList />
    </div>
  );
};

export default TellerDashboard;
