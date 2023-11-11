import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import AddTime from "../../components/dashboard/timesheet/AddTime";
import TodayDate from "../../components/dashboard/ui/TodayDate";

const Timesheet = () => {
  return (
    <DashboardLayout pageTitle="Time Sheet">
      <TodayDate />
      <AddTime />
    </DashboardLayout>
  );
};

export default Timesheet;
