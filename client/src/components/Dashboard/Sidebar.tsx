import React, { Fragment } from "react";
import Logo from "../UI/Logo";
import { Squash } from "hamburger-react";
import { MdDashboard } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Workspaces from "./UI/Workspaces";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUserFromLocalStorage } from "../../utils/tokens";
import { BiNote, BiNotepad } from "react-icons/bi";
import { LuCalendarClock, LuUsers } from "react-icons/lu";
import { FaCircleExclamation } from "react-icons/fa6";
import Members from "./dashboard-page/Members";
import SidebarLink, { Links } from "./SidebarLink";

interface Props {
  isOpened: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const links: Links[] = [
  {
    text: "Dashboard",
    link: "/dashboard",
    icon: <MdDashboard />,
    workspaceDependent: false,
    directorDependent: false,
  },
  {
    text: "To-Do",
    link: "/dashboard/todo",
    icon: <BiNotepad />,
    workspaceDependent: false,
    directorDependent: false,
  },
  {
    text: "Timesheet",
    link: "/dashboard/timesheet",
    icon: <LuCalendarClock />,
    workspaceDependent: true,
    directorDependent: false,
  },
  {
    text: "Issues Tracker",
    link: "/dashboard/issues",
    icon: <FaCircleExclamation />,
    workspaceDependent: true,
    directorDependent: false,
  },

  {
    text: "Projects",
    link: "/dashboard/projects",
    icon: <BiNote />,
    workspaceDependent: true,
    directorDependent: false,
  },
  {
    text: "Members",
    link: "/dashboard/members",
    icon: <LuUsers />,
    workspaceDependent: true,
    directorDependent: false,
  },
  {
    text: "Workspace Settings",
    link: "/dashboard/workspace/settings",
    icon: <BsGear />,
    workspaceDependent: true,
    directorDependent: true,
  },
];

const Sidebar = ({ isOpened, toggleSidebar }: Props) => {
  const { pathname } = useLocation();

  const { currentWorkspace } = useSelector((state: RootState) => state.workspaces);
  const user = getUserFromLocalStorage();

  return (
    <aside
      className={`w-full lg:!w-[300px] flex flex-col justify-between lg:!translate-x-0 transition-all duration-300  fixed top-0 left-0 h-screen max-h-screen overflow-y-scroll bg-white  z-[4] px-[1rem] pt-[2rem] pb-[1rem] ${
        isOpened ? "translate-x-0" : "-translate-x-[100%]"
      }`}
    >
      <header className="flex items-center justify-between">
        <Logo />

        <span className="lg:hidden">
          <Squash size={24} toggled={true} toggle={toggleSidebar} />
        </span>
      </header>

      <div className="mt-[2rem] flex flex-col gap-y-[.7rem] max-h-[65vh] h-[65vh] overflow-y-scroll">
        {links?.map((link, index) => {
          // if it is workspace dependent, display it if there is a current workspace
          if (link?.workspaceDependent) {
            if (currentWorkspace) {
              return <SidebarLink key={index} {...link} />;
            } else {
              return <Fragment key={index}></Fragment>;
            }
          } else return <SidebarLink key={index} {...link} />;
        })}
      </div>

      <Workspaces />
    </aside>
  );
};

export default Sidebar;
