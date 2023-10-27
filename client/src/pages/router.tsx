import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import VerifyEmail from "./Auth/VerifyEmail";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard/Dashboard";
import CreateWorkspace from "./Dashboard/CreateWorkspace";

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
        path: "workspace/new",
        element: <CreateWorkspace />,
      },
    ],
  },
]);

export default routes;
