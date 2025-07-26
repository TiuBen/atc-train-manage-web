import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { SERVER_URL, FETCHER, DialogContextProvider } from "@utils";
import { TowerControl, PlaneTakeoff, ScanFace, HandMetal } from "lucide-react";
import styled from "styled-components";
import Position from "./PositionSeatStaff/Position";
import { Theme, Switch } from "@radix-ui/themes";
import UserListDialog from "./Dialog/UserListDialog";
import FaceDialog from "./Dialog/FaceDialog";
import ConfirmGetOutDialog from "./Dialog/ConfirmGetOutDialog";
import useStore from "../utils/store/userStore";

function AppMobile() {
    const { positions, isLoading, error, onDutyUsers } = useStore();

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    return (
        <Theme accentColor="indigo">
            <DialogContextProvider>
                <header
                    className=" sticky w-full top-0  h-[3rem] text-white bg-blue-900 z-50 "
                    style={{ gridRow: "1" }}
                >
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
                    {positions.map((item, index) => {
                        return <Position key={index} {...item} />;
                    })}
                    {JSON.stringify(onDutyUsers)}
                </div>
                {/* <FaceDialog /> */}
                {error ? <div>ERROR</div> : isLoading ? <div>Loading</div> : <UserListDialog />}
                <ConfirmGetOutDialog />
            </DialogContextProvider>
        </Theme>
    );
}

export default AppMobile;
