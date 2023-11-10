import React from "react";
import ContentBox from "../ui/ContentBox";
import IconContainer from "../ui/IconContainer";
import { BiFolder } from "react-icons/bi";

const projects = [
  { name: "Project One", timeSpent: "00:40:00" },
  { name: "Project Two", timeSpent: "00:15:00" },
];

const Projects = () => {
  return (
    <ContentBox header="Projects" headerSize="large" maxHeight={400}>
      <div className="mt-2">
        {projects?.map((project, index) => {
          return (
            <article
              key={index}
              className="border-[1.5px] rounded-[10px] py-[.7rem] px-[0.7rem] flex items-center justify-between my-2"
            >
              <div className="flex items-center gap-[.7rem]">
                <IconContainer width={20} height={20} icon={<BiFolder />} />
                <p>{project?.name}</p>
              </div>
              <p className="font-bold text-[.8rem]">{project.timeSpent}</p>
            </article>
          );
        })}
      </div>
    </ContentBox>
  );
};

export default Projects;
