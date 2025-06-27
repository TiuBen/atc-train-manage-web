import { Button } from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import { useDialog, useOnDutyUser } from "@utils";
import Staff from "./Staff";
import dayjs from "dayjs";
import useSWR from "swr";
import { SERVER_URL, FETCHER, DialogContextProvider, OnDutyUserContextProvider } from "@utils";
//*     Position
//*         |
//*    Seat    Seat
//*    |       |
//*    Staff   Staff
//*    Staff   Staff
//*

function Seat(props) {
    const { position, dutyType } = props;
    // const [staffs, setStaffs] = useState([]);
    const { setDialogPayload } = useDialog();

    const { onDutyUser,setOnDutyUser, putToServerUserGetOut } = useOnDutyUser();

    const q = new URLSearchParams();
    q.append("position", position);
    if (dutyType) {
        q.append("dutyType", dutyType);
    }
    q.append("outTime", null);

    const { data: staffs = [], error, loading } = useSWR(`${SERVER_URL}/duty?${q}`, FETCHER);

    // 十分钟退出的功能
    // useEffect(() => {
    //     // if more than 2 user putTO get out immediately
    //     const sortedData = staffs
    //         .filter((item) => {
    //             return item.roleType !== "见习";
    //         })
    //         .sort((a, b) => a.id - b.id);

    //     const timer = setInterval(() => {
    //         if (sortedData.length > 1) {
    //             const { inTime } = sortedData[sortedData.length - 1];
    //             const isMoreThan10Minutes = dayjs().diff(dayjs(inTime, "YYYY-MM-DD HH:mm:ss"), "minute", true) > 10.0;
    //             if (isMoreThan10Minutes) {
    //                 putToServerUserGetOut(sortedData[0]);
    //             }
    //         }
    //     }, 30 * 1000);

    //     return () => clearInterval(timer);
    // }, [staffs, putToServerUserGetOut]);

    if (error) {
        return <div>{JSON.stringify(error)}</div>;
    }
    if (loading) {
        return <div>正在获取席位信息...</div>;
    }

    return (
        <div className="flex flex-col items-center border rounded-lg p-1 gap-1 text-center self-stretch">
            <div className="flex flex-row items-center gap-2">
                {dutyType && <h3 className="font-black text-blue-600 text-lg">{dutyType}</h3>}

                <Button
                    style={{ marginTop: "auto" }}
                    disabled={
                        staffs.filter((item) => {
                            return item.roleType !== "见习";
                        }).length >= 2
                    }
                    onClick={() => {
                        //! 这里只有普通的接班
                        //! 没有roleType==教员 或则 见习
                        setDialogPayload({
                            userListDialogDisplay: true,
                            dialogTitle: "进行交接班",
                            position: position,
                            dutyType: dutyType,
                            dialogType: "User_Get_In",
                        });
                    }}
                >
                    接班
                </Button>
            </div>

            {staffs.map((y, index) => {
                return (
                    <div key={index}>
                        <Staff {...y} key={index} />
                    </div>
                );
            })}
        </div>
    );
}

export default Seat;
