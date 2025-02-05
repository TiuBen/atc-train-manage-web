import React, { useRef } from "react";
import { useSize } from "ahooks";
import useSWR from "swr";
import { SERVER_URL,FETCHER } from "@utils";
function RightBarSelectDayDetail() {
    const ref = useRef(null);
    const size = useSize(ref);
    const { data, error, isLoading } = useSWR(`${SERVER_URL}/query/positions`, FETCHER);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return (
        <div className="border border-red-500 flex-1 h-full" ref={ref}>
            <p>Try to resize the preview window </p>
            <p>
                width: {size?.width}px, height: {size?.height}px
            </p>
            {JSON.stringify(data)}
        </div>
    );
}

export default RightBarSelectDayDetail;
