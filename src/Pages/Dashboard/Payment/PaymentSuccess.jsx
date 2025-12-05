import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl ">Payment Received</h2>
      <p>
        <b>Your transaction Id: </b>
        {paymentInfo.transactionId}
      </p>
      <p>
        <b>Your tracking Id: </b> {paymentInfo.trackingId}
      </p>
    </div>
  );
};

export default PaymentSuccess;
