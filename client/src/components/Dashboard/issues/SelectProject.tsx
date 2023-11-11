import React, { Dispatch, SetStateAction, ChangeEvent } from "react";

interface Props {
  project: { name: string };
  setProject: Dispatch<SetStateAction<{ name: string }>>;
  projects: { name: string }[];
}

const SelectProject = ({ project, setProject, projects }: Props) => {
  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setProject(projects[e.target.selectedIndex]);
  };

  return (
    <select
      value={project?.name}
      className="w-full p-[10px] rounded-md border-[1.5px] cursor-pointer"
      onChange={onSelect}
    >
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
