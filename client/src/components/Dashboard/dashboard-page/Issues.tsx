import React from "react";
import ContentBox from "../UI/ContentBox";
import IconContainer from "../UI/IconContainer";
import { BiFolder } from "react-icons/bi";

const issues = [
  { name: "Project One", status: "Backlog", timeSpent: "00:40:00" },
  { name: "Project Two", status: "Done", timeSpent: "00:15:00" },
  { name: "Project Three", status: "Pending", timeSpent: "00:15:00" },
];

const Issues = () => {
  return (
    <ContentBox header="Issues" headerSize="large" maxHeight={400}>
      <div className="mt-2">
        {issues?.map((issue, index) => {
          return (
            <article
              key={index}
              className="border-[1.5px] rounded-[10px] py-[.7rem] px-[0.7rem] flex items-center justify-between my-2"
            >
              <div className="flex items-center gap-[.7rem] ">
                <IconContainer width={20} height={20} icon={<BiFolder />} />
                <p className="truncate">{issue?.name}</p>
              </div>

              <p className=" text-[.7rem] uppercase font-bold cursor-pointer p-1 rounded-sm text-green-700 bg-green-300">
                {issue?.status}
              </p>

              <p className="font-bold text-[.8rem] ">{issue.timeSpent}</p>
            </article>
          );
        })}
      </div>
    </ContentBox>
  );
};

export default Issues;
