import React, { useEffect } from "react";
import {
  TableHeader,
  TableHeaderEntry,
  TableLayout,
  TableRow,
  TableRowEntry,
  TableRowsContainer,
} from "../../UI/Table";
import { members } from "../../../pages/Dashboard/Members";
import { projects } from "../dashboard-page/Projects";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getIssues } from "../../../services/issue.services";
import IssueStatusBox from "./IssueStatus";

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

const IssuesList = () => {
  const dispatch = useDispatch();
  const { issues } = useSelector((state: RootState) => state?.issues);

  // no need to do this, the fetching is done in IssuesFilter.tsx
  // useEffect(() => {
  //   if (currentWorkspace) {
  //     dispatch(getIssues());
  //   }
  // }, [currentWorkspace]);

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
          {issues?.length === 0 && <p className="p-2 text-center">No issues at the moment</p>}
          {issues?.length > 0 &&
            issues?.map((issue, index) => (
              <Link to={`/dashboard/issues/${issue?._id}`} key={index} className="hover:bg-[rgba(0,0,0,.1)]">
                <TableRow InnerProps={{ className: "!text-[.9rem]" }}>
                  <TableRowEntry width={headers?.[0]?.width}>{issue?.title}</TableRowEntry>
                  <TableRowEntry width={headers?.[1]?.width}>{issue?.projectId?.name}</TableRowEntry>

                  <TableRowEntry width={headers?.[2]?.width}>
                    {/* Display user info */}
                    <div className="flex items-center gap-2">
                      <img
                        className="w-[30px] h-[30px] object-center object-cover rounded-full"
                        src={issue?.userId?.profilePicture}
                        alt={issue?.userId?.email}
                      />
                      <p>
                        {issue?.userId?.firstName} {issue?.userId?.lastName}
                      </p>
                    </div>
                  </TableRowEntry>

                  <TableRowEntry width={headers?.[3]?.width}>
                    <IssueStatusBox status={issue?.status} />
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
