import React, { useEffect, useState } from "react";
import { SERVER_URL, FETCHER } from "@utils";
import dayjs from "dayjs";
import styled from "styled-components";
import useSWR, { mutate } from "swr";

const StyledLikeExcel = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-wrap: nowrap;
    font-size: 0.8rem;

    td {
        border: 1px solid black;

        &:hover {
            background-color: #e0e0e0;
        }
    }

    th {
        border: 1px solid black;
    }
`;

function UserRow({ query, usernames }) {
}


function MonthStatistics({ query }) {


    const { data, error, isLoading } = useSWR(`${SERVER_URL}/query/all?${query}`, FETCHER);





    return (
        <div className="w-1/6 border border-slate-300 rounded-lg p-4">
            <h2 className="text-xl text-center">{query.get("month")}月</h2>

            {error ? (
                <div>failed to load</div>
            ) : isLoading ? (
                <div>loading...</div>
            ) : (
                <StyledLikeExcel>
                    <thead className="text-center">
                        <tr className="text-center">
                            <th></th>
                            <th colSpan={3}>白班</th>
                            <th colSpan={3}>夜班</th>
                            <th colSpan={3}>总小时数</th>
                        </tr>
                        <tr>
                            <th >姓名</th>
                            <th >带班</th>
                            <th >席位</th>
                            <th >教员</th>
                            <th >带班</th>
                            <th >席位</th>
                            <th >教员</th>
                            <th ></th>
                        </tr>
                    </thead>
                    <tbody>


                    </tbody>
                </StyledLikeExcel>
            )}
        </div>
    );
}

function DefaultPage() {
    const [q, setQ] = useState([]);
    const { data:usernames, error, isLoading } = useSWR(`${SERVER_URL}/query/orderedusername`, FETCHER);


    useEffect(() => {
        const year = dayjs().year();
        const month = dayjs().month() + 1;

        let _qs = [];
        for (let index = 0; index < month; index++) {
            const q = new URLSearchParams();
            // 添加或设置参数
            q.set("position", "all");
            q.append("year", year); // append 可以添加多个相同名称的参数
            q.append("month", index);

            _qs.push(q);
        }
        setQ(_qs);
    }, []);

    return (
        <div className="">
            <h1 className="text-2xl text-center">2025年整体时间统计</h1>
            <div className="flex flex-row flex-wrap gap-2">
                {q.map((item, index) => {
                    return <MonthStatistics key={index} query={item} usernames={usernames} />;
                })}
            </div>
        </div>
    );
}

export default DefaultPage;
