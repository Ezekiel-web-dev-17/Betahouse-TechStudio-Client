import logo from "../../utils/bhlogo.png";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  return (
    <nav className="w-full max-w-screen px-20 py-8 fixed top-0 flex items-center justify-between z-20">
      <Link to="/">
        <img width="80%" src={logo} alt="" />
      </Link>

      <ul className="flex gap-x-10 text-[19px] font-medium text-white text-nowrap">
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

      <div className="text-white  flex">
        <Link to="/sign-up" className="me-6">
          <button
            className="rounded-xl px-8 py-3 border-1 auth-btn cursor-pointer text-nowrap"
            style={{ width: "100%" }}
          >
            Sign up
          </button>
        </Link>
        <Link to="/login">
          <button
            className="w-2/5 rounded-xl px-8 py-3 border-0 auth-btn text-logo cursor-pointer"
            style={{ width: "100%" }}
          >
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
