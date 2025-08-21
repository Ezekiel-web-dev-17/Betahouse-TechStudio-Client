import React from "react";
import logo from "../../utils/bhlogo.png";
import { GrMail } from "react-icons/gr";
import { BsTelephoneFill, BsFillGeoAltFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-logo">
      <div className="p-20 py-15 text-white flex justify-between">
        <div className="flex flex-col items-start gap-5">
          <img src={logo} alt="" />
          <p className="text-start w-4/5">
            Discover, rent, and find your ideal home hassle-free with BetaHouse.
            Take control of your rental journey today!
          </p>
          <div className="contacts">
            <span className="flex items-center gap-2 locate mb-3">
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
        <div className="menu flex justify-between w-full">
          <div className="links flex flex-col items-start gap-4">
            <h4 className="font-semibold text-xl opacity-50">Quick Links</h4>
            <Link to="/" className="cursor-pointer opacity-100">
              Home
            </Link>
            <Link to="/properties" className="cursor-pointer opacity-100">
              Properties
            </Link>
            <a className="cursor-not-allowed opacity-50" aria-disabled="true">
              About
            </a>
            <a className="cursor-not-allowed opacity-50" aria-disabled="true">
              Contact Us
            </a>
            <a className="cursor-not-allowed opacity-50" aria-disabled="true">
              Blog
            </a>
          </div>
          <div className="links flex flex-col items-start gap-4 opacity-50">
            <h4 className="font-semibold text-xl">More</h4>
            <a className="cursor-not-allowed" aria-disabled="true">
              Agents
            </a>
            <a className="cursor-not-allowed" aria-disabled="true">
              Affordable Houses
            </a>
            <a className="cursor-not-allowed" aria-disabled="true">
              FAQ's{" "}
            </a>
          </div>
          <div className="links flex flex-col items-start gap-4 opacity-50">
            <h4 className="font-semibold text-xl">Popular Search</h4>
            <a className="cursor-not-allowed ">Apartment for sale</a>
            <a className="cursor-not-allowed ">Apartment for rent</a>
            <a className="cursor-not-allowed" aria-disabled="true">
              3 bedroom flat
            </a>
            <a className="cursor-not-allowed" aria-disabled="true">
              Bungalow
            </a>
          </div>
        </div>
      </div>
      <div className="border-t-4 border-[#6f6f6f33] flex px-36 pt-4 pb-10 justify-between items-center text-white">
        <p>Copyright 2023 Betahouse | Designed by Michael.fig</p>
        <p>Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
