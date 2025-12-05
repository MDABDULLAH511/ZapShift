import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "Rider_Assign"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=Rider_Assign`
      );
      console.log(res.data);
      return res.data;
    },
  });

  //handle  Delivery Status Update
  const handleDeliveryStatusUpdate = (parcel, status) => {
    const updateStatusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    let message = `Parcel status is updated with ${status
      .split("_")
      .join(" ")}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, updateStatusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            text: message,
            showCancelButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h2 className="font-extrabold text-2xl my-10">
        Parcels Pending Pickup: {parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Receiver District</th>
              <th>Confirm</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.receiverDistrict}</td>
                  <td>
                    {parcel.deliveryStatus === "Rider_Assign" ? (
                      <>
                        <button
                          onClick={() =>
                            handleDeliveryStatusUpdate(parcel, "Rider_Arriving")
                          }
                          className="btn btn-primary text-black me-2 "
                        >
                          Accept
                        </button>
                        <button className="btn btn-warning text-black">
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>Accepted</span>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                      }
                      className="btn btn-primary text-black me-2 "
                    >
                      Mark as Picked Up
                    </button>
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                      }
                      className="btn btn-primary text-black "
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
