import React, { useState } from "react";
import { ITodo } from "../../../interfaces/todo.interface";
import FormRow from "../../UI/FormRow";
import { getDate } from "../../../utils/get-date";
import IconContainer from "../UI/IconContainer";
import { BiTrash } from "react-icons/bi";
import { IProject } from "../../../interfaces/project.interface";
import { useDispatch } from "react-redux";
import { deleteProject, getProject } from "../../../services/project.services";
import Swal, { SweetAlertResult } from "sweetalert2";

interface Props extends IProject {}

const SingleProject = ({ name, _id }: Props) => {
  const dispatch = useDispatch();

  const deleteOne = async () => {
    Swal.fire({
      title: "Delete Project",
      text: "Are you sure you want to delete this project?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "darkred",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes",
      confirmButtonColor: "#76b1a6",
    }).then(async (result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const data = await dispatch(deleteProject(_id));
        if (!data?.error) {
          await dispatch(getProject({}));
          await Swal.fire({
            title: "Delete Project",
            text: "You have successfully deleted this project",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  return (
    <article className="px-[1rem] py-[.8rem] bg-white hover:shadow-md flex items-center justify-between gap-[1rem]">
      <div className="max-w-[400px] w-full">{name}</div>

      <span className="text-[1.2rem]">
        <IconContainer bg="bg-red-500" width={30} height={30} icon={<BiTrash />} onClick={deleteOne} />
      </span>
    </article>
  );
};

export default SingleProject;
