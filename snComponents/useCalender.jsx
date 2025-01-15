/*
this it the way I want to use the month calender

<MonthCalender data={data} onDateButtonClick={onDateButtonClick} />


*/

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";


 function useCalendar(initialYear = 2025, initialMonth = 1) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

  const addOneMonth = () => {
    setMonth((prev) => {
      if (prev === 12) {
        setYear((prevYear) => prevYear + 1);
        return 1;
      }
      return prev + 1;
    });
  };

  const subOneMonth = () => {
    setMonth((prev) => {
      if (prev === 1) {
        setYear((prevYear) => prevYear - 1);
        return 12;
      }
      return prev - 1;
    });
  };

  return { year, month, addOneMonth, subOneMonth };
}



export  {useCalendar};
