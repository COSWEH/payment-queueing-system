import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

//context
import QueueProvider from "./context/QueueContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <QueueProvider>
        <App />
      </QueueProvider>
    </AuthContextProvider>
  </StrictMode>
);
