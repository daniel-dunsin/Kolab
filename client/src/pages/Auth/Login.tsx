import React, { ChangeEvent, useState } from "react";
import Button from "../../components/UI/Button";
import FormRow from "../../components/UI/FormRow";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Home/Navbar";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/auth.services";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect");
  const invite_id = searchParams.get("invite_id");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await dispatch(loginUser({ email, password }));

    if (!data?.error) {
      await Swal.fire({
        title: "Login",
        text: "You have successfully logged in to your account",
        timer: 1000,
        showConfirmButton: false,
        icon: "success",
      });

      if (redirect) navigate(`/${redirect}?invite_id=${invite_id}`);
      else navigate("/dashboard");
    }
  };

  return (
    <section className="h-screen flex flex-col">
      <Navbar />

      <div className="bg-[#f4f4f4] w-full h-screen flex items-center justify-center p-[1rem] ">
        <div className="max-w-[500px] bg-white rounded-md p-[1rem] w-full">
          <header className="flex items-center justify-between gap-[12px]">
            <h2 className="font-bold text-[1.1rem] text-blue-950">Log in to your account</h2>
            <p className="text-[.9rem] cursor-pointer">
              You wan signup?{" "}
              <Link to={"/signup"} className="underline text-blue-950 font-bold">
                Signup
              </Link>
            </p>
          </header>

          <form action="" onSubmit={submit}>
            <div className="grid grid-cols-1 gap-[1rem] mt-8 mb-7">
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

            <Button text="Log In" type="submit" className="mt-4 block w-full" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
