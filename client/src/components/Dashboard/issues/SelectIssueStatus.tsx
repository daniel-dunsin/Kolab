import React, { useState, ChangeEvent } from "react";

const status = ["Done", "Backlog", "In Progress"];

function SelectIssueStatus() {
  const [selectedStatus, setStatus] = useState(status?.[0]);

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(status?.[e.target.selectedIndex]);
  };

  return (
    <select
      value={selectedStatus}
      onChange={onSelect}
      className="w-full p-[10px] rounded-md border-[1.5px] cursor-pointer max-w-[250px]"
    >
      {status?.map((status, index) => {
        return (
          <option value={status} key={index}>
            Mark as <b className="lowercase">{status}</b>
          </option>
        );
      })}
    </select>
  );
}

export default SelectIssueStatus;
