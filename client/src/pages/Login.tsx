import React from "react";
import Button from "../components/UI/Button";
import FormRow from "../components/UI/FormRow";
import { Link } from "react-router-dom";
import Navbar from "../components/Home/Navbar";

const Login = () => {
  return (
    <section className="h-screen flex flex-col">
      <Navbar />

      <div className="bg-[#f4f4f4] w-full h-screen flex items-center justify-center p-[1rem] ">
        <div className="max-w-[500px] bg-white rounded-md p-[1rem] w-full">
          <header className="flex items-center justify-between gap-[12px]">
            <h2 className="font-bold text-[1.1rem] text-blue-950">
              Log in to your account
            </h2>
            <p className="text-[.9rem] cursor-pointer">
              You wan signup?{" "}
              <Link
                to={"/signup"}
                className="underline text-blue-950 font-bold"
              >
                Signup
              </Link>
            </p>
          </header>

          <form action="">
            <div className="grid grid-cols-1 gap-[1rem] mt-8 mb-7">
              <FormRow
                label="Email*"
                placeholder="Enter your email"
                type="email"
                name="email"
                required={true}
              />

              <FormRow
                label="Password*"
                placeholder="Enter your password"
                type="password"
                name="password"
                required={true}
              />
            </div>

            <Button text="Log In" type="submit" className="mt-4 block w-full" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
