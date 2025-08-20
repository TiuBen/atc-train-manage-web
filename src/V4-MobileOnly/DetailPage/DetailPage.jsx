import React, { useEffect, useRef, useState } from "react";
import { MonthCalender } from "@sn/MonthCalender";
import { Button } from "@radix-ui/themes";
import { useCalendar } from "@sn/useCalender";
import MonthStatistics from "./MonthStatistics";
import useStore from "../../utils/store/userStore";
import { API_URL } from "../../utils/const/Const";
import dayjs from "dayjs";
function Cell({ date }) {
    const parentRef = useRef(null);
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
    const [dutyRecords, setDutyRecords] = useState([]);
    // 想要的效果是 显示
    // 白班 xx小时
    // 夜班 xx小时
    // 教员 xx小时
    // 学员 xx小时
    const [dutyStatics, setDutyStatics] = useState({});
    const [teachStatistics, setTeachStatistics] = useState({});

    const { selectedUser, selectedUserNightCount } = useStore();

    useEffect(() => {
        if (date && selectedUser) {
            fetch(
                `${API_URL.users}/${selectedUser?.userId}/dutyStatistics?startDate=${dayjs(date, "YYYY-MM-DD").format(
                    "YYYY-MM-DD"
                )}&startTime=00:00:00&endDate=${dayjs(date, "YYYY-MM-DD")
                    .add(1, "day")
                    .format("YYYY-MM-DD")}&endTime=00:00:01&calculate=true`
            )
                .then((res) => res.json())
                .then((data) => {
                    setDutyStatics(data);
                });

            fetch(
                `${API_URL.users}/${selectedUser?.userId}/teachStatistics?startDate=${dayjs(date, "YYYY-MM-DD").format(
                    "YYYY-MM-DD"
                )}&startTime=00:00:00&endDate=${dayjs(date, "YYYY-MM-DD")
                    .add(1, "day")
                    .format("YYYY-MM-DD")}&endTime=00:00:01&calculate=true`
            )
                .then((res) => res.json())
                .then((data) => {
                    setTeachStatistics(data);
                });
        }
    }, [selectedUser, date]);

    const _t = selectedUserNightCount?.[selectedUser?.username]?.[date]?.["夜班次数"];
    return (
        <div ref={parentRef} className=" flex-1 border-t-[1px] min-h-[8rem] min-w-[4rem] flex flex-col items-start p-2">
            {dutyStatics?.["totalTime"]?.["dayShift"] > 0 ? (
                <div>{"白班" + dutyStatics?.["totalTime"]?.["dayShift"]?.toFixed(2) + "小时"}</div>
            ) : (
                <div></div>
            )}
            {dutyStatics?.["totalTime"]?.["nightShift"] > 0 ? (
                <div>{"夜班" + dutyStatics?.["totalTime"]?.["nightShift"].toFixed(2) + "小时"}</div>
            ) : (
                <div></div>
            )}
            <div>{_t ? _t + `次夜班` : ""}</div>
        </div>
    );
}

function DetailPage() {
    const { year, month, addOneMonth, subOneMonth } = useCalendar();

    return (
        <div className="flex-1 w-full h-full p-2 flex flex-row gap-4 overflow-hidden">
            <div className="flex-shrink-0  ">
                <MonthStatistics month={month} year={year} />
            </div>
            <div className="flex-1 flex flex-col">
                <MonthCalender
                    title={
                        <div className="flex flex-row flex-1 flex-shrink-0 items-center justify-between p-2">
                            <div className="flex flex-row flex-1 gap-1 items-center ">
                                <div className=" text-3xl font-bold">
                                    {year}年{month + 1}月
                                </div>
                                <Button
                                    size="1"
                                    onClick={() => {
                                        subOneMonth();
                                    }}
                                >
                                    上一月
                                </Button>
                                <Button
                                    size="1"
                                    onClick={() => {
                                        addOneMonth();
                                    }}
                                >
                                    下一月
                                </Button>
                            </div>

                            <div className="text-sm text-gray-500">共31天</div>
                        </div>
                    }
                    year={year}
                    month={month}
                    cellRender={(x) => {
                        return <Cell date={x} />;
                    }}
                />
                <span className="text-xs text-gray-500 italic font-semibold font-sans">备注：如14号当日晚上24：00之后的夜班，归属到14号</span>
            </div>
        </div>
    );
}

export default DetailPage;

// useEffect(() => {
//     if (!parentRef.current) return;

//     const resizeObserver = new ResizeObserver((entries) => {
//         const { width, height } = entries[0].contentRect;
//         setParentSize({ width, height });
//     });

//     resizeObserver.observe(parentRef.current);

//     return () => {
//         resizeObserver.disconnect(); // 清理监听
//     };
// }, []);
