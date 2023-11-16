import React, { useState } from "react";
import ModalOverlay from "./ModalOverlay";
import { MdClose } from "react-icons/md";
import FormRow from "../UI/FormRow";
import Button from "../UI/Button";

interface Props {
  closeModal(): void;
}

const InviteUserModal = ({ closeModal }: Props) => {
  const [email, setEmail] = useState<string>("");

  return (
    <ModalOverlay modalWidth={700}>
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-[1.1rem] text-mainBlack">Invite User</h2>

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
          label="Enter email"
          placeholder="Enter email"
          type="email"
          required={true}
          value={email}
          name="todo_item"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button text="Invite User" type="submit" className="mt-4 ml-auto" />
      </form>
    </ModalOverlay>
  );
};

export default InviteUserModal;
