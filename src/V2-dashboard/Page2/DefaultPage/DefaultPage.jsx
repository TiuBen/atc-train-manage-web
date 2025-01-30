import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { SERVER_URL, FETCHER } from "@utils";
import dayjs from "dayjs";

function MonthStatistics({ query }) {
    const { data, error, isLoading } = useSWR(`${SERVER_URL}/query?${query}`, FETCHER);

    

    return (
        <div className="w-1/4 border border-slate-300 rounded-lg p-4">
            <h2 className="text-xl text-center">{query.get("month")}月</h2>

            {error ? (
                <div>failed to load</div>
            ) : isLoading ? (
                <div>loading...</div>
            ) : (
                <>
                    <form className="flex flex-col">
                        <label htmlFor="">科室整体执勤小时{parseFloat(data.totalTime.toFixed(2))}</label>
                        <label htmlFor="">西塔台执勤小时{parseFloat(data.totalWestTowerTime.toFixed(2))}</label>
                        <label htmlFor="">东塔台执勤小时{ parseFloat(data.totalEastTowerTime.toFixed(2))}</label>
                        <label htmlFor="">地面执勤小时{parseFloat(data.totalGroundTime.toFixed(2))}</label>
                        <label htmlFor="">放行执勤小时</label>
                        <label htmlFor="">综合协调执勤小时</label>
                        <label htmlFor="">领班执勤小时</label>
                        <label htmlFor="">教员执勤小时</label>
                        <label htmlFor="">学员执勤小时</label>
                    </form>
                </>
            )}
        </div>
    );
}

function DefaultPage() {
    const [q, setQ] = useState([]);

    useEffect(() => {
        const year = dayjs().year();
        const month = dayjs().month() + 1;

        let _qs = [];
        for (let index = 0; index < month; index++) {
            const q = new URLSearchParams();
            // 添加或设置参数
            q.set("position", "all");
            q.append("year", "2025"); // append 可以添加多个相同名称的参数
            q.append("month", index + 1);

            _qs.push(q);
        }
        setQ(_qs);
    }, []);

    return (
        <div className="">
            <h1 className="text-2xl text-center">2025年整体时间统计</h1>
            <div className="flex flex-row flex-wrap ">
                {q.map((item, index) => {
                    return <MonthStatistics key={index} query={item} />;
                })}
            </div>
        </div>
    );
}

export default DefaultPage;
