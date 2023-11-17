import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import VerifyEmail from "./Auth/VerifyEmail";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard/Dashboard";
import Settings from "./Dashboard/Settings";
import Todos from "./Dashboard/Todos";
import Timesheet from "./Dashboard/Timesheet";
import Projects from "./Dashboard/Projects";
import Members from "./Dashboard/Members";
import Issues from "./Dashboard/Issues";
import SingleIssue from "./Dashboard/SingleIssue";
import JoinWorkspace from "./JoinWorkspace";

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
      {
        path: "timesheet",
        element: <Timesheet />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "members",
        element: <Members />,
      },
      {
        path: "issues",
        element: <Issues />,
      },
      {
        path: "issues/:id",
        element: <SingleIssue />,
      },
    ],
  },
  {
    path: "/join-workspace",
    element: <JoinWorkspace />,
  },
]);

export default routes;
