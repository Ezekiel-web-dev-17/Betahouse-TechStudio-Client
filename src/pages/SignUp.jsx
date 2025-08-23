import React, { useContext, useState } from "react";
import AuthBg from "../components/AuthBg";
import line13 from "../assets/Line 13.svg";
import line16 from "../assets/Line 16.svg";
import { Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const SignUp = () => {
  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const myApi = useContext(ApiContext);
  const navigate = useNavigate();

  const changeSignUpInput = (e) =>
    setSignUp({ ...signUp, [e.target.name]: e.target.value });

  const submitting = async (e) => {
    e.preventDefault();
    try {
      if (signUp.confirmPass !== signUp.password) {
        throw new Error("Passwords do not match");
      }
      const res = await myApi.post("/auth/sign-up", signUp);
      const user = res.data.user;
      localStorage.setItem("firstName", user.firstName);
      localStorage.setItem("lastName", user.lastName);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleGoogleAuth = async (credentialResponse) => {
    try {
      // Attempt signup
      const res = await myApi.post("/auth/google", {
        token: credentialResponse.credential,
      });
      const user = res.data.user;

      // Save user data locally
      localStorage.setItem("firstName", user.firstName);
      localStorage.setItem("lastName", user.lastName);

      toast.success("Signed up with Google!");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 409) {
        // User already exists, try login
        try {
          const res = await myApi.post("/auth/sign-in", {
            email: error.response.data.user.email,
            password: error.response.data.user.password || "dummy", // backend must handle Google login properly
          });
          const user = res.data.user;
          localStorage.setItem("firstName", user.firstName);
          localStorage.setItem("lastName", user.lastName);
          toast.success("Signed in with Google!");
          navigate("/");
        } catch (loginErr) {
          console.log(loginErr);
          toast.error("Google login failed. Please try again.");
        }
        return;
      }
      toast.error("Google signup failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left: Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 lg:p-20">
        <form
          onSubmit={submitting}
          className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl w-full max-w-md p-8 flex flex-col gap-6"
        >
          <h1 className="font-semibold text-2xl text-gray-900">
            Join our community of home seekers
          </h1>
          <p className="text-gray-600 text-sm">
            Let’s get started by filling out the information below
          </p>

          {/* Name */}
          <div className="flex gap-4 w-full">
            <input
              name="firstName"
              placeholder="First Name"
              value={signUp.firstName}
              onChange={changeSignUpInput}
              className="w-1/2 px-4 py-3 border rounded-xl"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={signUp.lastName}
              onChange={changeSignUpInput}
              className="w-1/2 px-4 py-3 border rounded-xl"
            />
          </div>

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={signUp.email}
            onChange={changeSignUpInput}
            className="px-4 py-3 border rounded-xl w-full"
          />

          {/* Password */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={signUp.password}
            onChange={changeSignUpInput}
            className="px-4 py-3 border rounded-xl w-full"
          />

          <input
            name="confirmPass"
            type="password"
            placeholder="Confirm Password"
            value={signUp.confirmPass}
            onChange={changeSignUpInput}
            className="px-4 py-3 border rounded-xl w-full"
          />

          {/* Terms */}
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              required
              className="accent-[var(--accent-color)]"
            />
            <span>I agree to Terms of Service and Privacy Policy</span>
          </div>

          <button
            type="submit"
            className="py-3 text-lg font-semibold bg-[var(--accent-color)] w-full rounded-xl text-white"
          >
            Sign Up
          </button>

          <div className="flex items-center justify-center gap-3 my-3">
            <img src={line13} alt="" />
            <span className="text-gray-500 text-sm">or</span>
            <img src={line16} alt="" />
          </div>

          {/* Google Login */}
          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleAuth}
              onError={() => toast.error("Google login failed")}
              useOneTap
            />
          </div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[var(--accent-color)] font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>

      {/* Right: BG */}
      <div className="hidden lg:flex w-1/2">
        <AuthBg className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SignUp;
