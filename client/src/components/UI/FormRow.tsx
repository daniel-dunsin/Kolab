import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function FormRow({ label, className, ...props }: Props) {
  return (
    <div className="flex flex-col  col-span-1 gap-y-[0.2rem] w-full flex-[50%]">
      {label && (
        <label htmlFor={props.name} className="text-[.8rem]">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`p-2 text-[.8rem] w-full outline-none border-[1.5px] hover:border-primary rounded-md ${className}`}
      />
    </div>
  );
}

export default FormRow;
