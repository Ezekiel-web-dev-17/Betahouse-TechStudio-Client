import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { BsPerson, BsCart3 } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import logo from "../assets/bhlogo.png";
import { CartContext } from "../CartContext";

const NavBar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuBtn, setMenuBtn] = useState(true);
  const { cartCount } = useContext(CartContext);

  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const firstname =
    sessionStorage.getItem("firstName") || localStorage.getItem("firstName");
  const lastname =
    sessionStorage.getItem("lastName") || localStorage.getItem("lastName");
  const user = { firstname, lastname };
  const isAuthenticated = !!(token || firstname);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setLoggedIn(false);
    setOpenMenu(false);
    setMenuBtn(true);
    window.location.href = "/";
  };

  return (
    <div className="w-full">
      {/* Desktop Navigation */}
      <nav className="hidden [@media(min-width:900px)]:flex w-full max-w-screen px-10 lg:px-16 py-6 fixed top-0 items-center justify-between z-30 backdrop-blur-md bg-[#1d293f]/80 border-b border-white/10">
        <Link to="/">
          <img className="min-w-[150px] h-9 object-contain" src={logo} alt="Betahouse logo" />
        </Link>

        <ul className="flex gap-x-8 text-[0.95rem] font-medium text-white text-nowrap items-center">
          <Link
            to="/"
            className={`transition hover:text-[#85e3b5] ${
              location.pathname === "/"
                ? "font-bold text-[#85e3b5] underline decoration-2 underline-offset-8"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/properties"
            className={`transition hover:text-[#85e3b5] ${
              location.pathname === "/properties" || location.pathname.startsWith("/properties/")
                ? "font-bold text-[#85e3b5] underline decoration-2 underline-offset-8"
                : ""
            }`}
          >
            Properties
          </Link>
          <Link
            to="/about"
            className={`transition hover:text-[#85e3b5] ${
              location.pathname === "/about"
                ? "font-bold text-[#85e3b5] underline decoration-2 underline-offset-8"
                : ""
            }`}
          >
            About Us
          </Link>
          <Link
            to="/blog"
            className={`transition hover:text-[#85e3b5] ${
              location.pathname.startsWith("/blog")
                ? "font-bold text-[#85e3b5] underline decoration-2 underline-offset-8"
                : ""
            }`}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className={`transition hover:text-[#85e3b5] ${
              location.pathname === "/contact"
                ? "font-bold text-[#85e3b5] underline decoration-2 underline-offset-8"
                : ""
            }`}
          >
            Contact Us
          </Link>
        </ul>

        <div className="text-white flex items-center gap-5">
          {/* Cart Icon - Visible ONLY to signed-in users */}
          {isAuthenticated && (
            <Link
              to="/cart"
              className="relative p-2 text-white hover:text-[#85e3b5] transition"
              title="Shopping Cart"
            >
              <BsCart3 className="text-2xl" />
              <span className="absolute -top-1 -right-1 bg-[#3d9970] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            </Link>
          )}

          {firstname && lastname ? (
            <div className="flex gap-x-3 items-center relative cursor-pointer">
              <BsPerson className="text-xl" />
              <h4 className="font-semibold text-sm">
                {user.firstname} {user.lastname}
              </h4>
              <FaChevronDown
                className="text-xs"
                onClick={() => setLoggedIn(!loggedIn)}
              />
              {loggedIn && (
                <div className="absolute top-8 right-0 bg-[#1d293f] border border-white/20 rounded-xl py-2 px-4 shadow-xl z-50">
                  <button
                    onClick={handleLogout}
                    className="text-xs font-bold text-red-400 hover:text-red-300 cursor-pointer text-nowrap"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/sign-up">
                <button className="rounded-xl px-5 py-2.5 border border-white/40 hover:bg-white/10 text-white font-semibold text-sm cursor-pointer transition">
                  Sign up
                </button>
              </Link>
              <Link to="/login">
                <button className="rounded-xl px-5 py-2.5 bg-[#3d9970] hover:bg-[#327e5c] text-white font-semibold text-sm cursor-pointer shadow-md shadow-[#3d9970]/30 transition">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation Header */}
      <div className="[@media(min-width:900px)]:hidden backdrop-blur-md bg-[#1d293f]/90 border-b border-white/10 flex w-full px-5 py-3.5 fixed top-0 items-center justify-between z-30">
        <Link to="/">
          <img className="h-7 w-auto" src={logo} alt="Betahouse logo" />
        </Link>

        <div className="flex items-center gap-4">
          {/* Mobile Cart Icon - Visible ONLY to signed-in users */}
          {isAuthenticated && (
            <Link to="/cart" className="relative text-white" title="Shopping Cart">
              <BsCart3 className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-[#3d9970] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          )}

          {menuBtn && (
            <IoIosMenu
              className="text-white text-2xl cursor-pointer"
              onClick={() => {
                setOpenMenu(true);
                setMenuBtn(false);
              }}
            />
          )}
        </div>

        {/* Mobile Slide-in Drawer */}
        {openMenu && (
          <div className="fixed inset-0 top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm z-40">
            <nav className="flex flex-col fixed top-0 right-0 w-3/4 max-w-xs h-full backdrop-blur-xl bg-[#1d293f]/95 p-6 gap-6 shadow-2xl border-l border-white/10 overflow-y-auto">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <img className="h-7 w-auto" src={logo} alt="Betahouse" />
                <CgClose
                  onClick={() => {
                    setOpenMenu(false);
                    setMenuBtn(true);
                  }}
                  className="text-white text-2xl cursor-pointer"
                />
              </div>

              <ul
                className="flex flex-col gap-y-5 text-base font-medium text-white"
                onClick={() => {
                  setOpenMenu(false);
                  setMenuBtn(true);
                }}
              >
                <Link
                  to="/"
                  className={`p-2 rounded-lg transition ${
                    location.pathname === "/" ? "bg-[#3d9970] font-bold" : "hover:bg-white/10"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/properties"
                  className={`p-2 rounded-lg transition ${
                    location.pathname.startsWith("/properties") ? "bg-[#3d9970] font-bold" : "hover:bg-white/10"
                  }`}
                >
                  Properties
                </Link>
                <Link
                  to="/about"
                  className={`p-2 rounded-lg transition ${
                    location.pathname === "/about" ? "bg-[#3d9970] font-bold" : "hover:bg-white/10"
                  }`}
                >
                  About Us
                </Link>
                <Link
                  to="/blog"
                  className={`p-2 rounded-lg transition ${
                    location.pathname.startsWith("/blog") ? "bg-[#3d9970] font-bold" : "hover:bg-white/10"
                  }`}
                >
                  Blog
                </Link>
                <Link
                  to="/contact"
                  className={`p-2 rounded-lg transition ${
                    location.pathname === "/contact" ? "bg-[#3d9970] font-bold" : "hover:bg-white/10"
                  }`}
                >
                  Contact Us
                </Link>
                {/* Mobile Drawer Cart Link - Visible ONLY to signed-in users */}
                {isAuthenticated && (
                  <Link
                    to="/cart"
                    className={`p-2 rounded-lg transition flex items-center justify-between ${
                      location.pathname === "/cart" ? "bg-[#3d9970] font-bold" : "hover:bg-white/10"
                    }`}
                  >
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                )}
              </ul>

              <div className="pt-6 border-t border-white/10 mt-auto">
                {firstname && lastname ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-white font-semibold text-sm">
                      {user.firstname} {user.lastname}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl font-bold text-xs"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/sign-up"
                      onClick={() => {
                        setOpenMenu(false);
                        setMenuBtn(true);
                      }}
                      className="py-2.5 text-center text-xs font-bold text-white border border-white/30 rounded-xl"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => {
                        setOpenMenu(false);
                        setMenuBtn(true);
                      }}
                      className="py-2.5 text-center text-xs font-bold text-white bg-[#3d9970] rounded-xl"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
