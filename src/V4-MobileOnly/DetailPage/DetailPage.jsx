import React, { useEffect, useRef, useState } from "react";
import { MonthCalender } from "@sn/MonthCalender";
import { Button } from "@radix-ui/themes";
import { useCalendar } from "@sn/useCalender";
import MonthStatistics from "./MonthStatistics";
import useStore from "../../utils/store/userStore";
import { API_URL } from "../../utils/const/Const";

function Cell({ date }) {
    const parentRef = useRef(null);
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
    const [dutyRecords, setDutyRecords] = useState([]);

    const { selectedUser,selectedUserNightCount } = useStore();
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

    // useEffect(() => {
    //     if (date) {
    //         fetch(
    //             `${API_URL.duty}?username=${username}&startDate=${dayjs()
    //                 .month(month)
    //                 .date(x)
    //                 .format("YYYY-MM-DD")}&startTime=00:00:00&endDate=${dayjs()
    //                 .month(month)
    //                 .date(x)
    //                 .format("YYYY-MM-DD")}&endTime=00:00:01&calculate=true`
    //         )
    //             .then((res) => res.json())
    //             .then((data) => {});
    //     }
    // }, [date]);

    const _t= selectedUserNightCount?.[selectedUser.username]?.[date]?.["夜班次数"];
    return (
        <div ref={parentRef} className=" flex-1 border-t-[1px] min-h-[8rem] min-w-[4rem]">
            <div>
               {_t? _t+ `次夜班` : ""}
            </div>
        </div>
    );
}

function DetailPage() {
    const { year, month, addOneMonth, subOneMonth } = useCalendar();

    return (
        <div className="flex-1 w-full h-full p-2 flex flex-row gap-1 overflow-hidden">
            <div className="flex-shrink-0  ">
                <MonthStatistics month={month} year={year} />
            </div>
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
                // Cell={date=> <Cell date={date} />}
                cellRender={(x) => {
                    return <Cell date={x} />;
                }}
            />
        </div>
    );
}

export default DetailPage;
