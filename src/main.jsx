/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./layouts/Auth/AuthContext"; // Adjust the import path as necessary
// import { ThemeProvider } from "@material-tailwind/react"; // Uncomment if using Material Tailwind

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      {/* Uncomment the ThemeProvider if you're using Material Tailwind */}
      {/* <ThemeProvider> */}
      <App />
      {/* </ThemeProvider> */}
    </AuthProvider>
  </Router>
);
