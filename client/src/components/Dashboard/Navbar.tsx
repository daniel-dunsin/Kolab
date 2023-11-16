import React, { useEffect, useRef, useState } from "react";
import Logo from "../UI/Logo";
import UserInfoTab from "./UI/UserInfoTab";
import useWidth from "../../utils/hooks/useWidth";
import { IScreen } from "../../interfaces/handlers.interface";
import { Squash } from "hamburger-react";

interface Props {
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  pageTitle: string;
}

const Navbar = ({ toggleSidebar, pageTitle }: Props) => {
  const ref = useRef<any>();

  return (
    <nav className="bg-white w-full p-[1rem] h-[86px]" ref={ref}>
      <div className="flex items-center justify-between">
        <span className="lg:hidden">
          <Logo />
        </span>
        <h2 className="hidden lg:block font-medium text-[1.5rem] text-mainBlack">
          {pageTitle}
        </h2>

        <div className="flex items-center">
          <UserInfoTab />

          <div className="lg:hidden">
            <Squash size={24} toggled={false} toggle={toggleSidebar} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
