import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { NavLink } from "react-router";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  const links = (
    <>
      <li>
        <NavLink to="">Services</NavLink>
      </li>
      <li>
        <NavLink to="">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="">About Us</NavLink>
      </li>
      <li>
        <NavLink to="">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="">Blog</NavLink>
      </li>
      <li>
        <NavLink to="">Contact</NavLink>
      </li>
    </>
  );
  return (
    <footer className="footer footer-horizontal footer-center bg-black p-20 rounded-4xl text-[#DADADA]">
      {/* Footer logo and text */}
      <aside>
        <Logo className={`text-white`}></Logo>
        <p className="max-w-3/4 my-2">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </aside>

      {/* Footer menu */}
      <div className="py-5 border-y border-dashed border-primary/20 w-full">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Social Media Link */}
      <div>
        <ul className="flex gap-3 text-[#0b0b0b]">
          <li className="icon bg-linear-to-r from-[#0575B3] to-[#2489BE]">
            <FaLinkedinIn size={18} />
          </li>
          <li className="icon bg-white">
            <FaXTwitter size={18} />
          </li>
          <li className="icon bg-linear-to-r from-[#00B2FF] to-[#006AFF] ">
            <FaFacebookF size={18} color="#ffffff" />
          </li>
          <li className="icon bg-[#FF0000]">
            <FaYoutube size={18} color="#ffffff" />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
