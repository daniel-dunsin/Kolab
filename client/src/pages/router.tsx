import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import VerifyEmail from "./auth/VerifyEmail";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./dashboard/Dashboard";
import Settings from "./dashboard/Settings";
import Todos from "./dashboard/Todos";

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
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "workspace/settings",
        element: <Settings />,
      },
      {
        path: "todo",
        element: <Todos />,
      },
    ],
  },
]);

export default routes;
