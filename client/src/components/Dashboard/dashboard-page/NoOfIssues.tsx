import React from "react";
import ContentBox from "../UI/ContentBox";
import IconContainer from "../UI/IconContainer";
import { BsExclamationCircle } from "react-icons/bs";

const NoOfIssues = () => {
  return (
    <ContentBox headerSize="large" header="Pending Issues">
      <div className="flex items-center justify-between mt-6 gap-[1rem]">
        <h1 className="font-bold text-[1.8rem]">15</h1>
        <IconContainer width={60} height={60} icon={<BsExclamationCircle />} />
      </div>
    </ContentBox>
  );
};

export default NoOfIssues;
