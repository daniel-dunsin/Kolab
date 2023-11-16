import React from "react";
import {
  TableHeader,
  TableHeaderEntry,
  TableLayout,
  TableRow,
  TableRowEntry,
  TableRowsContainer,
} from "../../ui/Table";
import { members } from "../../../pages/dashboard/Members";
import { projects } from "../dashboard-page/Projects";
import { Link } from "react-router-dom";

const headers = [
  {
    width: 200,
    text: "Name",
  },
  {
    width: 200,
    text: "Project",
  },
  {
    width: 200,
    text: "Assigned to",
  },
  {
    width: 200,
    text: "Status",
  },
];

const issues = [
  { name: "Issue 1", assignedTo: members?.[0], project: projects?.[0] },
  { name: "Issue 2", assignedTo: members?.[1], project: projects?.[1] },
];

const IssuesList = () => {
  return (
    <section className="mt-8">
      <TableLayout>
        <TableHeader>
          {headers?.map((header, index) => {
            return (
              <TableHeaderEntry key={index} width={header.width}>
                {header.text}
              </TableHeaderEntry>
            );
          })}
        </TableHeader>
        <TableRowsContainer>
          {issues?.map((issue, index) => (
            <Link
              to={`/dashboard/issues/${index}`}
              key={index}
              className="hover:bg-[rgba(0,0,0,.1)]"
            >
              <TableRow InnerProps={{ className: "!text-[.9rem]" }}>
                <TableRowEntry width={headers?.[0]?.width}>
                  {issue?.name}
                </TableRowEntry>
                <TableRowEntry width={headers?.[1]?.width}>
                  {issue?.project?.name}
                </TableRowEntry>

                <TableRowEntry width={headers?.[2]?.width}>
                  {/* Display user info */}
                  <div className="flex items-center gap-2">
                    <img
                      className="w-[30px] h-[30px] object-center object-cover rounded-full"
                      src={issue.assignedTo.profilePicture}
                      alt={issue.assignedTo.email}
                    />
                    <p>
                      {issue.assignedTo.firstName} {issue.assignedTo.lastName}
                    </p>
                  </div>
                </TableRowEntry>

                <TableRowEntry width={headers?.[3]?.width}>
                  {issue?.project?.name}
                </TableRowEntry>
              </TableRow>
            </Link>
          ))}
        </TableRowsContainer>
      </TableLayout>
    </section>
  );
};

export default IssuesList;
