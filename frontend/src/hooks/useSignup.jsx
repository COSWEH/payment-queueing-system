import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-hot-toast";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (username, password, window_no) => {
    setIsLoading(true);
    setError(null);

    if (!username.trim() || !password.trim() || !window_no.trim()) {
      toast.error("All fields are required");
      setIsLoading(false);
      return;
    }

    const response = await fetch("http://localhost:5000/teller/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, window_no }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);

      if (json.error === "Username already exists") {
        toast.error("Username already exists, please choose another one.");
      } else {
        toast.error(json.error || "Signup failed");
      }
      return;
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      toast.success("Signup successful!");
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
