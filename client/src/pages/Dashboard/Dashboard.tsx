import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { getTodaysDate } from "../../utils/get-date";
import TimeTracked from "../../components/Dashboard/dashboard-page/TimeTracked";
import ProjectsWorked from "../../components/Dashboard/dashboard-page/ProjectsWorked";
import NoOfIssues from "../../components/Dashboard/dashboard-page/NoOfIssues";
import Members from "../../components/Dashboard/dashboard-page/Members";
import TodoList from "../../components/Dashboard/dashboard-page/TodoList";
import Projects from "../../components/Dashboard/dashboard-page/Projects";
import Issues from "../../components/Dashboard/dashboard-page/Issues";
import TodayDate from "../../components/Dashboard/UI/TodayDate";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Dashboard = () => {
  const currentWorkspace = useSelector(
    (state: RootState) => state?.workspaces?.currentWorkspace
  );

  return (
    <DashboardLayout pageTitle="Dashboard">
      <TodayDate />
      {/* Overviews */}
      <>
        {currentWorkspace && (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <TimeTracked />
            <ProjectsWorked />
            <NoOfIssues />
          </section>
        )}
      </>
      {/* Other Sections */}
      <section className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-6">
        {currentWorkspace && (
          <>
            <Projects />
            <Issues />
            <Members />
          </>
        )}
        <TodoList />
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
