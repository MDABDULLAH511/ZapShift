import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();

  // state for search user
  const [searchText, setSearchText] = useState("");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  //user role update btn (add)
  const handleUserRole = (user, newRole) => {
    const roleInfo = { role: newRole };

    Swal.fire({
      title: "Update User Role?",
      text: `Please confirm the role change for this user.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Update",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "center-center",
              icon: "success",
              text:
                newRole === "admin"
                  ? `${user.displayName} marked as Admin`
                  : `${user.displayName} removed from Admin`,
              showCancelButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  //   //user role update btn (remove)
  //   const handleRemoveUser = (user) => {
  //     const roleInfo = { role: "user" };
  //     axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
  //       console.log(res.data);
  //       if (res.data.modifiedCount) {
  //         refetch();
  //         Swal.fire({
  //           position: "center-center",
  //           icon: "success",
  //           text: `${user.displayName} removed from admin`,
  //           showCancelButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     });
  //   };

  return (
    <div>
      <h2 className="font-extrabold text-2xl my-10">
        Manage Users: {users.length}
      </h2>

      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          className="grow"
          placeholder="Search Users"
        />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Others Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table row */}
            {users.map((user, ind) => (
              <tr key={ind}>
                <td>
                  <h2>{ind + 1}</h2>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>
                <td>{String(user.role)}</td>

                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleUserRole(user, "user")}
                      className="btn bg-red-500"
                    >
                      <FiShieldOff size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUserRole(user, "admin")}
                      className="btn bg-green-400"
                    >
                      <FaUserShield size={18} />
                    </button>
                  )}
                </td>

                <th>Actions</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
