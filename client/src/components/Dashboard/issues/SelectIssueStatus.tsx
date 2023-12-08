import React, { useState, ChangeEvent } from "react";
import { IssueStatus } from "../../../interfaces/issues.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useParams } from "react-router-dom";
import Swal, { SweetAlertResult } from "sweetalert2";
import { useDispatch } from "react-redux";
import { editIssueStatus } from "../../../services/issue.services";

function SelectIssueStatus() {
  const { currentIssue } = useSelector((state: RootState) => state.issues);
  const { id } = useParams();
  const [selectedStatus, setStatus] = useState<IssueStatus>(currentIssue?.status as IssueStatus);
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = currentIssue?.status === IssueStatus.pending ? IssueStatus.done : IssueStatus.pending;
    Swal.fire({
      title: "Edit issue status",
      text: "Are you sure you want to edit this issue status?",
      icon: "warning",
      confirmButtonColor: "#76b1a6",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonColor: "darkred",
      cancelButtonText: "No",
    }).then(async (result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const data = await dispatch(
          editIssueStatus({
            id,
            status: nextStatus,
          })
        );
        if (!data?.error) {
          setStatus(nextStatus);
        }
      }
    });
  };

  React.useEffect(() => {
    setStatus(currentIssue?.status as IssueStatus);
  }, [currentIssue]);

  return (
    <select
      value={selectedStatus}
      onChange={onChange}
      className="w-full p-[10px] rounded-md border-[1.5px] cursor-pointer max-w-[250px]"
    >
      <option value={IssueStatus.pending}>Pending</option>
      <option value={IssueStatus.done}>Done</option>
    </select>
  );
}

export default SelectIssueStatus;
