import React, { useState, FormEvent } from "react";
import ModalOverlay from "./ModalOverlay";
import { MdClose } from "react-icons/md";
import FormRow from "../UI/FormRow";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { inviteUserToWorkspace } from "../../services/workspace.services";
import Swal from "sweetalert2";

interface Props {
  closeModal(): void;
}

const InviteUserModal = ({ closeModal }: Props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const data = await dispatch(inviteUserToWorkspace(email));

    if (!data.error) {
      await Swal.fire({
        title: "User Invite",
        text: "Invite link has been sent to the provided email",
        timer: 2000,
        showConfirmButton: false,
        icon: "success",
      });

      closeModal();
    }
  };

  return (
    <ModalOverlay modalWidth={700}>
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-[1.1rem] text-mainBlack">Invite User</h2>

        <span className="text-red-500 text-[1.3rem] cursor-pointer" onClick={closeModal} title="Close Modal">
          <MdClose />
        </span>
      </header>

      <form className="pt-[1rem] pb-[.5rem] border-t-2 mt-[1rem]" onSubmit={submit}>
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
