import React, { useEffect, useState } from "react";
import { Route, useLoaderData } from "react-router-dom";
import { MonthCalender } from "@sn/MonthCalender";
import { useCalendar } from "@sn/useCalender";
import { Button } from "@radix-ui/themes";
import { getDuty } from "@utils/getDuty";

const _testData = {
    "2025-01-01": () => <div>新年快乐！</div>,
    "2025-01-15": () => <div>今天是特别的日子！</div>,
};

function Page1() {
   
    const { year, month, addOneMonth, subOneMonth } = useCalendar();
    const [data, setData] = useState(_testData);

    useEffect(() => {
        // const _data = getDuty(new URLSearchParams({ year: year, month: month }));
    }, [year, month]);

    return (
        <div className="relative flex-1">
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
                data={_testData}
            />

        </div>
    );
}

function Page1Route() {
    return <Route index element={<Page1 />} />;
}

export default Page1Route;
