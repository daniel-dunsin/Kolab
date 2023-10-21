import React from "react";
import Logo from "../UI/Logo";
import { Squash } from "hamburger-react";

const Sidebar = () => {
  return (
    <aside className="w-full lg:w-[300px] fixed top-0 left-0 h-screen max-h-screen overflow-y-scroll bg-white z-[4] px-[1rem] pt-[2rem] pb-[1rem]">
      <header className="flex items-center justify-between">
        <Logo />

        <span className="lg:hidden">
          <Squash size={24} toggled={true} />
        </span>
      </header>
    </aside>
  );
};

export default Sidebar;
