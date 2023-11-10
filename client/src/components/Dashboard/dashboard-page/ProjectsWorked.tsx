import React from "react";
import ContentBox from "../ui/ContentBox";
import IconContainer from "../ui/IconContainer";
import { BiFolder } from "react-icons/bi";

const ProjectsWorked = () => {
  return (
    <ContentBox headerSize="large" header="Projects Worked">
      <div className="flex items-center justify-between mt-6 gap-[1rem]">
        <h1 className="font-bold text-[1.8rem]">03</h1>
        <IconContainer width={60} height={60} icon={<BiFolder />} />
      </div>
    </ContentBox>
  );
};

export default ProjectsWorked;
