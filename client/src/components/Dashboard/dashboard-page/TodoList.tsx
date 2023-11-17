import React from "react";
import ContentBox from "../UI/ContentBox";
import IconContainer from "../UI/IconContainer";
import { BiFolder } from "react-icons/bi";
import Button from "../../UI/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { getTodos } from "../../../services/todo.services";
import { Link } from "react-router-dom";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);

  React.useEffect(() => {
    dispatch(getTodos());
  }, []);

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
              <p>{todo.text}</p>
            </article>
          );
        })}
      </div>

      <Link to={"/dashboard/todo"} className="max-w-fit ml-auto block">
        <Button text="View Todos" className="ml-auto block mt-4" />
      </Link>
    </ContentBox>
  );
};

export default TodoList;
