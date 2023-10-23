import React from "react";
import Logo from "../UI/Logo";
import { Squash } from "hamburger-react";
import { MdDashboard } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

interface Props {
  isOpened: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const links = [
  {
    text: "Dashboard",
    link: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    text: "Settings",
    link: "/dashboard/settings",
    icon: <BsGear />,
  },
];

const Sidebar = ({ isOpened, toggleSidebar }: Props) => {
  const { pathname } = useLocation();

  return (
    <aside
      className={`w-full lg:!w-[300px] lg:!translate-x-0 transition-all duration-300  fixed top-0 left-0 h-screen max-h-screen overflow-y-scroll bg-white  z-[4] px-[1rem] pt-[2rem] pb-[1rem] ${
        isOpened ? "translate-x-0" : "-translate-x-[100%]"
      }`}
    >
      <header className="flex items-center justify-between">
        <Logo />

        <span className="lg:hidden">
          <Squash size={24} toggled={true} toggle={toggleSidebar} />
        </span>
      </header>

      <div className="mt-[2rem] flex flex-col gap-y-[.7rem]">
        {links?.map((link, index) => {
          return (
            <Link
              className={`${
                pathname === link?.link
                  ? "bg-primary text-white"
                  : "hover:bg-[#0000011d]"
              } px-[1rem] py-[10px] rounded-md`}
              to={link?.link}
              key={index}
            >
              {link?.text}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
