import React, { useState } from "react";
import { BiGlobe } from "react-icons/bi";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { Squash } from "hamburger-react";
import Logo from "../ui/Logo";

function Navbar() {
  const [linksOpen, setLinksOpen] = useState<boolean>(false);

  return (
    <nav className="border-b-[1.5px]">
      <div className="flex items-center justify-between max-w-[1000px] p-[1rem] mx-auto text-mainBlack">
        {/* Navbar brand */}
        <div>
          <Logo />
        </div>

        {/* hamburger */}
        <div className="md:hidden block">
          <Squash size={23} toggled={false} toggle={setLinksOpen} />
        </div>

        {/* links */}

        <ul
          className={`flex items-center z-[5] gap-[1rem] text-[.95rem] fixed md:sticky md:flex-row top-0 left-0 md:bg-transparent bg-white md:h-fit h-screen flex-col md:w-fit w-screen justify-center md:!translate-y-0 transition-all duration-300 ${
            linksOpen ? "translate-y-0" : "-translate-y-[100%]"
          }`}
        >
          <header className="md:hidden flex items-center justify-between p-[1rem] absolute top-0 left-0 w-full">
            <Logo />
            <span>
              <Squash size={23} toggled={true} toggle={setLinksOpen} />
            </span>
          </header>
          <li>
            <span className="inline-block mr-1 align-middle">
              <BiGlobe />
            </span>
            EN
          </li>

          <li>
            <Link to="/about">About Us</Link>
          </li>

          <li>
            <Link to={"/login"}>Log In</Link>
          </li>

          <li>
            <Link to={"/signup"}>
              <Button text="Sign up for free" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
