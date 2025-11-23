import React from "react";
import Logo from "../Components/Logo/Logo";
import { Outlet } from "react-router";
import authPageImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div
      className="bg-linear-to-r from-white from-50% to-[#FAFDF0] to-50%
 h-screen flex flex-col"
    >
      <div className="max-w-7xl mx-auto py-8 w-full">
        <Logo />
      </div>

      <div className="max-w-7xl mx-auto flex-1 flex items-center gap-6 w-full">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div className="flex-1">
          <img src={authPageImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
