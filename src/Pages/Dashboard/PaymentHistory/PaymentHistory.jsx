import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // data load using transtack
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="font-extrabold text-2xl my-10">
        Payment History: ({payments.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Paid At</th>
              <th>transaction Id</th>
              <th>Tracking Id</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {payments.map((payment, ind) => (
              <tr key={ind}>
                <th>{ind + 1}</th>
                <td>{payment.parcelName}</td>
                <td>{payment.amount}</td>
                <td>{payment.paidAt}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.trackingId}</td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
