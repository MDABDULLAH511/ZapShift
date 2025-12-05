import React from "react";
import { AiOutlineLinkedin } from "react-icons/ai";
import { BiSolidQuoteAltRight } from "react-icons/bi";

const ReviewCard = ({ review }) => {
  const {
    userName,
    review: reviewtext,
    user_photoURL,
    title = "Senior Product Designer",
  } = review;
  return (
    <div className="card bg-base-100  rounded-2xl overflow-hidden p-8 ">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="">
            <span className=" text-[#C3DFE2] ">
              <BiSolidQuoteAltRight size={35} />
            </span>
            <p className="text-gray-700 text-sm leading-relaxed mt-5">
              {reviewtext}
            </p>
          </div>

          <div className="border-t-2 border-[#03464D]/50 border-dashed my-6" />

          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-14 rounded-full ring ring-white ring-offset-2 ring-offset-gray-100 overflow-hidden">
                <img src={user_photoURL} alt={userName} />
              </div>
            </div>

            <div>
              <div className="font-semibold text-gray-900">{userName}</div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span>{title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
