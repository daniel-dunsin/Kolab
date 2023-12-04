import React from "react";
import ContentBox from "../UI/ContentBox";
import IconContainer from "../UI/IconContainer";
import { BiFolder } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { formatNumber } from "../../../utils/get-date";

const ProjectsWorked = () => {
  const { projects } = useSelector((state: RootState) => state.projects);

  // no need to fetch the projects again, another component withing the same page is already fetching it

  return (
    <ContentBox headerSize="large" header="Projects Worked">
      <div className="flex items-center justify-between mt-6 gap-[1rem]">
        <h1 className="font-bold text-[1.8rem]">{formatNumber(projects.length || 0)}</h1>
        <IconContainer width={60} height={60} icon={<BiFolder />} />
      </div>
    </ContentBox>
  );
};

export default ProjectsWorked;
