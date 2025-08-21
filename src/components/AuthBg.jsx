import React from "react";
import logo from "../../utils/bhlogo.png";
import authBackground from "../../utils/signupbg.png";
import { Link } from "react-router-dom";

const AuthBg = () => {
  return (
    <div className="relative w-full">
      <Link to="/" className="mt-10 ms-10 absolute z-10 top-3 left-5 right-1">
        <img className="absolute" src={logo} alt="Beta House Logo." />
      </Link>
      <img
        className="rounded-2xl w-full"
        src={authBackground}
        alt="Auth background image."
      />
    </div>
  );
};

export default AuthBg;
