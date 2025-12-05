import React from "react";
import SharedSectionHeader from "../../../Components/SharedSectionHeader/SharedSectionHeader";
import picupImg from "../../../assets/bookingIcon.png";

const HowWork = () => {
  return (
    <div className="pt-10 pb-20">
      {/* Section Header */}
      <SharedSectionHeader
        title="How it Works"
        titleClass="text-secondary"
        align="left"
      ></SharedSectionHeader>

      <div className="grid grid-cols-4 gap-6 ">
        <div className="p-5 bg-white rounded-xl">
          <img src={picupImg} alt="" />
          <h4 className="text-[20px] font-bold text-secondary py-2">
            Booking Pick & Drop
          </h4>
          <p>
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        <div className="p-5 bg-white rounded-xl">
          <img src={picupImg} alt="" />
          <h4 className="text-[20px] font-bold text-secondary py-2">
            Cash On Delivery
          </h4>
          <p>
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        <div className="p-5 bg-white rounded-xl">
          <img src={picupImg} alt="" />
          <h4 className="text-[20px] font-bold text-secondary py-2">
            Delivery Hub
          </h4>
          <p>
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        <div className="p-5 bg-white rounded-xl">
          <img src={picupImg} alt="" />
          <h4 className="text-[20px] font-bold text-secondary py-2">
            Booking SME & Corporate
          </h4>
          <p>
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowWork;
