import React, { HTMLAttributes } from "react";
import IconContainer from "../Dashboard/UI/IconContainer";
import { BiSearch } from "react-icons/bi";

interface Props extends HTMLAttributes<HTMLInputElement> {}

const SearchBox = ({ className, ...props }: Props) => {
  return (
    <div className="flex items-center gap-[.5rem] w-full">
      <input
        {...props}
        className={`${className} outline-none border-[1.5px] focus:border-primary text-mainBlack placeholder:text-mainBlack text-[.9rem] flex-1 px-[.8rem] py-[.4rem] rounded-md`}
      />
      <IconContainer width={35} height={35} icon={<BiSearch />} />
    </div>
  );
};

export default SearchBox;
