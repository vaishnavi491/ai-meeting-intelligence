import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import AuthProvider from "./context/authContext";
import ThemeProvider from "./context/ThemeContext";


// ENABLE DARK MODE
document.documentElement.classList.add("dark");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Toaster position="top-right" />

    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>

  </React.StrictMode>
);