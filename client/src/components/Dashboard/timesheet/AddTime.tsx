import React, { useEffect, useState } from "react";
import FormRow from "../../ui/FormRow";
import { BiPlusCircle } from "react-icons/bi";
import IssuesList from "./IssuesList";
import TimeInput from "./TimeInputs";
import { getTime, updateDateWithTime } from "../../../utils/get-date";

const AddTime = () => {
  const [issuesOpen, setIssuesOpen] = useState<boolean>(false);

  const [clockIn, setClockIn] = useState<Date>(new Date());
  const [clockOut, setClockOut] = useState<Date>(new Date());
  const [today, setToday] = useState<Date>(new Date());

  useEffect(() => {
    // update the clock in and clock out with their current time

    let clockInTime: string | string[] = getTime(clockIn);

    clockInTime = clockInTime.split(":");

    setClockIn(updateDateWithTime(today, clockInTime[0], clockInTime[1]));

    let clockOutTime: string | string[] = getTime(clockOut);

    clockOutTime = clockOutTime.split(":");

    console.log(updateDateWithTime(today, clockOutTime[0], clockOutTime[1]));

    setClockOut(updateDateWithTime(today, clockOutTime[0], clockOutTime[1]));
  }, [today]);

  return (
    <section className="rounded-xl bg-white w-full">
      {/* Numerator */}
      <div className="w-full border-b-[1.5px] flex items-center gap-4 py-2 px-2 md:px-4">
        <FormRow
          placeholder="What have you worked on?"
          className="flex-1 hover:!border-[lightgray] focus:border-primary"
        />

        <div className="relative">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setIssuesOpen((prev) => !prev)}
          >
            <BiPlusCircle size={25} className="text-primary " />
            <p className="text-primary ">Issue</p>
          </div>
          {issuesOpen && <IssuesList />}
        </div>
      </div>

      {/* Denominator */}
      <div className="flex items-center justify-between flex-wrap gap-4 md:px-4 p-2">
        <div className="flex items-center gap-2">
          <TimeInput
            time={clockIn}
            updateTime={setClockIn}
            chosenDate={today}
          />{" "}
          -
          <TimeInput
            time={clockOut}
            updateTime={setClockOut}
            chosenDate={today}
          />
        </div>
      </div>
    </section>
  );
};

export default AddTime;
