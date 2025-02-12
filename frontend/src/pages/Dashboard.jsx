import React from "react";
import QueueList from "../components/QueueList";

const Dashboard = () => {
  return (
    <div className="mt-4 mb-4 px-4 flex flex-col justify-center items-center min-h-screen">
      <QueueList />
    </div>
  );
};

export default Dashboard;
