import React from "react";
import logo from "../assets/bhlogo.png";
import { GrMail } from "react-icons/gr";
import { BsTelephoneFill, BsFillGeoAltFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-logo bg-[#3d9970] text-white">
      {/* Top Section */}
      <div className="p-6 md:p-12 lg:p-20 text-white flex flex-col md:flex-row justify-between gap-10">
        {/* Logo + Contact */}
        <div className="flex flex-col items-start gap-5 md:w-1/3">
          <Link to="/">
            <img src={logo} alt="Betahouse logo" className="w-32 md:w-40" />
          </Link>
          <p className="text-left w-full md:w-4/5 text-sm md:text-base text-gray-100">
            Discover, rent, and find your ideal home hassle-free with BetaHouse.
            Take control of your rental journey today!
          </p>
          <div className="contacts text-sm text-left">
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
          <div className="links flex flex-col items-start gap-4">
            <h4 className="font-bold text-lg md:text-xl text-white">
              Quick Links
            </h4>
            <Link to="/" className="cursor-pointer hover:underline text-gray-100">
              Home
            </Link>
            <Link to="/properties" className="cursor-pointer hover:underline text-gray-100">
              Properties
            </Link>
            <Link to="/about" className="cursor-pointer hover:underline text-gray-100">
              About Us
            </Link>
            <Link to="/contact" className="cursor-pointer hover:underline text-gray-100">
              Contact Us
            </Link>
            <Link to="/blog" className="cursor-pointer hover:underline text-gray-100">
              Blog
            </Link>
            <Link to="/cart" className="cursor-pointer hover:underline text-gray-100">
              Cart
            </Link>
          </div>

          <div className="links flex flex-col items-start gap-4">
            <h4 className="font-semibold text-lg md:text-xl text-white">More</h4>
            <span className="hover:underline opacity-75 cursor-not-allowed">Agents</span>
            <span className="hover:underline opacity-75 cursor-not-allowed">Affordable Houses</span>
            <Link to="/contact#FAQ" className="cursor-pointer hover:underline text-white">FAQ's</Link>
          </div>

          <div className="links flex flex-col items-start gap-4">
            <h4 className="font-semibold text-lg md:text-xl text-white">Popular Search</h4>
            <span className="opacity-75 cursor-not-allowed">Apartment for sale</span>
            <span className="opacity-75 cursor-not-allowed">Apartment for rent</span>
            <span className="opacity-75 cursor-not-allowed">3 bedroom flat</span>
            <span className="opacity-75 cursor-not-allowed">Bungalow</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#ffffff33] flex flex-col md:flex-row px-6 md:px-12 lg:px-20 pt-4 pb-8 justify-between items-center text-white text-sm md:text-base gap-3">
        <p className="text-center md:text-left">
          Copyright {new Date().getFullYear()} Betahouse | Designed by Michael.fig
        </p>
        <p className="cursor-pointer hover:underline">Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
