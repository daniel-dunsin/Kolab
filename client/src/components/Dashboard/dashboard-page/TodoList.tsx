import React from "react";
import ContentBox from "../ui/ContentBox";
import IconContainer from "../ui/IconContainer";
import { BiFolder } from "react-icons/bi";
import Button from "../../ui/Button";

const todos = ["Creating Wireframe", "Research Development"];

const TodoList = () => {
  return (
    <ContentBox headerSize="small" header="To Do" maxHeight={200}>
      <div className="mt-2">
        {todos?.map((todo, index) => {
          return (
            <article
              key={index}
              className="border-[1.5px] rounded-[10px] py-[.7rem] px-[0.7rem] flex items-center gap-[.7rem] my-2"
            >
              <IconContainer width={20} height={20} icon={<BiFolder />} />
              <p>{todo}</p>
            </article>
          );
        })}
      </div>

      <Button text="View Todos" className="ml-auto block mt-4" />
    </ContentBox>
  );
};

export default TodoList;
