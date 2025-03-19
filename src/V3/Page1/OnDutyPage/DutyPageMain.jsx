import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { SERVER_URL,FETCHER } from "@utils";
import Position from "./PositionSeatStaff/Position.jsx";
import { API_URL } from "../../../utils/const/Const.js";


function DutyPage() {
    const { data:positions, error, isLoading } = useSWR(API_URL.query_positions, FETCHER);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    return (
        <div className="flex flex-row flex-wrap gap-4 justify-center items-start  content-start overflow-auto p-2">
            {positions.map((item, index) => {
                if (item.display===1) {
                    return <Position key={index}  position={item.name} dutyType={item.description}/>;
                }
               
            })}
            {JSON.stringify(positions)}
        </div>
    );
}

export default DutyPage;
