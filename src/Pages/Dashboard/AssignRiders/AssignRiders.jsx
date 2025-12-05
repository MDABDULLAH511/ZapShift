import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  console.log("Selected parcel:", selectedParcel?.senderDistrict);
  //molad
  const riderModalRef = useRef();

  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ["parcels", "parcel_paid"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?deliveryStatus=parcel_paid`);
      return res.data;
    },
  });
  const { data: riders = [] } = useQuery({
    queryKey: [
      "riders",
      selectedParcel?.senderDistrict,
      "Approved",
      "Available",
    ],
    enabled: !!selectedParcel?.senderDistrict,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=Approved&riderDistrict=${selectedParcel?.senderDistrict}&workStatus=Available`
      );
      console.log(res.data);
      return res.data;
    },
  });

  //handle open assign rider modal
  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);

    riderModalRef.current.showModal();
  };

  //Handel Assign Rider
  const handelAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.riderEmail,
      riderName: rider.riderName,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          riderModalRef.current.close();
          parcelsRefetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            text: `Rider has been assign`,
            showCancelButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h2 className="font-extrabold text-2xl my-10">
        Assign Riders: {parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Tracking Id</th>
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
                <td>{parcel.trackingId}</td>
                <td>
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-primary text-black"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Riders: {riders.length}</h3>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, ind) => (
                  <tr key={ind}>
                    <th>{ind + 1}</th>
                    <td>{rider.riderName}</td>
                    <td>{rider.riderEmail}</td>
                    <td>
                      <button
                        onClick={() => handelAssignRider(rider)}
                        className="btn btn-primary text-black"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
