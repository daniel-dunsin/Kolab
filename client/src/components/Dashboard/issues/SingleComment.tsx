import React from "react";
import { BiTrash } from "react-icons/bi";
import { IComment } from "../../../interfaces/comment.interface";
import Swal, { SweetAlertResult } from "sweetalert2";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteComment, getComments } from "../../../services/comment.services";

interface Props extends IComment {}

function Comment({ text, userId, _id }: Props) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const deleteThis = async () => {
    Swal.fire({
      title: "Delete Comment",
      text: "Are you sure you want to delete this comment?",
      icon: "warning",
      confirmButtonColor: "#76b1a6",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonColor: "darkred",
      cancelButtonText: "No",
    }).then(async (result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const data = await dispatch(deleteComment(_id));
        if (!data.error) {
          await dispatch(getComments(id));
        }
      }
    });
  };

  return (
    <article className="text-[.9rem] rounded-md p-3 border-2 shadow-md hover:shadow-lg cursor-pointer bg-white">
      <header className="flex items-center justify-between gap-2">
        <div className="flex gap-2  items-center">
          <img
            src={userId?.profilePicture}
            alt=""
            className="w-[30px] h-[30px] object-cover object-center rounded-full"
          />
          <p className="font-bold">
            {userId?.firstName} {userId?.lastName}
          </p>
        </div>
        <span onClick={deleteThis}>
          <BiTrash size={25} color="darkred" cursor="pointer" />
        </span>
      </header>

      <div className="mt-4 text-[.8rem] font-medium" dangerouslySetInnerHTML={{ __html: text }}></div>
    </article>
  );
}

export default Comment;
