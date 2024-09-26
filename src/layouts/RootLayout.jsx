// The application layouts go here
// Navbar, Sidebar, Footer

// eslint-disable-next-line no-unused-vars
import React from "react";
import Footer from "./footer/Footer";
import Navbar from "./header/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <main>
      <Toaster />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default RootLayout;