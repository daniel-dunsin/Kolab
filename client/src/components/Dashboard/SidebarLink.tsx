import React, { ReactElement, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { getUserFromLocalStorage } from "../../utils/tokens";
import checkIsDirector from "../../utils/is-director";

export interface Links {
  text: string;
  link: string;
  icon: ReactElement;
  directorDependent: boolean;
  workspaceDependent: boolean;
}

interface Props extends Links {}

const SidebarLink = ({ directorDependent, icon, text, link }: Links) => {
  const { pathname } = useLocation();

  const { currentWorkspace } = useSelector((state: RootState) => state.workspaces);

  const user = getUserFromLocalStorage();

  return (
    <Fragment>
      {/* 
            if it is director dependent, display if the user is the director of the workspace
        */}
      {(!directorDependent || (directorDependent && checkIsDirector(currentWorkspace))) && (
        <Link
          className={`${
            pathname === link ? "bg-primary text-white" : "hover:bg-[#0000011d]"
          } px-[1rem] py-[10px] rounded-md flex items-center gap-[.8rem]`}
          to={link}
        >
          <span className="inline-block">{icon}</span>
          {text}
        </Link>
      )}
    </Fragment>
  );
};

export default SidebarLink;
