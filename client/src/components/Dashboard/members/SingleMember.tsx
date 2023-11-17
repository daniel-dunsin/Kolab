import React, { FormEvent, useState } from "react";
import { IUser } from "../../../interfaces/auth.interface";
import { BiChevronDown, BiChevronUp, BiPaperPlane } from "react-icons/bi";
import IconContainer from "../UI/IconContainer";
import FormRow from "../../UI/FormRow";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { emailMember } from "../../../services/workspace-members.services";
import Swal from "sweetalert2";

interface Props extends IUser {}

const SingleMember = ({ firstName, lastName, profilePicture, email }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await dispatch(emailMember({ email, subject, message }));

    if (!data.error) {
      await Swal.fire({
        title: "Send Email",
        text: `Your message has been sent to ${firstName}'s email`,
        timer: 2000,
        showConfirmButton: false,
        icon: "success",
      });
      setIsOpen(false);
      setMessage("");
      setSubject("");
    }
  };

  return (
    <article className=" bg-white hover:shadow-md my-4 rounded-xl overflow-hidden text-[.8rem]">
      <header className="px-[1rem] py-[.8rem] flex items-center justify-between gap-[1rem]">
        <div className="flex items-center gap-[.8rem]">
          <img
            src={profilePicture}
            alt={firstName}
            className="w-[34px] h-[34px] rounded-full object-cover object-center"
          />
          <p className="font-bold">
            {firstName} {lastName}
          </p>
        </div>
        <span>
          <IconContainer
            width={34}
            height={34}
            onClick={() => setIsOpen((prev) => !prev)}
            icon={isOpen ? <BiChevronUp /> : <BiChevronDown />}
          />
        </span>
      </header>

      <div
        className="transition-all duration-500 "
        style={{ height: isOpen ? "220px" : "0px", overflowY: isOpen ? "scroll" : "hidden" }}
      >
        <form className="px-[1rem] py-[.8rem] border-t-[1.5px]" onSubmit={submit}>
          <p className="mb-2">
            email: <b>{email}</b>
          </p>
          <p>
            Send {firstName} {lastName} an email
          </p>

          <div className="flex mt-4 md:flex-row flex-col gap-4">
            <div className="max-w-fit">
              <FormRow
                placeholder="Subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="max-w-[180px] min-w-[180px] h-[100px]"
              />
            </div>
            <FormRow
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] flex items-start justify-start"
            />
          </div>

          <Button text="Send" type="submit" icon={<BiPaperPlane />} className="block mt-4 ml-auto" />
        </form>
      </div>
    </article>
  );
};

export default SingleMember;
