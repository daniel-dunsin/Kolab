import React, { useState } from "react";
import ModalOverlay from "./ModalOverlay";
import { MdCancel, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import FormRow from "../UI/FormRow";
import Button from "../UI/Button";
import { closeCreateWorkspaceModal } from "../../store/handlers.slice";
import { createWorkspace } from "../../services/thunks/workspace.thunk";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateWorkspaceModal = () => {
  const [name, setName] = useState<string>("");

  const { isOpen } = useSelector(
    (state: RootState) => state.handler.createWorkspaceModal
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await dispatch(createWorkspace(name));

    if (!data.error) {
      await Swal.fire({
        title: "Workspace Creation",
        text: "This workspace has been created successfully",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });

      dispatch(closeCreateWorkspaceModal());
      navigate("/dashboard");
    }
  };

  if (!isOpen) return <></>;

  return (
    <ModalOverlay modalWidth={700}>
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-[1.1rem] text-mainBlack">Create</h2>

        <span
          className="text-red-500 text-[1.3rem] cursor-pointer"
          onClick={() => dispatch(closeCreateWorkspaceModal())}
          title="Close Modal"
        >
          <MdClose />
        </span>
      </header>

      <form
        className="pt-[1rem] pb-[.5rem] border-t-2 mt-[1rem]"
        onSubmit={submit}
      >
        <FormRow
          label="Enter workspace name"
          placeholder="Enter workspace name"
          type="text"
          required={true}
          value={name}
          name="workspace_name"
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          text="Create Workspace"
          type="submit"
          className="mt-4 ml-auto"
        />
      </form>
    </ModalOverlay>
  );
};

export default CreateWorkspaceModal;
