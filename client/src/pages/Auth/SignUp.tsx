import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormRow from "../../components/UI/FormRow";
import Button from "../../components/UI/Button";
import Navbar from "../../components/Home/Navbar";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../services/thunks/auth.thunk";
import Swal from "sweetalert2";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const dispatch = useDispatch();

  const submit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await dispatch(
      signUpUser({ firstName, lastName, email, password })
    );

    if (!data?.error) {
      await Swal.fire({
        title: "Account Verification",
        icon: "success",
        text: "You account has been created successfully, check your mail for the verification link",
        showConfirmButton: false,
      });
    }
  };

  return (
    <section className="h-screen flex flex-col">
      <Navbar />

      <div className="bg-[#f4f4f4] w-full h-screen flex items-center justify-center p-[1rem] ">
        <div className="max-w-[800px] bg-white rounded-md p-[1rem] w-full">
          <header className="flex items-center justify-between gap-[12px]">
            <h2 className="font-bold text-[1.1rem] text-blue-950">
              Create your account
            </h2>
            <p className="text-[.9rem] cursor-pointer">
              Already have an acccount?{" "}
              <Link to={"/login"} className="underline text-blue-950 font-bold">
                Login
              </Link>
            </p>
          </header>

          <form action="" onSubmit={submit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem] mt-8 mb-7">
              <FormRow
                label="Firstname*"
                placeholder="Enter your firstname"
                type="text"
                name="firstName"
                required={true}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <FormRow
                label="Lastname(optional)"
                placeholder="Enter your lastname"
                type="text"
                name="lastName"
                required={false}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <FormRow
                label="Email*"
                placeholder="Enter your email"
                type="email"
                name="email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormRow
                label="Password*"
                placeholder="Enter your password"
                type="password"
                name="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              text="Create Account"
              type="submit"
              className="mt-4 block w-full"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
