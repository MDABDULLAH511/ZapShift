import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.riderEmail };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          text: `Rider status is set to ${status}`,
          showCancelButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Rider approved status
  const handleApproval = (rider) => {
    updateRiderStatus(rider, "Approved");
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "Rejected");
  };

  return (
    <div>
      <h2 className="font-extrabold text-2xl my-10">
        Rider Pending Approval: {riders.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>License Number</th>
              <th>Application Status </th>
              <th>Work Status </th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td>{rider.riderLicenseNumber}</td>
                <td>
                  {
                    <p
                      className={`font-bold ${
                        rider.status === "Approved"
                          ? "text-green-800"
                          : rider.status === "Rejected"
                          ? "text-red-600"
                          : "text-black"
                      }`}
                    >
                      {" "}
                      {rider.status}
                    </p>
                  }
                </td>
                <td>{rider.workStatus}</td>
                <td>
                  <button className="btn">
                    <FaEye />
                  </button>
                  <button onClick={() => handleApproval(rider)} className="btn">
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button className="btn">
                    <FaTrash />
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

export default ApproveRiders;
