import React, { useContext, useState } from "react";
import AuthBg from "../components/AuthBg";
import line13 from "../assets/Line 13.svg";
import line16 from "../assets/Line 16.svg";
import { Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import LoaderComp from "../components/LoaderComp";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      if (signUp.confirmPass !== signUp.password) {
        throw new Error("Passwords do not match");
      }

      const res = await myApi.post("/auth/sign-up", signUp);
      const { user, jwt, token } = res.data;
      const authToken = jwt || token;
      if (authToken) {
        sessionStorage.setItem("token", authToken);
        localStorage.setItem("token", authToken);
      }
      localStorage.setItem("firstName", user?.firstName || "");
      localStorage.setItem("lastName", user?.lastName || "");
      setLoading(false);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      setLoading(false);
      const errorMsg = err?.response?.data?.message || err?.message || "Error signing user up.";
      toast.error(errorMsg);
    }
  };

  const handleGoogleAuth = async (credentialResponse) => {
    try {
      setLoading(true);
      const res = await myApi.post("/auth/google", {
        token: credentialResponse.credential,
      });
      const { user, jwt, token } = res.data;
      const authToken = jwt || token;
      if (authToken) {
        sessionStorage.setItem("token", authToken);
        localStorage.setItem("token", authToken);
      }
      localStorage.setItem("firstName", user?.firstName || "");
      localStorage.setItem("lastName", user?.lastName || "");
      setLoading(false);
      toast.success("Signed up successfully with Google!");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Google authentication failed. Please try again.");
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

          {loading && (
            <div className="flex gap-2.5 items-center justify-center">
              <LoaderComp />
              <p className="text-xs opacity-80">
                Signing you up. This may take a while...
              </p>
            </div>
          )}
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
              className="accent-(--accent-color)"
            />
            <span>I agree to Terms of Service and Privacy Policy</span>
          </div>

          <button
            type="submit"
            className="py-3 text-lg font-semibold bg-(--accent-color) w-full rounded-xl text-white"
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
              onError={() => toast.error("Google signup failed")}
              useOneTap
            />
          </div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-(--accent-color) font-medium"
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
