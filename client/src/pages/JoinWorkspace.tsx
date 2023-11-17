import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/UI/Button";
import { useDispatch } from "react-redux";
import { acceptWorkspaceInvitation, getWorkspaceByInviteId } from "../services/workspace.services";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { updateCurrentWorkspace } from "../store/workspace.slice";

function JoinWorkspace() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentWorkspace } = useSelector((state: RootState) => state?.workspaces);
  const [searchParams] = useSearchParams();
  const invite_id = searchParams.get("invite_id");

  const submit = async () => {
    const data = await dispatch(acceptWorkspaceInvitation(invite_id));
    if (!data.error) {
      await Swal.fire({
        title: "Workspace Invitation",
        text: `You are now a member of ${currentWorkspace?.name} workspace`,
        timer: 2000,
        showConfirmButton: false,
        icon: "success",
      });

      dispatch(updateCurrentWorkspace(null));
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    dispatch(getWorkspaceByInviteId(invite_id));
  }, []);

  return (
    <div className="flex items-center justify-center flex-col gap-4 h-[100vh]">
      <h2>Are you sure you want to join {currentWorkspace?.name} workspace?</h2>
      <div className="flex items-center gap-2 flex-wrap">
        <Link to={"/"}>
          <Button text="Cancel" className="!text-primary border-primary !bg-white" />
        </Link>
        <Button text="Yes" onClick={submit} />
      </div>
    </div>
  );
}

export default JoinWorkspace;
