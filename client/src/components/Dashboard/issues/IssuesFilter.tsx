import React, { useEffect, useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { getIssues } from "../../../services/issue.services";

const IssuesFilter = () => {
  const { currentWorkspace } = useSelector((state: RootState) => state?.workspaces);
  const [assignedToUser, setAssignedToUser] = useState<boolean>(false);
  const dispatch = useDispatch();

  const select = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.selectedIndex === 0) {
      setAssignedToUser(false);
    } else {
      setAssignedToUser(true);
    }
  };

  useEffect(() => {
    if (currentWorkspace?._id) {
      dispatch(getIssues(assignedToUser));
    }
  }, [currentWorkspace, assignedToUser]);

  return (
    <select
      onChange={select}
      className="p-2 text-[.8rem] md:w-[240px] outline-none border-[1.5px] hover:border-primary rounded-md"
    >
      <option>All issues</option>
      <option>Assigned to me</option>
    </select>
  );
};

export default IssuesFilter;
