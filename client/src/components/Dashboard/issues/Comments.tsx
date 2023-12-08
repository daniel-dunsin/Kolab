import React, { useEffect, useState } from "react";
import Comment from "./SingleComment";
import FormRow from "../../UI/FormRow";
import Editor from "../../UI/Editor";
import Button from "../../UI/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createComment, getComments } from "../../../services/comment.services";
import { BiLoaderAlt } from "react-icons/bi";

function CommentsContainer() {
  const [text, setText] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);
  const { comments, handlers } = useSelector((state: RootState) => state.comments);
  const { id } = useParams();
  const dispatch = useDispatch();

  const sliceLength = !showMore ? 2 : comments?.length;
  const toggleVisibility = () => setShowMore((prev) => !prev);

  const submit = async () => {
    if (text.trim() === "") return;
    const data = await dispatch(createComment({ text, issueId: id }));
    if (!data?.error) {
      setText("");
      await dispatch(getComments(id));
    }
  };

  useEffect(() => {
    dispatch(getComments(id));
  }, []);

  return (
    <div className="flex flex-col gap-y-4 mt-4">
      {handlers?.isLoading && <BiLoaderAlt className="mt-6" size={26} />}
      {comments?.slice(0, sliceLength)?.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}

      {comments?.length > 3 && (
        <p className="underline text-[.8rem] cursor-pointer" onClick={toggleVisibility}>
          {showMore ? "Show Less" : "Show More"}
        </p>
      )}

      <div className="flex flex-col gap-y-3">
        <Editor
          value={text}
          onChange={(value: string) => setText(value)}
          className="h-[180px] min-h-[180px] mb-3 bg-white shadow-md border-none"
        />

        <Button onClick={submit} text="Submit" type="submit" className="max-w-[200px] ml-auto block z-[2]" />
      </div>
    </div>
  );
}

export default CommentsContainer;
