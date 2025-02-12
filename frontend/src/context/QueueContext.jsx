import React, { createContext, useState, useEffect } from "react";

export const QueueContext = createContext();

const QueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);

  const fetchQueue = async () => {
    try {
      const response = await fetch("http://localhost:5000/queue");
      const data = await response.json();
      setQueue(data);
    } catch (error) {
      console.error("Error fetching queue data:", error);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <QueueContext.Provider value={{ queue, fetchQueue }}>
      {children}
    </QueueContext.Provider>
  );
};

export default QueueProvider;
