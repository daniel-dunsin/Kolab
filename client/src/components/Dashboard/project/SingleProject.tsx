import React, { useState } from "react";
import { ITodo } from "../../../interfaces/todo.interface";
import FormRow from "../../UI/FormRow";
import { getDate } from "../../../utils/get-date";
import IconContainer from "../UI/IconContainer";
import { BiTrash } from "react-icons/bi";

interface Props {
  project: string;
}

const SingleProject = ({ project }: Props) => {
  return (
    <article className="px-[1rem] py-[.8rem] bg-white hover:shadow-md flex items-center justify-between gap-[1rem]">
      <div className="max-w-[400px] w-full">{project}</div>

      <span className="text-[1.2rem]">
        <IconContainer
          bg="bg-red-500"
          width={30}
          height={30}
          icon={<BiTrash />}
        />
      </span>
    </article>
  );
};

export default SingleProject;
