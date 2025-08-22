import { IoIosMenu } from "react-icons/io";
import logo from "../../utils/bhlogo.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { BsPerson } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";

const NavBar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuBtn, setMenuBtn] = useState(true);
  const user = localStorage.getItem("user");
  const userParsed = JSON.parse(user);
  return (
    <div className="">
      <nav className="hidden [@media(min-width:900px)]:flex w-full max-w-screen px-15 py-8 fixed top-0 items-center justify-between z-20">
        <Link to="/">
          <img className="min-w-[172px]" width="80%" src={logo} alt="" />
        </Link>

        <ul className="flex gap-x-7 text-[.9rem] font-medium text-white text-nowrap min-w-1/2">
          <Link
            to="/"
            className={`${
              location.pathname === "/"
                ? "underline decoration-1 underline-offset-10"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/properties"
            className={`${
              location.pathname === "/properties"
                ? "underline decoration-1 underline-offset-10"
                : ""
            }`}
          >
            Properties
          </Link>
          <Link className="cursor-not-allowed opacity-55" aria-disabled="true">
            About Us
          </Link>
          <Link className="cursor-not-allowed opacity-55" aria-disabled="true">
            Blog
          </Link>
          <Link className="cursor-not-allowed opacity-55" aria-disabled="true">
            Contact Us
          </Link>
        </ul>

        <div className="text-white  flex gap-5">
          {user && (
            <div className="flex gap-x-3 items-center max-h-5 relative">
              <BsPerson />
              <h4>
                {`${userParsed.firstName} `} {`${userParsed.lastName}`}
              </h4>
              <FaChevronDown
                onClick={() =>
                  loggedIn ? setLoggedIn(false) : setLoggedIn(true)
                }
              />
              {loggedIn && (
                <button
                  onClick={() => {
                    setLoggedIn(false);
                    localStorage.clear();
                  }}
                  className="rounded-xl px-2 py-1 auth-btn cursor-pointer text-nowrap bg-red-500 absolute top-7 left-7"
                >
                  LogOut
                </button>
              )}
            </div>
          )}
          {!user && (
            <div className=" flex gap-5">
              <Link to="/sign-up" className="me-6">
                <button
                  className="rounded-xl px-[20%] py-[9%] border-1 auth-btn cursor-pointer text-nowrap"
                  style={{ minWidth: "100%" }}
                >
                  Sign up
                </button>
              </Link>
              <Link to="/login">
                <button
                  className="min-w-3/5 rounded-xl px-[20%] py-[15%] border-0 auth-btn text-logo cursor-pointer"
                  style={{ minWidth: "100%" }}
                >
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className="[@media(min-width:900px)]:hidden backdrop-blur-sm flex w-full min-w-screen ps-5 py-2 fixed top-0 items-center justify-between z-20 bg-[#1d293f1f]">
        <Link to="/">
          <img width="50%" src={logo} alt="" />
        </Link>
        {menuBtn && (
          <IoIosMenu
            className="text-white me-5"
            onClick={() => {
              setOpenMenu(true);
              setMenuBtn(false);
            }}
          />
        )}
        {openMenu && (
          <div className="relative">
            <nav className="flex flex-col absolute -top-7 backdrop-blur-md bg-[#3d9970]/90  -right-1/12 min-w-50 min-h-screen  gap-4">
              <CgClose className="text-white place-self-end mt-5 me-4" />
              <ul
                className="flex flex-col gap-y-6 text-[.9rem] font-medium text-white text-nowrap min-w-1/2"
                onClick={() => {
                  setOpenMenu(false);
                  setMenuBtn(true);
                }}
              >
                <Link
                  to="/"
                  className={`${
                    location.pathname === "/"
                      ? "underline decoration-1 underline-offset-10"
                      : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/properties"
                  className={`${
                    location.pathname === "/properties"
                      ? "underline decoration-1 underline-offset-10"
                      : ""
                  }`}
                >
                  Properties
                </Link>
                <Link
                  className="cursor-not-allowed opacity-55"
                  aria-disabled="true"
                >
                  About Us
                </Link>
                <Link
                  className="cursor-not-allowed opacity-55"
                  aria-disabled="true"
                >
                  Blog
                </Link>
                <Link
                  className="cursor-not-allowed opacity-55"
                  aria-disabled="true"
                >
                  Contact Us
                </Link>
              </ul>

              <div className="text-white  flex gap-5 place-self-center">
                {user && (
                  <div className="flex gap-x-3 items-center max-h-5 relative">
                    <BsPerson />
                    <h4>
                      {`${userParsed.firstName} `} {`${userParsed.lastName}`}
                    </h4>
                    <FaChevronDown
                      onClick={() =>
                        loggedIn ? setLoggedIn(false) : setLoggedIn(true)
                      }
                    />
                    {loggedIn && (
                      <button
                        onClick={() => {
                          setOpenMenu(false);
                          setMenuBtn(true);
                          setLoggedIn(false);
                          localStorage.clear();
                        }}
                        className="rounded-xl px-2 py-1 auth-btn cursor-pointer text-nowrap bg-red-500 absolute top-7 left-7"
                      >
                        LogOut
                      </button>
                    )}
                  </div>
                )}
                {!user && (
                  <div>
                    <Link to="/sign-up" className="me-6">
                      <button
                        className="rounded-xl px-[20%] py-[9%] border-1 auth-btn cursor-pointer text-nowrap"
                        style={{ minWidth: "100%" }}
                      >
                        Sign up
                      </button>
                    </Link>
                    <Link to="/login">
                      <button
                        className="min-w-3/5 rounded-xl px-[20%] py-[15%] border-0 auth-btn text-logo cursor-pointer"
                        style={{ minWidth: "100%" }}
                      >
                        Login
                      </button>
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
