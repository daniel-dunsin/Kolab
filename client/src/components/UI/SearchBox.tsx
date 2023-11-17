import React, { Dispatch, HTMLAttributes, SetStateAction } from "react";
import IconContainer from "../Dashboard/UI/IconContainer";
import { BiSearch } from "react-icons/bi";

interface Props extends HTMLAttributes<HTMLInputElement> {
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
}

const SearchBox = ({ className, value, setValue, ...props }: Props) => {
  return (
    <div className="flex items-center gap-[.5rem] w-full">
      <input
        {...props}
        className={`${className} outline-none border-[1.5px] focus:border-primary text-mainBlack placeholder:text-mainBlack text-[.9rem] flex-1 px-[.8rem] py-[.4rem] rounded-md`}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
