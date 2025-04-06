import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { SERVER_URL } from "@utils";

import { MonthCalender } from "@sn/MonthCalender";
import { useCalendar } from "@sn/useCalender";
import { Button } from "@radix-ui/themes";
import dayjs from "dayjs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { API_URL } from "../../../utils/const/Const";
import RightBarSelectDayDetail from "./RightBarSelectDayDetail";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function DayCellElement({ date, onClick }) {
    const startDate = dayjs(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    const startTime = "00:00:00";
    const endDate = dayjs(date, "YYYY-MM-DD").add(1, "day").format("YYYY-MM-DD");
    const endTime = "00:00:01";

    const query = new URLSearchParams({ startDate, startTime, endDate, endTime });
    query.append("calculate", "day");

    const { data, error, isLoading } = useSWR(`${SERVER_URL}/duty?${query}`, fetcher);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    const usernameSet = new Set(data.map((item) => item.username));
    const usernameArray = Array.from(usernameSet);
    return (
        <div className="flex flex-col items-start justify-center  overflow-auto" onClick={() => onClick(date)}>
            <div className="text-sm text-gray-500 px-1">{usernameArray.join(",")}</div>
        </div>
    );
}

function TimeLineSidebar({ date }) {
    const startDate = dayjs(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    const startTime = "00:00:00";
    const endDate = dayjs(date, "YYYY-MM-DD").add(1, "day").format("YYYY-MM-DD");
    const endTime = "00:00:01";

    const query = new URLSearchParams({ startDate, startTime, endDate, endTime });
    query.append("calculate", "month");

    const { data, error, isLoading } = useSWR(`${API_URL.query_statics}/${query}`, fetcher);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    return (
        <div className="flex flex-col items-start justify-center  overflow-auto p-4">
            <ul className="text-sm text-gray-500 px-1">
                {data.map((x, index) => {
                    return <li key={index}>{x.username}</li>;
                })}
            </ul>
        </div>
    );
}

function MonthPage() {
    const { year, month, addOneMonth, subOneMonth } = useCalendar();

    useEffect(() => {
        // const _data = getDuty(new URLSearchParams({ year: year, month: month }));
    }, [year, month]);

    const [date, setDate] = useState("");

    return (
        <div className="flex flex-row flex-1 ">
            <div className="flex-1 pl-4">
                <MonthCalender
                    title={
                        <div className="flex flex-row flex-1 flex-shrink-0 items-center justify-between p-2">
                            <div className="flex flex-row flex-1 gap-1 items-center ">
                                <div className=" text-3xl font-bold">
                                    {year}年{month}月
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
                    cellRender={(props) => {
                        return (
                            <>
                                <DayCellElement
                                    date={props}
                                    onClick={(date) => {
                                        setDate(date);
                                    }}
                                />
                            </>
                        );
                    }}
                />
            </div>
          <RightBarSelectDayDetail />
        </div>
    );
}

export default MonthPage;
