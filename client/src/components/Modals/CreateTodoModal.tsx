import React, { useState, FormEvent } from "react";
import ModalOverlay from "./ModalOverlay";
import { MdClose } from "react-icons/md";
import FormRow from "../UI/FormRow";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { createTodo, getTodos } from "../../services/todo.services";
import Swal from "sweetalert2";

interface Props {
  closeModal(): void;
}

const CreateTodoModal = ({ closeModal }: Props) => {
  const [text, setText] = useState<string>("");
  const dispatch = useDispatch();

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const data = await dispatch(createTodo(text));
    if (!data?.error) {
      await Swal.fire({
        title: "Create Todo",
        text: "Todo created successfully",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });

      closeModal();
      await dispatch(getTodos());
    }
  };

  return (
    <ModalOverlay modalWidth={700}>
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-[1.1rem] text-mainBlack">Add To-Do</h2>

        <span className="text-red-500 text-[1.3rem] cursor-pointer" onClick={closeModal} title="Close Modal">
          <MdClose />
        </span>
      </header>

      <form className="pt-[1rem] pb-[.5rem] border-t-2 mt-[1rem]" onSubmit={submit}>
        <FormRow
          label="Enter to-do"
          placeholder="Enter to-do"
          type="text"
          required={true}
          value={text}
          name="todo_item"
          onChange={(e) => setText(e.target.value)}
        />

        <Button text="Create To-Do" type="submit" className="mt-4 ml-auto" />
      </form>
    </ModalOverlay>
  );
};

export default CreateTodoModal;
