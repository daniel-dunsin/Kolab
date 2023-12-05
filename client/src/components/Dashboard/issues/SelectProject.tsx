import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import { IProject } from "../../../interfaces/project.interface";

interface Props {
  project: IProject;
  setProject: Dispatch<SetStateAction<IProject | undefined>>;
  projects: IProject[];
}

const SelectProject = ({ project, setProject, projects }: Props) => {
  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setProject(projects[e.target.selectedIndex - 1]);
  };

  return (
    <select
      value={project?.name}
      className="w-full p-[10px] rounded-md border-[1.5px] cursor-pointer text-[.8rem] font-bold"
      onChange={onSelect}
      defaultValue={"no project"}
    >
      <option value={"no project"} disabled={true}>
        Select Project
      </option>
      {projects?.map((project, index) => {
        return (
          <option value={project.name} key={index}>
            {project.name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectProject;
