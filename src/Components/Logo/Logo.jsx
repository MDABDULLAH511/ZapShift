import React from "react";
import logo from "../../assets/logo.png";

const Logo = ({ className }) => {
  return (
    <div className="flex items-end gap-0">
      <img src={logo} alt="" />
      <h3
        className={`font-extrabold text-[32px] text-[#303030] -ms-2.5 leading-none ${className}`}
      >
        ZapShift
      </h3>
    </div>
  );
};

export default Logo;
