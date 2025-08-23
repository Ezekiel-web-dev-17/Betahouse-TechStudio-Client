import React, { useContext, useState } from "react";
import AuthBg from "../components/AuthBg";
import line13 from "../assets/Line 13.svg";
import line16 from "../assets/Line 16.svg";
import { Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const myApi = useContext(ApiContext);
  const [logIn, setLogIn] = useState({ email: "", password: "" });

  const changeLogInInput = (e) =>
    setLogIn({ ...logIn, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await myApi.post("/auth/sign-in", logIn);
      const user = res.data.user;
      localStorage.setItem("firstName", user.firstName);
      localStorage.setItem("lastName", user.lastName);
      toast.success(`Welcome back, ${user.firstName}!`);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await myApi.post("/auth/google", {
        token: credentialResponse.credential,
      });
      const user = res.data.user;
      localStorage.setItem("firstName", user.firstName);
      localStorage.setItem("lastName", user.lastName);
      toast.success(`Welcome back, ${user.firstName}!`);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("User not found. Please sign up first.");
      } else {
        toast.error(error.response?.data?.message || "Google login failed");
      }
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left: Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 lg:p-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl w-full max-w-md p-8 flex flex-col gap-6"
        >
          <h1 className="font-semibold text-2xl text-gray-900">
            Welcome Back to BetaHouse!
          </h1>
          <p className="text-gray-600 text-sm">
            Sign in to continue exploring properties.
          </p>

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={logIn.email}
            onChange={changeLogInInput}
            className="px-4 py-3 border rounded-xl w-full"
            required
          />

          {/* Password */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={logIn.password}
            onChange={changeLogInInput}
            className="px-4 py-3 border rounded-xl w-full"
            required
          />

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[var(--accent-color)]" />
              Remember Me
            </label>
            <p className="text-red-500 cursor-pointer">Forgot Password?</p>
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            className="py-3 text-lg font-semibold bg-[var(--accent-color)] rounded-xl text-white w-full cursor-pointer"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-3">
            <img src={line13} alt="" />
            <span className="text-gray-500 text-sm">or</span>
            <img src={line16} alt="" />
          </div>

          {/* Google Login */}
          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed")}
              useOneTap
            />
          </div>

          {/* Signup link */}
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

      {/* Right: Background image */}
      <div className="hidden lg:flex w-1/2">
        <AuthBg className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
