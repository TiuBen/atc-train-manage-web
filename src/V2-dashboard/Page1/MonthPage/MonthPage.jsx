import React, { useEffect, useState } from "react";
import { Outlet, Route, useLoaderData } from "react-router-dom";
import useSWR from "swr";
import { SERVER_URL } from "@utils";

import { MonthCalender } from "@sn/MonthCalender";
import { useCalendar } from "@sn/useCalender";
import { Button } from "@radix-ui/themes";
import dayjs from "dayjs";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function DayCellElement({ date }) {
    const startDate = dayjs(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    const startTime = "00:00:00";
    const endDate = dayjs(date, "YYYY-MM-DD").add(1, "day").format("YYYY-MM-DD");
    const endTime = "00:00:01";

    const query = new URLSearchParams({ startDate, startTime, endDate, endTime });

    const { data, error, isLoading } = useSWR(`${SERVER_URL}/duty/?${query}`, fetcher);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    const usernameSet = new Set(data.map(item => item.username));
    const usernameArray = Array.from(usernameSet);
    return (
        <div className="flex flex-col items-start justify-center  overflow-auto">
            <div className="text-sm text-gray-500">{JSON.stringify(date)}</div>
            <div className="text-sm text-gray-500">{JSON.stringify(usernameArray)}</div>
        </div>
    );
}

function MonthPage() {
    const { year, month, addOneMonth, subOneMonth } = useCalendar();

    useEffect(() => {
        // const _data = getDuty(new URLSearchParams({ year: year, month: month }));
    }, [year, month]);
    return (
        <MonthCalender
            title={
                <div className="flex flex-row flex-1 flex-shrink-0 items-center justify-between">
                    <div className="text-lg font-bold">
                        {year}年{month}月
                    </div>
                    <div>
                        <Button
                            size="1"
                            onClick={() => {
                                console.log("clicked");
                                subOneMonth();
                            }}
                        >
                            -1
                        </Button>
                        <Button
                            size="1"
                            onClick={() => {
                                console.log("clicked");
                                addOneMonth();
                            }}
                        >
                            +1
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
                        <div>{JSON.stringify(props)}</div>
                        <DayCellElement date={props} />
                    </>
                );
            }}
        />
    );
}

export default MonthPage;
