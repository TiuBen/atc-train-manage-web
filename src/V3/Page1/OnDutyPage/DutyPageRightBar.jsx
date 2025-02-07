import React, { useRef } from "react";
import { useSize } from "ahooks";
import useSWR from "swr";
import { SERVER_URL, FETCHER, useOnDutyUser } from "@utils";
import dayjs from "dayjs";
function RightBarSelectDayDetail() {
    const ref = useRef(null);
    const size = useSize(ref);
    // const { data, error, isLoading } = useSWR(`${SERVER_URL}/query/positions`, FETCHER);
    const { todayUsersData, todayUsersError, todayUsersLoading } = useOnDutyUser();

    if (todayUsersError) return <div>failed to load</div>;
    if (todayUsersLoading) return <div>loading...</div>;
    return (
        <div className="border border-red-500 flex-1 h-full" ref={ref}>
            <p>Try to resize the preview window </p>
            <p>
                width: {size?.width}px, height: {size?.height}px
            </p>
            {todayUsersData.map((item, index) => {
                return (
                    <div key={index} className="relative ">
                        <div
                            className={`relative before:bg-green-600 before:absolute before:content-['d '] before:w-[4px] before:h-[30px] `}
                        >
                            {dayjs(item.inTime).format("mm:ss")}
                        </div>
                        <p>{item.position}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default RightBarSelectDayDetail;
