/*
this it the way I want to use the month calender

<MonthCalender data={data} onDateButtonClick={onDateButtonClick} />


*/

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

function MonthCalender(props) {
    const {
        year = new Date().getFullYear(),
        month = new Date().getMonth(),
        data,
        title,
        onDateTitleButtonClick,
    } = props;
    const [thisMonthDateArray, setThisMonthDateArray] = useState([]);

    // 生成当前月份的日期数组
    useEffect(() => {
        const generateMonthDates = () => {
            const daysInMonth = new Date(year, month, 0).getDate(); // 获取当前月份的天数
            const thisMonthStartDaysDay = new Date(year, month, 0).getDay(); // 获取当前月份的天数
            const datesArray = [];

            for (let day = 1; day <= 7 * 5; day++) {
                const _day = dayjs(new Date(year, month, day - thisMonthStartDaysDay)).format("YYYY-MM-DD");

                datesArray.push(_day);
            }

            setThisMonthDateArray(datesArray);
        };

        generateMonthDates();
    }, [year, month]);
    return (
        <div
            aria-roledescription="month-calendar"
            className=" outline outline-1  outline-red-500 grid grid-cols-7 grid-rows-[repeat(2,auto)_repeat(5,1fr)] flex-1 h-full"
        >
            <div className="col-span-7 ">{title}</div>
            {["周一", "周二", "周三", "周四", "周五", "周六", "周日"].map((day, index) => {
                return (
                    <div key={index} className=" outline outline-1  outline-red-500 text-nowrap ">
                        {day}
                    </div>
                );
            })}

            {thisMonthDateArray.map((date, index) => {
                const content = data[date] ? data[date]() : null; // 如果 data 中有对应日期的内容，则渲染
                return (
                    <div key={index} className=" outline outline-1  outline-red-500 ">
                        {dayjs(date, ["YYYY-MM-DD", "YYYY-M-D"]).format("D")}
                        {content}
                    </div>
                );
            })}
        </div>
    );
}

export { MonthCalender };
