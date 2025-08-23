import React from "react";
import logo from "../assets/bhlogo.png";
import { GrMail } from "react-icons/gr";
import { BsTelephoneFill, BsFillGeoAltFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-logo bg-[#3d9970]">
      {/* Top Section */}
      <div className="p-6 md:p-12 lg:p-20 text-white flex flex-col md:flex-row justify-between gap-10">
        {/* Logo + Contact */}
        <div className="flex flex-col items-start gap-5 md:w-1/3">
          <img src={logo} alt="Betahouse logo" className="w-32 md:w-40" />
          <p className="text-center lg:text-start w-full md:w-4/5 text-sm md:text-base">
            Discover, rent, and find your ideal home hassle-free with BetaHouse.
            Take control of your rental journey today!
          </p>
          <div className="contacts text-sm text-center lg:text-start">
            <span className="flex items-center gap-2 mb-3">
              <BsFillGeoAltFill />
              <p className="mb-0">95 Tinubu Estate, Lekki, Lagos</p>
            </span>
            <span className="flex items-center gap-2 mb-3">
              <BsTelephoneFill />
              <p className="mb-0">+234 675 8935 675</p>
            </span>
            <span className="flex items-center gap-2 mb-3">
              <GrMail />
              <p className="mb-0">support@rentbetahouse.com</p>
            </span>
          </div>
        </div>

        {/* Menu Links */}
        <div className="menu flex flex-col sm:flex-row justify-between w-full md:w-2/3 gap-10 sm:gap-20">
          <div className="links flex flex-col lg:items-start items-center gap-4">
            <h4 className="font-semibold text-lg md:text-xl opacity-50">
              Quick Links
            </h4>
            <Link to="/" className="cursor-pointer">
              Home
            </Link>
            <Link to="/properties" className="cursor-pointer">
              Properties
            </Link>
            <a className="cursor-not-allowed opacity-50">About</a>
            <a className="cursor-not-allowed opacity-50">Contact Us</a>
            <a className="cursor-not-allowed opacity-50">Blog</a>
          </div>

          <div className="links flex flex-col lg:items-start items-center gap-4 opacity-50">
            <h4 className="font-semibold text-lg md:text-xl">More</h4>
            <a className="cursor-not-allowed">Agents</a>
            <a className="cursor-not-allowed">Affordable Houses</a>
            <a className="cursor-not-allowed">FAQ's</a>
          </div>

          <div className="links flex flex-col lg:items-start items-center gap-4 opacity-50">
            <h4 className="font-semibold text-lg md:text-xl">Popular Search</h4>
            <a className="cursor-not-allowed">Apartment for sale</a>
            <a className="cursor-not-allowed">Apartment for rent</a>
            <a className="cursor-not-allowed">3 bedroom flat</a>
            <a className="cursor-not-allowed">Bungalow</a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#ffffff33] flex flex-col md:flex-row px-6 md:px-12 lg:px-36 pt-4 pb-10 justify-between items-center text-white text-sm md:text-base gap-3">
        <p className="text-center md:text-left">
          Copyright 2023 Betahouse | Designed by Michael.fig
        </p>
        <p className="cursor-pointer hover:underline">Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
