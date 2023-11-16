import React, { useState } from "react";
import Comment from "./SingleComment";
import FormRow from "../../UI/FormRow";
import Editor from "../../UI/Editor";
import Button from "../../UI/Button";

const comments = [
  "You are a motherfucker",
  "I hate your work, bull shit!!",
  "Nigga Men",
  "Fuck you bro",
];

function CommentsContainer() {
  const [text, setText] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);

  const sliceLength = !showMore ? 2 : comments?.length;

  const toggleVisibility = () => setShowMore((prev) => !prev);

  return (
    <div className="flex flex-col gap-y-4 mt-4">
      {comments?.slice(0, sliceLength)?.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}

      {comments?.length > 3 && (
        <p
          className="underline text-[.8rem] cursor-pointer"
          onClick={toggleVisibility}
        >
          {showMore ? "Show Less" : "Show More"}
        </p>
      )}

      <div className="flex flex-col gap-y-3">
        <Editor
          value={text}
          onChange={(value: string) => setText(value)}
          className="h-[180px] min-h-[180px] mb-3 bg-white shadow-md border-none"
        />

        <Button
          text="Submit"
          type="submit"
          className="max-w-[200px] ml-auto block z-[2]"
        />
      </div>
    </div>
  );
}

export default CommentsContainer;
