import React, { ChangeEvent, useState } from "react";
import { MdCancel, MdClose } from "react-icons/md";
import FormRow from "../UI/FormRow";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { resendVerificationEmail } from "../../services/auth.services";
import Swal from "sweetalert2";
import ModalOverlay from "./ModalOverlay";

interface Props {
  closeModal(): void;
}

const VerirfcationEmailModal = ({ closeModal }: Props) => {
  const [email, setEmail] = useState<string>("");

  const dispatch = useDispatch();

  const submit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await dispatch(resendVerificationEmail(email));

    if (!data?.error) {
      await Swal.fire({
        title: "Verifaction Email Sent",
        text: "Another verification email has been sent to you",
        // timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
      closeModal();
    }
  };

  return (
    <ModalOverlay>
      <header>
        <MdClose className="ml-auto text-red-500 cursor-pointer text-[1.3rem]" onClick={closeModal} />
      </header>
      <form onSubmit={submit} className="mt-6 max-w-[300px] mx-auto flex flex-col gap-y-[1rem]">
        <FormRow
          type="email"
          name="email"
          label="Enter your email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button className="min-w-full" type="submit" text="Resend Email" />
      </form>
    </ModalOverlay>
  );
};

export default VerirfcationEmailModal;
