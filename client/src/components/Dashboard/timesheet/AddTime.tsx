import React, { useEffect, useState } from "react";
import FormRow from "../../ui/FormRow";
import { BiCalendar, BiPlusCircle } from "react-icons/bi";
import IssuesList from "./IssuesList";
import TimeInput from "./TimeInputs";
import {
  formatTime,
  getDate,
  getTime,
  getTimeDiff,
  incrementByDay,
  updateDateWithTime,
} from "../../../utils/get-date";
import DatePicker from "./DatePicker";
import Button from "../../ui/Button";

const AddTime = () => {
  const [issuesOpen, setIssuesOpen] = useState<boolean>(false);
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [clockIn, setClockIn] = useState<Date>(new Date());
  const [clockOut, setClockOut] = useState<Date>(new Date());
  const [today, setToday] = useState<Date>(new Date());

  const difference = getTimeDiff(clockOut, clockIn);

  useEffect(() => {
    // update the clock in and clock out with their current time

    let clockInTime: string | string[] = getTime(clockIn);

    clockInTime = clockInTime.split(":");

    setClockIn(updateDateWithTime(today, clockInTime[0], clockInTime[1]));

    let clockOutTime: string | string[] = getTime(clockOut);

    clockOutTime = clockOutTime.split(":");

    setClockOut(updateDateWithTime(today, clockOutTime[0], clockOutTime[1]));
  }, [today]);

  useEffect(() => {
    // if clock in is greater than clock out, make sure clock out is one day ahead

    if (clockIn > clockOut) {
      setClockOut(incrementByDay(clockOut, 1));
    }
  }, [clockIn, clockOut]);

  return (
    <section className="rounded-xl bg-white w-full mt-5">
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
        <div className="flex items-center gap-2 flex-wrap">
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

          <div className="relative flex items-center gap-2">
            <span className="hover:text-primary cursor-pointer">
              <BiCalendar
                size={25}
                onClick={() => setDatePickerOpen((prev) => !prev)}
              />
            </span>
            <p
              className="text-[.8rem] font-bold cursor-pointer"
              onClick={() => setDatePickerOpen((prev) => !prev)}
            >
              {getDate(today)}
            </p>
            {datePickerOpen && (
              <DatePicker
                date={today}
                updateDate={setToday}
                closeModal={() => setDatePickerOpen(false)}
              />
            )}
          </div>

          <span className="block p-2 text-[.8rem] font-bold rounded-sm bg-[#f3f3f3] text-mainBlack">
            {formatTime(difference.hours)}:{formatTime(difference.minutes)}
          </span>
        </div>

        <Button
          type="submit"
          text="ADD"
          className="!min-w-[80px] !rounded-none"
        />
      </div>
    </section>
  );
};

export default AddTime;
