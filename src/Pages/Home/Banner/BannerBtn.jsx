import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router";

const BannerBtn = ({ className }) => {
  return (
    <div className={`flex gap-4 absolute z-99 left-20 ${className}`}>
      <div className="flex items-center gap-0 group ">
        <a className="font-bold py-3 px-8 border-2 border-primary rounded-xl bg-primary hover:border-[#dadada] hover:bg-white cursor-pointer duration-300 ">
          Track Your Parcel
        </a>

        <span className="py-3 px-3 rounded-full bg-base-200 text-primary -rotate-45 group-hover:rotate-0 duration-300">
          <FaArrowRight size={22} />
        </span>
      </div>

      <Link
        to="/rider"
        className="font-bold py-3 px-8 border-2 border-[#dadada] rounded-xl hover:bg-primary cursor-pointer duration-300"
      >
        Be A Rider
      </Link>
    </div>
  );
};

export default BannerBtn;
