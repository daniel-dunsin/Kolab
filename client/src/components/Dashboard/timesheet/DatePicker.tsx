import React, { Dispatch, SetStateAction } from "react";
import { DayPicker } from "react-day-picker";
import { getDate } from "../../../utils/get-date";

interface Props {
  closeModal(): void;
  updateDate: Dispatch<SetStateAction<Date>>;
  date: Date;
}

const DatePicker = ({ date, updateDate, closeModal }: Props) => {
  return (
    <div className="absolute top-[150%] left-0 sm:right-0 w-[90vw] max-w-fit bg-white p-2 rounded-md shadow-md z-[2]">
      <DayPicker
        mode="single"
        footer={getDate(date)}
        selected={date}
        onSelect={(e) => {
          updateDate(e as Date);
          closeModal();
        }}
      />
    </div>
  );
};

export default DatePicker;
