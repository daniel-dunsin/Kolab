import React, { useState } from "react";
import { IUser } from "../../../interfaces/auth.interface";
import { BiChevronDown, BiChevronUp, BiPaperPlane } from "react-icons/bi";
import IconContainer from "../ui/IconContainer";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

interface Props extends IUser {}

const SingleMember = ({
  firstName,
  lastName,
  profilePicture,
  email,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        className="transition-all duration-500 overflow-hidden"
        style={{ height: isOpen ? "220px" : "0px" }}
      >
        <div className="px-[1rem] py-[.8rem] border-t-[1.5px]">
          <p>
            Send {firstName} {lastName} an email
          </p>

          <div className="flex mt-4 md:flex-row flex-col gap-4">
            <div className="max-w-fit">
              <FormRow
                placeholder="Subject..."
                className="max-w-[180px] min-w-[180px] h-[100px]"
              />
            </div>
            <FormRow
              placeholder="Message..."
              className="min-h-[100px] flex items-start justify-start"
            />
          </div>

          <Button
            text="Send"
            icon={<BiPaperPlane />}
            className="block mt-4 ml-auto"
          />
        </div>
      </div>
    </article>
  );
};

export default SingleMember;
