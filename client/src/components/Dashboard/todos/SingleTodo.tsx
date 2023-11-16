import React, { useState } from "react";
import { ITodo } from "../../../interfaces/todo.interface";
import FormRow from "../../UI/FormRow";
import { getDate } from "../../../utils/get-date";
import IconContainer from "../UI/IconContainer";
import { BiTrash } from "react-icons/bi";

interface Props extends ITodo {}

const SingleTodo = ({ text, updatedAt }: Props) => {
  // clockify like logic
  const [newText, setText] = useState<string>(text);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  return (
    <article className="px-[1rem] py-[.8rem] bg-white hover:shadow-md flex items-center justify-between gap-[1rem]">
      <div className="max-w-[400px] w-full">
        <FormRow
          value={newText}
          onChange={(e) => setText(e.target.value)}
          placeholder="Edit Todo"
          className={`hover:!border-[lightgray] w-full focus:!border-primary ${
            !isUpdating && "!border-transparent !bg-transparent"
          }`}
          onMouseEnter={() => setIsUpdating(true)}
          onMouseLeave={() => setIsUpdating(false)}
        />
      </div>

      <p className="truncate text-[.8rem]">
        Last Updated: <b>{getDate(updatedAt as Date)}</b>
      </p>

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

export default SingleTodo;
