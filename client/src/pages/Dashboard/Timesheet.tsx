import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import AddTime from "../../components/Dashboard/timesheet/AddTime";
import TodayDate from "../../components/Dashboard/UI/TodayDate";
import SingleTimeSheet from "../../components/Dashboard/timesheet/SingleTimeSheet";

const timesheets = [
  {
    clockIn: new Date(2023, 10, 24, 14, 20),
    clockOut: new Date(2023, 10, 24, 14, 59),
    date: new Date("2023-11-24"),
    text: "feat:modal update",
    issue: "ATP Project",
    project: "Frontend Dev",
  },

  {
    clockIn: new Date(2023, 10, 22, 4, 12),
    clockOut: new Date(2023, 10, 22, 14, 19),
    date: new Date("2023-11-10"),
    text: "Added create listing page",
    issue: "ATP Project",
    project: "Frontend Dev",
  },

  {
    clockIn: new Date(2023, 10, 22, 4, 12),
    clockOut: new Date(2023, 10, 22, 14, 19),
    date: new Date("2023-11-10"),
    text: "Added create listing page",
    issue: "ATP Project",
    project: "Frontend Dev",
  },
];

const Timesheet = () => {
  return (
    <DashboardLayout pageTitle="Time Sheet">
      <TodayDate />
      <AddTime />

      <div className="mt-5">
        {timesheets?.map((timesheet, index) => {
          return <SingleTimeSheet key={index} {...timesheet} />;
        })}
      </div>
    </DashboardLayout>
  );
};

export default Timesheet;
