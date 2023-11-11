import React, { useState } from "react";
import ModalOverlay from "./ModalOverlay";
import { MdClose } from "react-icons/md";
import FormRow from "../ui/FormRow";
import Button from "../ui/Button";

interface Props {
  closeModal(): void;
}

const CreateProjectModal = ({ closeModal }: Props) => {
  const [name, setName] = useState<string>("");

  return (
    <ModalOverlay modalWidth={700}>
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-[1.1rem] text-mainBlack">
          Create Project
        </h2>

        <span
          className="text-red-500 text-[1.3rem] cursor-pointer"
          onClick={closeModal}
          title="Close Modal"
        >
          <MdClose />
        </span>
      </header>

      <form
        className="pt-[1rem] pb-[.5rem] border-t-2 mt-[1rem]"
        // onSubmit={submit}
      >
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
