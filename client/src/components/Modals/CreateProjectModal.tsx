import React, { FormEvent, useState } from "react";
import ModalOverlay from "./ModalOverlay";
import { MdClose } from "react-icons/md";
import FormRow from "../UI/FormRow";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { createProject, getProject } from "../../services/project.services";
import Swal from "sweetalert2";

interface Props {
  closeModal(): void;
}

const CreateProjectModal = ({ closeModal }: Props) => {
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const data = await dispatch(createProject(name));

    if (!data?.error) {
      await Swal.fire({
        title: "Create Project",
        text: "You have successfully created this project",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
      closeModal();
      dispatch(getProject({}));
    }
  };

  return (
    <ModalOverlay modalWidth={700}>
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-[1.1rem] text-mainBlack">Create Project</h2>

        <span className="text-red-500 text-[1.3rem] cursor-pointer" onClick={closeModal} title="Close Modal">
          <MdClose />
        </span>
      </header>

      <form className="pt-[1rem] pb-[.5rem] border-t-2 mt-[1rem]" onSubmit={submit}>
        <FormRow
          label="Enter project"
          placeholder="Enter project"
          type="text"
          required={true}
          value={name}
          name="todo_item"
          onChange={(e) => setName(e.target.value)}
        />

        <Button text="Create Project" type="submit" className="mt-4 ml-auto" />
      </form>
    </ModalOverlay>
  );
};

export default CreateProjectModal;
