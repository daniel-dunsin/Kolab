import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getTodaysDate } from "../../utils/get-date";
import TimeTracked from "../../components/dashboard/dashboard-page/TimeTracked";
import ProjectsWorked from "../../components/dashboard/dashboard-page/ProjectsWorked";
import NoOfIssues from "../../components/dashboard/dashboard-page/NoOfIssues";
import Members from "../../components/dashboard/dashboard-page/Members";
import TodoList from "../../components/dashboard/dashboard-page/TodoList";
import Projects from "../../components/dashboard/dashboard-page/Projects";
import Issues from "../../components/dashboard/dashboard-page/Issues";
import TodayDate from "../../components/dashboard/ui/TodayDate";

const Dashboard = () => {
  return (
    <DashboardLayout pageTitle="Dashboard">
      <TodayDate />
      {/* Overviews */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <TimeTracked />
        <ProjectsWorked />
        <NoOfIssues />
      </section>
      {/* Other Sections */}
      <section className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-6">
        <Projects />
        <Issues />
        <Members />
        <TodoList />
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
