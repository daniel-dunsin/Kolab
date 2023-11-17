import React, { useEffect } from "react";
import ContentBox from "../UI/ContentBox";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { getWorkspaceMembers } from "../../../services/workspace-members.services";

const Members = () => {
  const { members, workspaces } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspaceMembers());
  }, [workspaces?.currentWorkspace]);

  return (
    <ContentBox headerSize="small" header="Members" maxHeight={150}>
      <div className="mt-2">
        {members?.map(({ userId }, index) => {
          return (
            <article
              key={index}
              className="border-[1.5px] rounded-[10px] py-[.2rem] px-[0.5rem] flex items-center gap-[.7rem] my-2"
            >
              <img
                src={userId?.profilePicture}
                className="w-[30px] h-[30px] object-cover object-center rounded-full"
                alt={userId?.firstName + " profile picture"}
              />

              <div>
                <h5 className="font-bold leading-1 text-[1.1rem]">
                  {userId?.firstName} {userId?.lastName}
                </h5>
                <p className="truncate my-0 py-0 text-[.8rem]">{userId?.email}</p>
              </div>
            </article>
          );
        })}
      </div>
    </ContentBox>
  );
};

export default Members;
