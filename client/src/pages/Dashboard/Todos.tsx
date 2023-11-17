import React, { useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import TodayDate from "../../components/Dashboard/UI/TodayDate";
import Button from "../../components/UI/Button";
import { BiPlus } from "react-icons/bi";
import SingleTodo from "../../components/Dashboard/todos/SingleTodo";
import SearchBox from "../../components/UI/SearchBox";
import CreateTodoModal from "../../components/Modals/CreateTodoModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { getTodos } from "../../services/todo.services";

const Todos = () => {
  const [value, setValue] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <DashboardLayout pageTitle="Todos">
      <>{modalOpen && <CreateTodoModal closeModal={() => setModalOpen(false)} />}</>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <TodayDate />
        <Button
          text="Add Todo"
          icon={<BiPlus />}
          onClick={() => {
            setModalOpen(true);
          }}
        />
      </div>

      <section className="mt-6">
        <div className="flex flex-col gap-4 mt-7">
          {todos?.map((todo, index) => {
            return <SingleTodo {...todo} key={index} />;
          })}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Todos;
