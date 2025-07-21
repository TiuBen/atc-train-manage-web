import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { SERVER_URL, FETCHER, DialogContextProvider, OnDutyUserContextProvider } from "@utils";
import { TowerControl, PlaneTakeoff, ScanFace, HandMetal } from "lucide-react";
import styled from "styled-components";
import Position from "./PositionSeatStaff/Position";
import { Theme, Switch } from "@radix-ui/themes";
import UserListDialog from "./Dialog/UserListDialog";
import FaceDialog from "./Dialog/FaceDialog";
import ConfirmGetOutDialog from "./Dialog/ConfirmGetOutDialog";

function AppMobile() {
    const { data: displayPositions, error, isLoading } = useSWR(`${SERVER_URL}/positions?display=true`, FETCHER);
    const {
        data: users = [],
        error2,
        isLoading2,
    } = useSWR(`${SERVER_URL}/users?fields=${encodeURIComponent("id,username,team")}&groupBy=team`, FETCHER);


    const {data:allDetailUsers}=useSWR(`${SERVER_URL}/users`,FETCHER);


    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    return (
        <OnDutyUserContextProvider>
            <DialogContextProvider>
                <Theme accentColor="indigo">
                    <header className=" sticky w-full top-0  h-[3rem] text-white bg-blue-900 " style={{ gridRow: "1" }}>
                        <div className="flex flex-row h-full items-center justify-between  flex-1">
                            <h3 className="text-xl mx-4 font-bold  flex gap-2 max-[500px]:hidden">
                                <PlaneTakeoff />
                                ZHEC
                            </h3>

                            <h3 className="text-xl mx-4 font-bold flex gap-2">
                                <TowerControl />
                                管制执勤统计
                            </h3>
                            <div className="text-xl mx-4 font-bold flex gap-2  flex-wrap items-center ">
                                <HandMetal />
                                <Switch color="blue" variant="classic" defaultChecked />
                                <ScanFace />
                            </div>
                        </div>
                    </header>

                    <div className="flex flex-row flex-wrap gap-4 m-8 items-start content-start">
                        {displayPositions.map((item, index) => {
                            return <Position key={index} {...item} />;
                        })}
                        {JSON.stringify(displayPositions)}
                        <br />
                        ===========
                        {/* {JSON.stringify(allDetailUsers)} */}
                    </div>
                    {/* <FaceDialog /> */}
                    {error2 ? <div>ERROR</div> : isLoading2 ? <div>Loading</div> : <UserListDialog users={users} allDetailUsers={allDetailUsers} />}
                    <ConfirmGetOutDialog />
                </Theme>
            </DialogContextProvider>
        </OnDutyUserContextProvider>
    );
}

export default AppMobile;
