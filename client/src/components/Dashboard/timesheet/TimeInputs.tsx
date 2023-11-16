import React, { Dispatch, SetStateAction, useState } from "react";
import FormRow from "../../UI/FormRow";
import {
  getTime,
  updateDateWithTime,
  validateTime,
} from "../../../utils/get-date";

/** FEW POINTS
 * onFocus - remove the colon
 * onBlur - validate the input
 */

interface Props {
  time: Date;
  updateTime: Dispatch<SetStateAction<Date>>;
  chosenDate: Date;
}

const TimeInput = ({ time, updateTime, chosenDate }: Props) => {
  const [newTime, setNewTime] = useState<string>(getTime(time));
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const onChange = (text: string) => setNewTime(text);

  const onFocus = () => {
    setIsFocus(true);
    setNewTime(newTime.split(":").join(""));
  };

  const onBlur = () => {
    setIsFocus(false);
    let valid_time: undefined | string | string[] = validateTime(newTime);

    if (valid_time) {
      setNewTime(valid_time as string);

      valid_time = (valid_time as string).split(":");

      updateTime(updateDateWithTime(chosenDate, valid_time[0], valid_time[1]));
    } else {
      setNewTime(getTime(time));
    }
  };

  return (
    <FormRow
      className="w-[69px]"
      type={isFocus ? "number" : "string"}
      value={newTime}
      onFocus={onFocus}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
};

export default TimeInput;
