import React, { useContext, useState } from "react";
import AuthBg from "../components/AuthBg";
import line13 from "../../utils/Line 13.svg";
import line16 from "../../utils/Line 16.svg";
import { Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [logIn, setLogIn] = useState({ email: "", password: "" });
  const myApi = useContext(ApiContext);

  const changeLogInInput = (e) =>
    setLogIn({ ...logIn, [e.target.name]: e.target.value });

  const submitting = async (e) => {
    e.preventDefault();
    try {
      await myApi.post("/auth/sign-in", logIn);
      toast.success("Welcome back 👋 Glad to see you again!");
      navigate("/");
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side form (always visible) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 lg:p-20">
        <form
          onSubmit={submitting}
          className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl w-full max-w-md p-8 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-2xl text-gray-900">
              Welcome Back to BetaHouse!
            </h1>
            <p className="text-gray-600 text-sm">
              Let’s get started by filling out the information below
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium lg:text-start">Email</label>
            <input
              name="email"
              type="email"
              value={logIn.email}
              onChange={changeLogInInput}
              placeholder="Enter your Email"
              className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700 w-full"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium lg:text-start">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={logIn.password}
              onChange={changeLogInInput}
              placeholder="Enter your password"
              className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700 w-full"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[var(--accent-color)]" />
              Remember Me
            </label>
            <p className="text-red-500 cursor-pointer">Forgot Password</p>
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            className="py-3 text-lg font-semibold bg-[var(--accent-color)] rounded-xl text-white w-full"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3">
            <img src={line13} alt="" />
            <p className="text-gray-500">or</p>
            <img src={line16} alt="" />
          </div>

          <p className="text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/sign-up"
              className="text-[var(--accent-color)] font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>

      {/* Right side image (desktop only) */}
      <div className="hidden lg:flex w-1/2">
        <AuthBg className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
