import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import VerifyEmail from "./Auth/VerifyEmail";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-account/:token",
    element: <VerifyEmail />,
  },
]);

export default routes;
