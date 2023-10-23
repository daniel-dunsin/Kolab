import React, { useState } from "react";
import Logo from "../UI/Logo";
import UserInfoTab from "./UI/UserInfoTab";
import useWidth from "../../utils/hooks/useWidth";
import { IScreen } from "../../interfaces/handlers.interface";
import { Squash } from "hamburger-react";

interface Props {
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ toggleSidebar }: Props) => {
  const width = useWidth();

  return (
    <nav className="bg-white w-full p-[1rem]">
      <div className="flex items-center justify-between">
        <span className="lg:hidden">
          <Logo />
        </span>
        <h2 className="hidden lg:block font-medium text-[1.5rem] text-mainBlack">
          Dashboard
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
