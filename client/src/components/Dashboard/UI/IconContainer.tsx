import React, { ReactElement } from "react";

interface Props {
  icon: ReactElement;
  width: number;
  height: number;
  bg?: string;
  onClick?: () => void;
}

const IconContainer = ({ icon, width, height, onClick, bg }: Props) => {
  return (
    <span
      className={`flex items-center justify-center cursor-pointer 
      ${bg ? bg : "bg-primary"}
       rounded-xl text-white`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${width * 0.7}px`,
      }}
      onClick={onClick}
    >
      {icon}
    </span>
  );
};

export default IconContainer;
