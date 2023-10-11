import React, { ButtonHTMLAttributes, ReactElement } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: ReactElement;
}

const Button = ({ text, className, icon, ...props }: Props) => {
  return (
    <button
      {...props}
      className={` bg-primary p-2 rounded-md text-white text-[.8rem] min-w-[120px] hover:opacity-90 flex items-center justify-center gap-[.8rem] ${className}`}
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
