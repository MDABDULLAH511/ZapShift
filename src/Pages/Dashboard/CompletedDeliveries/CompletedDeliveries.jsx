import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "Rider_Assign"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`
      );
      console.log(res.data);
      return res.data;
    },
  });

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };

  return (
    <div>
      <h2 className="font-extrabold text-2xl my-10">
        My Completed Deliveries:{parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Pickup District</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table row */}
            {parcels.map((parcel, ind) => (
              <tr key={ind}>
                <th>{ind + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{calculatePayout(parcel)}</td>
                <td>
                  <button className="btn btn-primary text-black">
                    Cash Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
