import React, { useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import TodayDate from "../../components/Dashboard/UI/TodayDate";
import Button from "../../components/UI/Button";
import { BiPlus } from "react-icons/bi";
import SingleTodo from "../../components/Dashboard/todos/SingleTodo";
import SearchBox from "../../components/UI/SearchBox";
import CreateTodoModal from "../../components/Modals/CreateTodoModal";

const todos = [
  {
    text: "My Todo",
    updatedAt: new Date(),
  },
  {
    text: "Go To School",
    updatedAt: new Date("2002-10-24"),
  },
];

const Todos = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <DashboardLayout pageTitle="Todos">
      <>
        {modalOpen && (
          <CreateTodoModal closeModal={() => setModalOpen(false)} />
        )}
      </>

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
        <SearchBox placeholder="Search Todos..." />

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
