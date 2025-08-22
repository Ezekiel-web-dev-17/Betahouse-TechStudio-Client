import React, { useContext, useState } from "react";
import AuthBg from "../components/AuthBg";
import line13 from "../../utils/Line 13.svg";
import line16 from "../../utils/Line 16.svg";
import { Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";

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
      if (signUp.confirmPass === signUp.password) {
        await myApi.post("/auth/sign-up", signUp);
        toast.success(
          "Account created ✔️. Let’s find your dream property today."
        );
        navigate("/");
      } else {
        throw new Error("Confirmed password does not match the password");
      }
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  console.log("Google Client ID:", import.meta.env.VITE_CLIENT_ID);
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 lg:p-20">
        <form
          onSubmit={submitting}
          className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl w-full max-w-md p-8 flex flex-col gap-6"
        >
          {/* Intro */}
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-2xl text-gray-900">
              Join our community of home seekers
            </h1>
            <p className="text-gray-600 text-sm">
              Let’s get started by filling out the information below
            </p>
          </div>

          {/* Name inputs */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-sm font-medium lg:text-start">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                value={signUp.firstName}
                onChange={changeSignUpInput}
                placeholder="Enter first name"
                className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700 w-full"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-sm font-medium lg:text-start">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                value={signUp.lastName}
                onChange={changeSignUpInput}
                placeholder="Enter last name"
                className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700 w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium lg:text-start">Email</label>
            <input
              name="email"
              type="email"
              value={signUp.email}
              onChange={changeSignUpInput}
              placeholder="Enter your email"
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
              value={signUp.password}
              onChange={changeSignUpInput}
              placeholder="Enter your password"
              className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700 w-full"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium lg:text-start">
              Confirm Password
            </label>
            <input
              name="confirmPass"
              type="password"
              value={signUp.confirmPass}
              onChange={changeSignUpInput}
              placeholder="Confirm your password"
              className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700 w-full"
            />
          </div>

          {/* Terms */}
          <div className="flex gap-2 text-sm mt-2">
            <input
              type="checkbox"
              required
              className="accent-[var(--accent-color)] scale-125 cursor-pointer"
            />
            <p>
              I agree to{" "}
              <span className="text-[var(--accent-color)]">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[var(--accent-color)]">Privacy Policy</span>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="py-3 text-lg font-semibold bg-[var(--accent-color)] w-full rounded-xl text-white cursor-pointer"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-3">
            <img src={line13} alt="" />
            <p className="text-gray-500 text-sm">or</p>
            <img src={line16} alt="" />
          </div>

          <div className="w-full">
            <GoogleLogin
              text="signup_with"
              onSuccess={async (credentialResponse) => {
                const userInfo = jwtDecode(credentialResponse.credential);
                const data = {
                  firstName: userInfo.given_name,
                  lastName: userInfo.family_name,
                  email: userInfo.email,
                  password: uuidv4(),
                };
                try {
                  const res = await myApi.post("/auth/sign-up", data);

                  const { firstname, lastname, email } = res.data.data.user;
                  localStorage.clear();
                  localStorage.setItem("firstName", firstname);
                  localStorage.setItem("lastName", lastname);
                  localStorage.setItem("userEmail", email);
                  navigate("/");
                } catch (error) {
                  if (error.response?.status === 409) {
                    toast.error("User already exists. Please sign in.");
                    navigate("/sign-in");
                    return;
                  }
                  toast.error(
                    error.response?.data?.message ||
                      "Something went wrong. Please try again later."
                  );
                  console.error(
                    "Error during sign-up:",
                    error?.response?.data || error
                  );
                }
              }}
              onError={(e) =>
                toast.error(
                  e?.response?.data?.error || "Login failed. Please try again."
                )
              }
              auto_select={true}
            />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-gray-700">
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

      {/* Right side image (desktop only) */}
      <div className="hidden lg:flex w-1/2">
        <AuthBg className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SignUp;
