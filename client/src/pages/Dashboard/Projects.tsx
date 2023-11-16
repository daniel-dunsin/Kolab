import React, { useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import SearchBox from "../../components/UI/SearchBox";
import Button from "../../components/UI/Button";
import TodayDate from "../../components/Dashboard/UI/TodayDate";
import { BiPlus } from "react-icons/bi";
import CreateProjectModal from "../../components/Modals/CreateProjectModal";
import SingleProject from "../../components/Dashboard/project/SingleProject";

const projects = [
  {
    name: "Project 1",
  },
];

const Projects = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <DashboardLayout pageTitle="Projects">
      <>
        {modalOpen && (
          <CreateProjectModal closeModal={() => setModalOpen(false)} />
        )}
      </>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <TodayDate />
        <Button
          text="Add Project"
          icon={<BiPlus />}
          onClick={() => {
            setModalOpen(true);
          }}
        />
      </div>

      <section className="mt-6">
        <SearchBox placeholder="Search Projects..." />

        <div className="mt-5">
          {projects?.map((project, index) => {
            return <SingleProject project={project.name} key={index} />;
          })}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Projects;
