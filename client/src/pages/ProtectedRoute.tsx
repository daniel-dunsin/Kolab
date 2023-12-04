import React from "react";
import { getUserFromLocalStorage } from "../utils/tokens";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openErrorModal } from "../store/handlers.slice";
import CreateWorkspaceModal from "../components/Modals/CreateWorkspaceModal";

const ProtectedRoute = () => {
  const user = getUserFromLocalStorage();
  const dispatch = useDispatch();

  if (!user) {
    dispatch(openErrorModal("You do not have access to this resource, sign in again"));
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <CreateWorkspaceModal />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
