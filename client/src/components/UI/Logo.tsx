import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to={"/"}
      title="Back to home"
      className="text-[1.5rem] font-bold text-primary cursor-pointer"
    >
      K<span className="text-secondary">ol</span>ab
    </Link>
  );
};

export default Logo;
