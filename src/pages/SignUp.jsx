import React from "react";
import AuthBg from "../components/AuthBg";
import line13 from "../../utils/Line 13.svg";
import line16 from "../../utils/Line 16.svg";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <form className=" w-6/12 px-20 py-15 flex flex-col items-start gap-8">
        <div className="intro flex flex-col gap-2  items-start">
          <h1 className="font-semibold text-2xl/tight text-start pe-8">
            Join our community of home seekers and explore the possibilities
            that await.{" "}
          </h1>
          <p className="font-normal text-[16px]">
            Lets get started by filling out the information below
          </p>
        </div>

        <div className="names flex gap-7 max-w-full">
          <div className="flex flex-col items-start gap-1 w-4/5">
            <label className="text-[16px] font-normal">First Name</label>
            <input
              type="text"
              className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700"
              placeholder="Enter Name"
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-4/5">
            <label className="text-[16px] font-normal">Last Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700"
            />
          </div>
        </div>

        <div className="email flex flex-col items-start gap-1 w-full">
          <label className="text-[16px] font-normal">Email</label>
          <input
            type="email"
            className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700 w-full"
            placeholder="Enter your Email"
          />
        </div>

        <div className="password flex flex-col items-start gap-1 w-full">
          <label className="text-[16px] font-normal">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700 w-full"
          />
        </div>

        <div className="confirm-pass flex flex-col items-start gap-1 w-full">
          <label className="text-[16px] font-normal">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700 w-full"
          />

          <div className=" flex gap-4 mt-5">
            <input
              type="checkbox"
              required
              aria-required="true"
              className=" accent-(--accent-color) scale-150 cursor-pointer"
            />
            <p>
              I agree to{" "}
              <span className="text-[var(--accent-color)]">
                Terms of Service
              </span>{" "}
              and
              <span className="text-[var(--accent-color)]">
                {" "}
                Privacy Policies
              </span>
            </p>
          </div>

          <button
            type="submit"
            className="py-3 text-xl font-semibold bg-[var(--accent-color)] w-full rounded-xl text-white mt-5"
          >
            Sign Up
          </button>

          <div className="flex items-center justify-center gap-3 my-3 w-full">
            <img src={line13} alt="" />
            <p className="mb-0 ">or</p>
            <img src={line16} alt="" />
          </div>

          {/* Google oauth comes here. */}
          {/* <GOoogolee000></GOoogolee000> */}

          <p className="place-self-center opacity-80">
            Already have an account?{" "}
            <Link to="/login" className="text-[var(--accent-color)]">
              Sign in
            </Link>
          </p>
        </div>
      </form>
      <div className=" w-6/12">
        <AuthBg />
      </div>
    </div>
  );
};

export default SignUp;
