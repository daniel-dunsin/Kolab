import React from "react";
import Logo from "../ui/Logo";
import { Squash } from "hamburger-react";
import { MdDashboard } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Workspaces from "./ui/Workspaces";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUserFromLocalStorage } from "../../utils/tokens";
import { BiNote, BiNotepad } from "react-icons/bi";
import { LuCalendarClock } from "react-icons/lu";
import { FaCircleExclamation } from "react-icons/fa6";
import Members from "./dashboard-page/Members";

interface Props {
  isOpened: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const links = [
  {
    text: "Dashboard",
    link: "/dashboard",
    icon: <MdDashboard />,
    directorDependent: false,
  },
  {
    text: "To-Do",
    link: "/dashboard/todo",
    icon: <BiNotepad />,
    directorDependent: false,
  },
  {
    text: "Timesheet",
    link: "/dashboard/timesheet",
    icon: <LuCalendarClock />,
    directorDependent: false,
  },
  {
    text: "Issues Tracker",
    link: "/dashboard/issues",
    icon: <FaCircleExclamation />,
    directorDependent: false,
  },

  {
    text: "Projects",
    link: "/dashboard/projects",
    icon: <BiNote />,
    directorDependent: false,
  },
  {
    text: "Workspace Settings",
    link: "/dashboard/workspace/settings",
    icon: <BsGear />,
    directorDependent: true,
  },
];

const Sidebar = ({ isOpened, toggleSidebar }: Props) => {
  const { pathname } = useLocation();

  const { currentWorkspace } = useSelector(
    (state: RootState) => state.workspaces
  );
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
          return (
            /**
             * if the link is director dependent display only if the person is a director
             */
            <>
              {(!link?.directorDependent ||
                (link?.directorDependent &&
                  currentWorkspace?._id === user._id)) && (
                <Link
                  className={`${
                    pathname === link?.link
                      ? "bg-primary text-white"
                      : "hover:bg-[#0000011d]"
                  } px-[1rem] py-[10px] rounded-md flex items-center gap-[.8rem]`}
                  to={link?.link}
                  key={index}
                >
                  <span className="inline-block">{link?.icon}</span>
                  {link?.text}
                </Link>
              )}
            </>
          );
        })}
      </div>

      <Workspaces />
    </aside>
  );
};

export default Sidebar;
