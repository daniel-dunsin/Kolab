import React from "react";
import { Link, useLocation } from "react-router-dom";

const Logo = () => {
  const location = useLocation();

  return (
    <Link
      to={location.pathname.includes("dashboard") ? "/dashboard" : "/"}
      title="Back to home"
      className="text-[1.5rem] font-bold text-primary cursor-pointer"
    >
      K<span className="text-secondary">ol</span>ab
    </Link>
  );
};

export default Logo;
