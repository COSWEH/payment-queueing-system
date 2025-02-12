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
  }, [user]);

  const waitingQueue = queue?.filter((item) => item.status === "waiting") || [];
  const servingQueue =
    queue?.filter(
      (item) =>
        item.status === "serving" &&
        (teller_id ? item.teller_id === teller_id : true)
    ) || [];

  const reserveQueue = teller_id
    ? queue?.filter(
        (item) => item.status === "reserve" && item.teller_id === teller_id
      ) || []
    : [];

  // Dynamically adjust grid columns based on available sections
  const gridCols = teller_id
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2";

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div
        className={`grid ${gridCols} gap-8 w-full max-w-5xl mx-auto text-center`}
      >
        {/* Waiting Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold uppercase mb-4 text-green-600">
            Waiting
          </h2>
          <div className="space-y-4 w-full flex flex-col items-center">
            {waitingQueue.length > 0 ? (
              waitingQueue.map((item) => (
                <Queue
                  key={item.queue_number}
                  name={item.name}
                  number={item.queue_number}
                  status={item.status}
                  window_no={item.window_no}
                  showToast={toast}
                />
              ))
            ) : (
              <p className="text-gray-500">No waiting customers</p>
            )}
          </div>
        </div>

        {/* Serving Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold uppercase mb-4 text-green-600">
            Serving
          </h2>
          <div className="space-y-4 w-full flex flex-col items-center">
            {servingQueue.length > 0 ? (
              servingQueue.map((item) => (
                <Queue
                  key={item.queue_number}
                  name={item.name}
                  number={item.queue_number}
                  status={item.status}
                  window_no={item.window_no}
                  showToast={toast}
                />
              ))
            ) : (
              <p className="text-gray-500">No one is being served</p>
            )}
          </div>
        </div>

        {/* Reserve Section (Only for Logged-in Users) */}
        {teller_id && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold uppercase mb-4 text-green-800">
              Reserve
            </h2>
            <div className="space-y-4 w-full flex flex-col items-center">
              {reserveQueue.length > 0 ? (
                reserveQueue.map((item) => (
                  <Queue
                    key={item.queue_number}
                    name={item.name}
                    number={item.queue_number}
                    status={item.status}
                    window_no={item.window_no}
                    showToast={toast}
                  />
                ))
              ) : (
                <p className="text-green-500">No reserved customers</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QueueList;
