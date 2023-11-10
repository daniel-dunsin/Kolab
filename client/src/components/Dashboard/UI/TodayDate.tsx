import React from "react";
import { getTodaysDate } from "../../../utils/get-date";

const TodayDate = () => {
  return (
    <header>
      <h1 className="font-bold text-[2rem] text-[#222]">Today</h1>
      <h2>{getTodaysDate()}</h2>
    </header>
  );
};

export default TodayDate;
