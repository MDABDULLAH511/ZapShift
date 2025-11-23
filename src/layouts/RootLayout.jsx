import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="bg-[#ebecee] py-8">
      <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
