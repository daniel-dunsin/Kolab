import React, { useState } from "react";
import { BiChevronDown, BiChevronUp, BiPlus } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { Link } from "react-router-dom";
import CreateWorkspaceModal from "../../Modals/CreateWorkspaceModal";
import { useDispatch, useSelector } from "react-redux";
import { openCreateWorkspaceModal } from "../../../store/handlers.slice";
import { RootState } from "../../../store";
import { updateCurrentWorkspace } from "../../../store/workspace.slice";

const Workspaces = () => {
  const [workspaceTabOpened, setWorkspaceTabOpened] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { workspaces, currentWorkspace } = useSelector((state: RootState) => state.workspaces);

  return (
    <footer className="relative">
      {
        <div
          className="flex items-center gap-[.8rem] mt-[1rem] cursor-pointer"
          onClick={() => setWorkspaceTabOpened(!workspaceTabOpened)}
        >
          {currentWorkspace && (
            <>
              <img
                src={currentWorkspace?.picture}
                alt=""
                className="w-[30px] h-[30px] rounded-full object-center object-cover"
              />

              <p className="text-mainBlack font-bold  truncate">{currentWorkspace?.name}</p>
            </>
          )}
          {!currentWorkspace && <p className="text-mainBlack font-bold  truncate">New Workspace</p>}
          <span className="text-[1.4rem]">{workspaceTabOpened ? <BiChevronUp /> : <BiChevronDown />}</span>
        </div>
      }

      {/* workspaces list */}
      {workspaceTabOpened && (
        <div className="flex flex-col absolute bottom-[101%] left-0 w-full bg-[#f8f8f8] h-[150px] max-h-[150px] overflow-y-scroll z-[5] rounded-md shadow-md hover:shadow-lg cursor-pointer text-[.8rem]">
          {workspaces?.map((workspace, index) => {
            return (
              <p
                key={index}
                className="hover:bg-[rgba(0,0,0,0.07)] p-[10px]"
                onClick={() => {
                  dispatch(updateCurrentWorkspace(workspace));
                  setWorkspaceTabOpened(false);
                }}
              >
                {workspace?.name}
              </p>
            );
          })}

          <div
            className="hover:bg-[rgba(0,0,0,0.07)] p-[10px] flex items-center gap-[.2rem]"
            // to={"/dashboard/workspace/new"}
            onClick={() => dispatch(openCreateWorkspaceModal())}
          >
            <BiPlus />
            New Workspace
          </div>
        </div>
      )}
    </footer>
  );
};

export default Workspaces;
