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
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        &:hover {
            background-color: #e0e0e0;
        }
    }

    th {
        border: 1px solid black;
    }
`;

function UserRow({ month, username }) {
    const [dutyStatics, setDutyStatics] = useState([]);

    useEffect(() => {
        // append 可以添加多个相同名称的参数

        let q = new URLSearchParams();
        q.append("username", username);
        // Append startDate and startTime
        q.append("startDate", dayjs().month(month).date(1).format("YYYY-MM-DD"));
        q.append("startTime", "00:00:00");

        // Append endDate and endTime
        q.append(
            "endDate",
            dayjs()
                .month(month + 1)
                .date(1)
                .format("YYYY-MM-DD")
        );
        q.append("endTime", "00:00:01");
        q.append("year", dayjs().get("year"));
        q.append("month", dayjs().get("month"));

        fetch(`${SERVER_URL}/query/statics?${q}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setDutyStatics(data);
            });
    }, [month, username]);

    return (
        <>
            <tr>
                <td>{username}</td>
                <td>
                    {Math.floor(dutyStatics?.totalCommanderTime?.dayShift * 100) / 100 !== 0 ? (
                        <>{Math.floor(dutyStatics?.totalCommanderTime?.dayShift * 100) / 100}</>
                    ) : (
                        <></>
                    )}
                </td>
                <td>
                    {Math.floor(dutyStatics?.totalPositionTime?.dayShift * 100) / 100 !== 0 ? (
                        <>{Math.floor(dutyStatics?.totalPositionTime?.dayShift * 100) / 100}</>
                    ) : (
                        <></>
                    )}
                </td>
                <td>
                    {Math.floor(dutyStatics?.totalTeacherTime?.dayShift * 100) / 100 !== 0 ? (
                        <>{Math.floor(dutyStatics?.totalTeacherTime?.dayShift * 100) / 100}</>
                    ) : (
                        <></>
                    )}
                </td>
                <td>
                    {Math.floor(dutyStatics?.totalStudentTime?.dayShift * 100) / 100 !== 0 ? (
                        <>{Math.floor(dutyStatics?.totalStudentTime?.dayShift * 100) / 100}</>
                    ) : (
                        <></>
                    )}
                </td>
                <td>
                    {Math.floor(dutyStatics?.totalCommanderTime?.nightShift * 100) / 100 !== 0 ? (
                        <>{Math.floor(dutyStatics?.totalCommanderTime?.nightShift * 100) / 100}</>
                    ) : (
                        <></>
                    )}
                </td>
                <td>
                    {Math.floor(dutyStatics?.totalPositionTime?.nightShift * 100) / 100 !== 0 ? (
                        <>{Math.floor(dutyStatics?.totalPositionTime?.nightShift * 100) / 100}</>
                    ) : (
                        <></>
                    )}
                </td>
                <td>
                    {Math.floor(dutyStatics?.totalTeacherTime?.nightShift * 100) / 100 !== 0 ? (
                        <>{Math.floor(dutyStatics?.totalTeacherTime?.nightShift * 100) / 100}</>
                    ) : (
                        <></>
                    )}
                </td>
                <td>
                    {Math.floor(dutyStatics?.totalStudentTime?.nightShift * 100) / 100 !== 0 ? (
                        <>{Math.floor(dutyStatics?.totalStudentTime?.nightShift * 100) / 100}</>
                    ) : (
                        <></>
                    )}
                </td>
                <td>
                    {Math.floor(
                        (dutyStatics?.totalCommanderTime?.dayShift +
                            +dutyStatics?.totalPositionTime?.dayShift +
                            dutyStatics?.totalTeacherTime?.dayShift +
                            dutyStatics?.totalStudentTime?.dayShift +
                            dutyStatics?.totalCommanderTime?.nightShift +
                            dutyStatics?.totalPositionTime?.nightShift +
                            dutyStatics?.totalTeacherTime?.nightShift +
                            dutyStatics?.totalStudentTime?.nightShift) *
                            100
                    ) / 100}
                </td>
            </tr>
        </>
    );
}

function MonthStatistics({ month, usernames }) {
    return (
        <div className=" border border-red-300 rounded-lg p-4">
            <h2 className="text-xl text-center">{month + 1}月</h2>
            <StyledLikeExcel>
                <thead className="text-center">
                    <tr className="text-center">
                        <th></th>
                        <th colSpan={4}>白班</th>
                        <th colSpan={4}>夜班</th>
                        <th colSpan={1}>总小时数</th>
                    </tr>
                    <tr>
                        <th>姓名</th>
                        <th>带班</th>
                        <th>席位</th>
                        <th>教员</th>
                        <th>学员</th>
                        <th>带班</th>
                        <th>席位</th>
                        <th>教员</th>
                        <th>学员</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {usernames.flat().map((item, index) => {
                        return <UserRow key={index} month={month} username={item} />;
                    })}
                </tbody>
            </StyledLikeExcel>
        </div>
    );
}

function DefaultPage() {
    const length = dayjs().month() + 1;
    const { data: usernames, error, isLoading } = useSWR(`${SERVER_URL}/query/orderedusername`, FETCHER);

    return (
        <div className="border border-blue-600 flex-1 my-0">
            <h1 className="text-2xl text-center">2025年整体时间统计</h1>
            {error ? (
                <div>error</div>
            ) : isLoading ? (
                <div>loading....</div>
            ) : (
                <div className="flex flex-row flex-1 h-full justify-stretch flex-wrap border border-red-600 gap-2">
                    {new Array(length).fill(0).map((item, index) => {
                        return <MonthStatistics key={index} month={index} usernames={usernames} />;
                    })}
                </div>
            )}
        </div>
    );
}

export default DefaultPage;
