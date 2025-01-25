import React,{useEffect} from "react";
import useSWR from "swr";
import {SERVER_URL,FETCHER} from "@utils" 

function DefaultPage() {
    const { data, error, isLoading } = useSWR(`${SERVER_URL}/query?all`, FETCHER);
    return (
        <div className="">
            <h1 className="text-2xl text-center">2025年整体时间统计</h1>
            <div className="flex flex-row flex-wrap ">
                <div className="w-1/4 border border-slate-300 rounded-lg p-4">
                    <h2 className="text-xl text-center">1月</h2>

                    <form className="flex flex-col">
                        <label htmlFor="">科室整体执勤小时</label>
                        <label htmlFor="">西塔台执勤小时</label>
                        <label htmlFor="">东塔台执勤小时</label>
                        <label htmlFor="">地面执勤小时</label>
                        <label htmlFor="">放行执勤小时</label>
                        <label htmlFor="">综合协调执勤小时</label>
                        <label htmlFor="">领班执勤小时</label>
                        <label htmlFor="">教员执勤小时</label>
                        <label htmlFor="">学员执勤小时</label>


                    </form>
                </div>
            </div>
        </div>
    );
}

export default DefaultPage;
