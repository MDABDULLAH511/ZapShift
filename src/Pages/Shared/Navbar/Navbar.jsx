import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import { FaArrowRight } from "react-icons/fa6";
import useAuth from "../../../Hooks/UseAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const handleSignOut = () => {
    signOutUser().then(() => {
      toast.success("Log out successfully");
    });
  };
  const links = (
    <>
      <li>
        <NavLink to="">Services</NavLink>
      </li>
      <li>
        <NavLink to="">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel">Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/rider">Be a Rider</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-parcels">My Parcels</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm py-5 px-8 rounded-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button
            onClick={handleSignOut}
            className="font-bold py-3 px-8 border border-[#dadada] rounded-xl hover:bg-primary cursor-pointer duration-300"
          >
            Log Out
          </button>
        ) : (
          <div className="flex items-center gap-4">
            {" "}
            <Link
              to="/login"
              className="font-bold py-3 px-8 border border-[#dadada] rounded-xl hover:bg-primary cursor-pointer duration-300"
            >
              Sign In
            </Link>
            <div className="flex items-center gap-0 group">
              <Link
                to="/rider"
                className="font-bold py-3 px-8 border border-primary rounded-xl bg-primary hover:border-[#dadada] hover:bg-transparent cursor-pointer duration-300 "
              >
                Be a rider
              </Link>

              <span className="py-3 px-3 rounded-full bg-base-200 text-primary -rotate-45 group-hover:rotate-0 duration-300">
                <FaArrowRight size={22} />
              </span>
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
