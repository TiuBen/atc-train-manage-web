import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { SERVER_URL, FETCHER } from "@utils";
import Position from "./PositionSeatStaff/Position.jsx";
import { API_URL } from "../../../utils/const/Const.js";
import { data } from "autoprefixer";
import useStore from "../../../utils/store/userStore.js";

function DutyPage() {
    const { positionsOnDuty: data, isLoading, error } = useStore();
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    return (
        <div className="flex flex-row flex-wrap gap-4 justify-center items-start  content-start overflow-auto p-2">
            {data.map((item, index) => {
                return <Position key={index} position={item.position} dutyType={item.dutyType} />;
            })}
        </div>
    );
}

export default DutyPage;
