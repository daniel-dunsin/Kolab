import React from "react";
import Logo from "../UI/Logo";

const Navbar = () => {
  return (
    <nav className="bg-white w-full p-[1rem] min-h-[70px]">
      <div>
        <span className="lg:hidden">
          <Logo />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
