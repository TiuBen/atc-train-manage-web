import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { SERVER_URL, FETCHER, DialogContextProvider, OnDutyUserContextProvider } from "@utils";
import { TowerControl, PlaneTakeoff } from "lucide-react";
import styled from "styled-components";
import Position from "./PositionSeatStaff/Position";
import { Theme } from "@radix-ui/themes";
import UserListDialog from "./Dialog/UserListDialog";
import FaceDialog from "./Dialog/FaceDialog";

function AppMobile() {
    const { data:positions, error, isLoading } = useSWR(`${SERVER_URL}/query/positions`, FETCHER);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return (
        <OnDutyUserContextProvider>
            <DialogContextProvider>
                <Theme accentColor="indigo">
                    <div
                        // className=" overflow-hidden "
                        style={{
                            display: "grid",
                            height: "100vh",
                            gridTemplateRows: "3rem 1fr 2rem",
                            position: "relative",
                        }}
                    >
                        <header
                            className=" sticky w-full top-0  h-[3rem] text-white bg-blue-900 "
                            style={{ gridRow: "1" }}
                        >
                            <div className="flex flex-row h-full items-center justify-between  flex-1">
                                <h3 className="text-xl mx-4 font-bold  flex gap-2 max-[500px]:hidden">
                                    <PlaneTakeoff />
                                    湖北国际物流机场空管服务公司
                                </h3>

                                <h3 className="text-xl mx-4 font-bold flex gap-2">
                                    <TowerControl />
                                    管制执勤统计
                                </h3>
                            </div>
                        </header>

                        <div className="flex flex-row flex-wrap gap-4 m-8 items-start content-start">
                            {positions.map((item, index) => {
                                if (item.display) {
                                    return <Position key={index} {...item} />;
                                }
                            })}
                        </div>
                    </div>
                    <FaceDialog />
                    <UserListDialog />
                </Theme>
            </DialogContextProvider>
        </OnDutyUserContextProvider>
    );
}

export default AppMobile;
