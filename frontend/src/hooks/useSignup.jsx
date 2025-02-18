import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const signup = async (username, password) => {
    setIsLoading(true);

    if (!username.trim() || !password.trim()) {
      toast.error("All fields are required");
      setIsLoading(false);
      return;
    }

    const response = await fetch("http://localhost:5000/teller/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
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
      toast.success("Signup successful!");
      setIsLoading(false);
      navigate("/login");
    }
  };

  return { signup, isLoading };
};
