import React, { useState, useEffect } from "react";
import Queue from "./Queue";
import { useContext } from "react";
import { QueueContext } from "../context/QueueContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-hot-toast";

const QueueList = () => {
  const { queue, fetchQueue } = useContext(QueueContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuthContext();
  const teller_id = user?.id || null;

  useEffect(() => {
    const getQueueData = async () => {
      try {
        await fetchQueue();
      } catch (err) {
        setError("Failed to fetch queue data");
      } finally {
        setLoading(false);
      }
    };
    getQueueData();
  }, []);

  let waitingQueue = [];
  let servingQueue = [];
  let reserveQueue = [];

  if (teller_id === null) {
    waitingQueue = queue?.filter((item) => item.status === "waiting") || [];
    servingQueue = queue?.filter((item) => item.status === "serving") || [];
    reserveQueue = queue?.filter((item) => item.status === "reserve") || [];
  } else {
    waitingQueue = queue?.filter((item) => item.status === "waiting") || [];
    servingQueue =
      queue?.filter(
        (item) => item.status === "serving" && item.teller_id === teller_id
      ) || [];
    reserveQueue =
      queue?.filter(
        (item) => item.status === "reserve" && item.teller_id === teller_id
      ) || [];
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mx-auto text-center">
        {/* Waiting Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold uppercase mb-4 text-orange-600">
            Waiting
          </h2>
          <div className="space-y-4 w-full flex flex-col items-center">
            {waitingQueue.map((item) => (
              <Queue
                key={item.queue_number}
                name={item.name}
                number={item.queue_number}
                status={item.status}
                window_no={item.window_no}
                showToast={toast}
              />
            ))}
          </div>
        </div>

        {/* Serving Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold uppercase mb-4 text-green-600">
            Serving
          </h2>
          <div className="space-y-4 w-full flex flex-col items-center">
            {servingQueue.map((item) => (
              <Queue
                key={item.queue_number}
                name={item.name}
                number={item.queue_number}
                status={item.status}
                window_no={item.window_no}
                showToast={toast}
              />
            ))}
          </div>
        </div>

        {/* Reserve Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold uppercase mb-4 text-blue-600">
            Reserve
          </h2>
          <div className="space-y-4 w-full flex flex-col items-center">
            {reserveQueue.map((item) => (
              <Queue
                key={item.queue_number}
                name={item.name}
                number={item.queue_number}
                status={item.status}
                window_no={item.window_no}
                showToast={toast}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QueueList;
