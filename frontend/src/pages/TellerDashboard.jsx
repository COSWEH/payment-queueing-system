import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QueueList from "../components/QueueList";
import { Toaster } from "react-hot-toast";

import { useAuthContext } from "../hooks/useAuthContext";

const TellerDashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === undefined || user === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
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
