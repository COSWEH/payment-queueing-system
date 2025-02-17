import { useAuthContext } from "./useAuthContext";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async (id) => {
    const response = await fetch("http://localhost:5000/teller/logout", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error || "Logout failed");
      return;
    }

    if (response.ok) {
      toast.success("Logout successful!");
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    }
  };

  return { logout };
};
