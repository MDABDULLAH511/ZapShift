import React from "react";
import { Link } from "react-router";

const paymentCancelled = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <h2 className="text-2xl ">Payment is Cancelled Please try again</h2>
      <Link to="/dashboard/my-parcels">
        {" "}
        <button className="btn btn-primary text-black">Try Again</button>
      </Link>
    </div>
  );
};

export default paymentCancelled;
