import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSipper from "../../../Components/LoadingSpinner/LoadingSipper";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSipper />;
  }

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
      trackingId: parcel.trackingId,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  return (
    <div>
      <h2>
        Please Pay ${parcel.cost} for {parcel.parcelName}
      </h2>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
