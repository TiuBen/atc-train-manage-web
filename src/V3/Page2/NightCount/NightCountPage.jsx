import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { API_URL } from "../../../utils/const/Const";
import useStore from "../../../utils/store/userStore";

const StyledLikeExcel = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-wrap: nowrap;

    td {
        padding: 0.2rem;
        border: 1px solid black;

        &:hover {
            background-color: #e0e0e0;
        }
    }

    th {
        padding: 0.2rem;
        border: 1px solid black;
    }
`;

function NightCountPage() {
    const length = dayjs().month() + 1;
    const { users } = useStore();
    const [nightShiftData, setNightShiftData] = useState({});

    const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));
    const [daysArray, setDaysArray] = useState([]);

    const currentMonthIndex = dayjs(selectedMonth).month();
    useEffect(() => {
        const q = new URLSearchParams();
        q.append("startDate", dayjs(selectedMonth).format("YYYY-MM-DD"));
        q.append("startTime", "00:00");
        q.append("endDate", dayjs(selectedMonth).add(1, "M").format("YYYY-MM-DD"));
        q.append("endTime", "00:01");
        // console.log(dayjs(selectedMonth).format("YYYY-MM-DD"));
        // console.log(dayjs(selectedMonth).add(1, "M").format("YYYY-MM-DD"));

        fetch(`${API_URL.users}/nights?${q}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data?.nightShiftData);
                setNightShiftData(data?.nightShiftData);
            });
    }, [selectedMonth]);

    // 监听月份变化，更新天数数组
    useEffect(() => {
        // console.log(selectedMonth);
        let daysInMonth = dayjs(selectedMonth).daysInMonth();
        // console.log(daysInMonth);

        const newDaysArray = Array.from({ length: daysInMonth }, (_, index) => {
            return dayjs(selectedMonth).startOf("month").add(index, "day").format("D");
        });
        setDaysArray(newDaysArray);
    }, [selectedMonth]);

    return (
        <div className=" flex-1 flex flex-col  overflow-auto relative items-stretch border border-red-400 ">
            <h1 className="text-xl font-bold text-blue-700 text-center">2025年夜班次数统计</h1>

            <div className="relative  flex flex-col gap-1 text-wrap  m-2  ">
                <div className="w-full flex  ">
                    {["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"].map(
                        (x, index) => {
                            const monthIndex = index; // 0-11
                            return (
                                <div
                                    key={index}
                                    className={`flex-1 border border-black text-center rounded-t-lg hover:font-bold ${
                                        index === currentMonthIndex ? " bg-inherit font-extrabold  " : "bg-slate-200"
                                    }`}
                                    onClick={() => {
                                        const newDate = dayjs(selectedMonth).month(index).format("YYYY-MM");
                                        setSelectedMonth(newDate);
                                    }}
                                >
                                    {x}
                                </div>
                            );
                        }
                    )}
                </div>
                <div className="flex flex-row justify-start items-start text-center text-sm ">
                    <StyledLikeExcel>
                        <thead>
                            <tr>
                                <th>姓名</th>
                                {daysArray.map((date, index) => (
                                    <td key={index}>{date}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((x, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{x.username}</td>
                                        {Array(dayjs().daysInMonth())
                                            .fill(0)
                                            .map((y, i) => {
                                                // return <td key={i}>{ nightShiftData[x.username][ dayjs().set("month", selectedMonth).set('D',i+1).format("YYYY-MM-DD")] }</td>;
                                                // console.log(i);
                                                // console.log(x.username);

                                                const date = dayjs()
                                                    .set("month", selectedMonth)
                                                    .set("date", i + 1)
                                                    .format("YYYY-MM-DD");
                                                // console.log(date);

                                                // console.log(nightShiftData[x.username]);

                                                return (
                                                    <td key={i}>
                                                        {JSON.stringify(
                                                            nightShiftData[x.username]?.[date]?.["夜班次数"]
                                                        )}
                                                    </td>
                                                );
                                            })}
                                    </tr>
                                );

                                // let date = 0;
                                // return (
                                //     <tr key={index}>
                                //         <td>{x.username}</td>
                                //         {Array(dayjs().daysInMonth())
                                //             .fill(
                                //                 dayjs()
                                //                     .set("month", selectedMonth)
                                //                     .set("date", index + 1)
                                //                     .format("YYYY-MM-DD")
                                //             )
                                //             .map((x, index) => {
                                //                 return <td key={index}>{x}</td>;
                                //             })}
                                //     </tr>
                                // );
                            })}
                        </tbody>
                    </StyledLikeExcel>
                </div>
            </div>
        </div>
    );
}

export default NightCountPage;
