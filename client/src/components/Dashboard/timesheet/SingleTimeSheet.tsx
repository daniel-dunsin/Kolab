import moment from "moment";
import React from "react";
import { formatTime, getTimeDiff } from "../../../utils/get-date";
import IconContainer from "../UI/IconContainer";
import { BiTrash } from "react-icons/bi";

interface Props {
  clockIn: Date;
  clockOut: Date;
  date: Date;
  issue: string;
  project: string;
  text: string;
}

const SingleTimeSheet = ({
  clockIn,
  clockOut,
  date,
  issue,
  text,
  project,
}: Props) => {
  const { hours, minutes } = getTimeDiff(clockOut, clockIn);

  return (
    <article className="rounded-md bg-white my-5 overflow-hidden">
      <header className="w-full py-2 px-4 bg-[#e8e7e7] flex items-center justify-between gap-3">
        <p className="font-medium capitalize text-[.8rem] ">
          {moment(date).fromNow()}
        </p>
        <p className="text-[.8rem]">
          Total:{" "}
          <b className="text-[1.2rem]">
            {formatTime(hours)}:{formatTime(minutes)}
          </b>
        </p>
      </header>
      <div className="p-2 bg-white text-[.9rem] flex gap-x-6 gap-y-4 flex-wrap flex-col sm:flex-row w-full justify-between">
        {/* What i worked on */}
        <p className="">{text}</p>

        {/* Issue & Project  */}
        <p
          className="flex items-center gap-[5px]  cursor-pointer flex-1"
          title={`Project = ${project}\nIssue = ${issue}`}
        >
          <span className="block w-[5px] h-[5px] bg-red-500 rounded-full"></span>
          <b>{project}</b> - {issue}
        </p>

        {/* Delete icon */}
        <span className="block justify-self-end flex-1 max-w-fit lg:ml-auto">
          <IconContainer
            width={30}
            height={30}
            icon={<BiTrash />}
            bg="bg-red-500"
          />
        </span>
      </div>
    </article>
  );
};

export default SingleTimeSheet;
