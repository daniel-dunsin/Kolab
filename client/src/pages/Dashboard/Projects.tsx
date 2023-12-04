import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import SearchBox from "../../components/UI/SearchBox";
import Button from "../../components/UI/Button";
import TodayDate from "../../components/Dashboard/UI/TodayDate";
import { BiLoaderAlt, BiPlus } from "react-icons/bi";
import CreateProjectModal from "../../components/Modals/CreateProjectModal";
import SingleProject from "../../components/Dashboard/project/SingleProject";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { getProject } from "../../services/project.services";

const Projects = () => {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { projects } = useSelector((state: RootState) => state.projects);
  const { currentWorkspace } = useSelector((state: RootState) => state.workspaces);
  const dispatch = useDispatch();

  const fetchProjects = async () => {
    setLoading(true);
    await dispatch(getProject({ search }));
    setLoading(false);
  };

  useEffect(() => {
    if (currentWorkspace) {
      fetchProjects();
    }
  }, [search, currentWorkspace]);

  return (
    <DashboardLayout pageTitle="Projects">
      <>{modalOpen && <CreateProjectModal closeModal={() => setModalOpen(false)} />}</>
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
        <SearchBox placeholder="Search Projects..." value={search} setValue={setSearch} />

        <div className="mt-5">
          {loading && (
            <div className="w-full h-[150px] flex items-center justify-center gap-2">
              <BiLoaderAlt size={26} className="text-primary animate-spin" />
              <p>Loading Projects</p>
            </div>
          )}

          {!loading && projects?.length === 0 && (
            <div className="w-full h-[150px] flex items-center justify-center">
              <p>You have not added any project</p>
            </div>
          )}

          {projects?.length > 0 &&
            projects?.map((project, index) => {
              return <SingleProject {...project} key={index} />;
            })}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Projects;
