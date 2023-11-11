import React from "react";
import FormRow from "../../ui/FormRow";

const issues = [
  {
    text: "Issue 1",
    project: { text: "Project 1 is a very very good project bro" },
    status: "Done",
  },
];

const IssuesList = () => {
  return (
    <div className="p-2 rounded-xl bg-white absolute top-[150%] right-0 max-w-[400px] w-[90vw] shadow-md min-h-[200px] z-[2]">
      <FormRow type="search" placeholder="Find issue or project..." />

      <div className="mt-4">
        {issues?.map((issue, index) => {
          return (
            <article
              key={index}
              className="flex gap-[.5rem] items-center p-2 hover:bg-[#eff0ef] rounded-md font-bold text-[.8rem]"
            >
              <span className="w-[5px] h-[5px] rounded-full bg-primary" />
              <p>{issue?.text}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default IssuesList;
