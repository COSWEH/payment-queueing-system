import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Queue = ({ number, name, status, window_no, showToast }) => {
  const [buttonState, setButtonState] = useState({
    next: { text: "Next", disabled: false },
    reserve: { text: "Reserve", disabled: false },
    complete: { text: "Complete", disabled: false },
    recall: { text: "Recall", disabled: false },
  });

  const { user } = useAuthContext();

  const handleUpdateQueue = async (newStatus, buttonKey, loadingText) => {
    // Disable the button and change its text
    setButtonState((prev) => ({
      ...prev,
      [buttonKey]: { text: loadingText, disabled: true },
    }));

    try {
      const response = await fetch(`http://localhost:5000/queue`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          queue_number: number,
          status: newStatus,
          teller_id: user.id,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        showToast.success(result.message);
      } else {
        showToast.error("Error updating the queue");
      }
    } catch (err) {
      console.error("Error updating queue:", err);
      showToast.error("Error updating the queue");
    } finally {
      // After completion, reset the button state
      setTimeout(() => {
        setButtonState((prev) => ({
          ...prev,
          [buttonKey]: {
            text: buttonKey.charAt(0).toUpperCase() + buttonKey.slice(1),
            disabled: false,
          },
        }));
      }, 2500);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs text-center border-t-3 border-green-400">
      {status === "serving" && window_no && (
        <p className="text-sm font-semibold text-white bg-green-400 rounded-xl p-1">
          Please proceed to Window No. {window_no}
        </p>
      )}

      <h2 className="text-xl font-bold text-green-700">{name}</h2>
      <p className="text-4xl font-semibold text-green-700 mt-2">{number}</p>

      {user && (
        <div className="mt-4 space-y-2">
          {status === "waiting" && (
            <button
              onClick={() =>
                handleUpdateQueue("serving", "next", "Processing...")
              }
              disabled={buttonState.next.disabled}
              className={`w-full text-lg py-2 rounded-lg transition ${
                buttonState.next.disabled
                  ? "bg-green-400"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {buttonState.next.text}
            </button>
          )}

          {status === "serving" && (
            <div className="flex gap-4">
              <button
                onClick={() =>
                  handleUpdateQueue("reserve", "reserve", "Reserving...")
                }
                disabled={buttonState.reserve.disabled}
                className={`w-full text-lg py-2 rounded-lg transition ${
                  buttonState.reserve.disabled
                    ? "bg-green-400"
                    : "bg-green-800 hover:bg-green-700 text-white"
                }`}
              >
                {buttonState.reserve.text}
              </button>

              <button
                onClick={() =>
                  handleUpdateQueue("completed", "complete", "Completing...")
                }
                disabled={buttonState.complete.disabled}
                className={`w-full text-lg py-2 rounded-lg transition ${
                  buttonState.complete.disabled
                    ? "bg-green-400"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {buttonState.complete.text}
              </button>
            </div>
          )}

          {status === "reserve" && (
            <button
              onClick={() =>
                handleUpdateQueue("serving", "recall", "Recalling...")
              }
              disabled={buttonState.recall.disabled}
              className={`w-full text-lg py-2 rounded-lg transition ${
                buttonState.recall.disabled
                  ? "bg-green-400"
                  : "bg-green-800 hover:bg-green-700 text-white"
              }`}
            >
              {buttonState.recall.text}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Queue;
