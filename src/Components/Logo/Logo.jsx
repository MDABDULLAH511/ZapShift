import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = ({ className }) => {
  return (
    <Link to="/" className="flex items-end gap-0">
      <img src={logo} alt="" />
      <h3
        className={`font-extrabold text-[32px] text-[#303030] -ms-2.5 leading-none ${className}`}
      >
        ZapShift
      </h3>
    </Link>
  );
};

export default Logo;
