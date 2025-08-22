import React, { useContext, useState } from "react";
import AuthBg from "../components/AuthBg";
import line13 from "../../utils/Line 13.svg";
import line16 from "../../utils/Line 16.svg";
import { Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [logIn, setLogIn] = useState({
    email: "",
    password: "",
  });
  const myApi = useContext(ApiContext);

  const changeLogInInput = (e) => {
    e.preventDefault();
    setLogIn({ ...logIn, [e.target.name]: e.target.value });
  };

  const submitting = async (e) => {
    e.preventDefault();
    try {
      await myApi.post("/auth/sign-in", logIn);
      toast.success("Welcome back 👋 Glad to see you again!");
      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <form
        className=" w-6/12 px-20 py-15 flex flex-col items-start gap-8"
        onSubmit={submitting}
      >
        <div className="intro flex flex-col gap-2  items-start">
          <h1 className="font-semibold text-2xl/tight text-start pe-8">
            Welcome Back to BetaHouse!{" "}
          </h1>
          <p className="font-normal text-[16px]">
            Lets get started by filling out the information below
          </p>
        </div>

        <div className="email flex flex-col items-start gap-1 w-full">
          <label className="text-[16px] font-normal">Email</label>
          <input
            name="email"
            type="email"
            className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700 w-full"
            placeholder="Enter your Email"
            value={logIn.email}
            onChange={changeLogInInput}
          />
        </div>

        <div className="password flex flex-col items-start gap-1 w-full">
          <label className="text-[16px] font-normal">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-700 w-full"
            value={logIn.password}
            onChange={changeLogInInput}
          />
        </div>

        <div className="continue flex flex-col items-start gap-1 w-full">
          <div className="flex justify-between items-center w-full">
            <div className=" flex gap-4">
              <input
                required
                aria-required="true"
                type="checkbox"
                className=" accent-(--accent-color) scale-150 cursor-pointer"
              />
              <p>Remember Me</p>
            </div>

            <p className="text-red-500 cursor-pointer">Forgot Password</p>
          </div>

          <button
            type="submit"
            className="py-3 text-xl font-semibold bg-[var(--accent-color)] w-full rounded-xl text-white mt-5"
          >
            Sign In
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
            <Link to="/sign-up" className="text-[var(--accent-color)]">
              Sign up
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

export default Login;
