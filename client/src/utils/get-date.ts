const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getTodaysDate = (): string => {
  const dateObj = new Date();

  const date = dateObj.getDate();
  const day = days[dateObj.getDay()];
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

export const getDate = (date_input: Date): string => {
  const dateObj = new Date(date_input);

  const date = dateObj.getDate();
  const day = days[dateObj.getDay()];
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

export const getTime = (date_input: Date): string => {
  const date = new Date(date_input);

  return date.toTimeString().slice(0, 5);
};

export const validateTime = (time: string): string | undefined => {
  /** CLOCKIFY LOGIC
   * it must not be greater than 2400
   */

  if (parseInt(time) > 2400) {
    return undefined;
  }

  switch (time.length) {
    case 1: {
      return `0${time}:00`;
    }
    case 2: {
      return `0${time[0]}:0${time[1]}`;
    }
    case 3: {
      // if the last two numbers are greater than 59 change then do the maths below
      let time_slice: string | number = parseInt(time.slice(1));
      let extra_hour = 0;
      if (time_slice >= 60) {
        extra_hour++;
        time_slice = time_slice - 60;
      }
      time_slice = time_slice > 9 ? time_slice : `0${time_slice}`;

      return `0${parseInt(time[0]) + extra_hour}:${time_slice}`;
    }
    case 4: {
      return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
    }
    default: {
      return undefined;
    }
  }
};

export const updateDateWithTime = (
  date_input: Date,
  hours: string,
  minutes: string
): Date => {
  const date = new Date(date_input);

  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));

  return date;
};
