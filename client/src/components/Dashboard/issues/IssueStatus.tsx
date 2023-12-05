import React from "react";
import { IssueStatus } from "../../../interfaces/issues.interface";

interface Props {
  status: IssueStatus;
}

const IssueStatusBox = ({ status }: Props) => {
  return (
    <p
      className={`p-2 rounded-sm ${
        status === IssueStatus.done ? "bg-green-300 text-green-800" : "bg-gray-300 text-gray-800"
      } max-w-fit uppercase font-bold text-[.8rem]`}
    >
      {status}
    </p>
  );
};

export default IssueStatusBox;
