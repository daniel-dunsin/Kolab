import React from "react";
import ContentBox from "../ui/ContentBox";
import IconContainer from "../ui/IconContainer";
import { BiTimer } from "react-icons/bi";

const TimeTracked = () => {
  return (
    <ContentBox headerSize="large" header="Worked This Week">
      <div className="flex items-center justify-between mt-6 gap-[1rem]">
        <h1 className="font-bold text-[1.8rem]">40:00:05</h1>
        <IconContainer width={60} height={60} icon={<BiTimer />} />
      </div>
    </ContentBox>
  );
};

export default TimeTracked;
