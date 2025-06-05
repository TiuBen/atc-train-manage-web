import { useState, useEffect } from "react";
import { Theme } from "@radix-ui/themes";

import { Route, Outlet, BrowserRouter, Routes, Link } from "react-router-dom";
import { OnDutyUserContextProvider, DialogContextProvider, PageContextProvider } from "@utils";
import Skeleton from "./Skeleton/Skeleton";
import LeftBar from "./BarLeft/LeftBar";
import BottomBar from "./BarBottom/BottomBar";

import TopNav from "./TopNav/TopNav";
import useStore from "../utils/store/userStore";
import EditDutyRecordSheet from "./Dialog/EditDutyRecordSheet";
import EditPositionDialog from "./Dialog/EditPositionDialog";
import PositionList from "./CommonComponent/PositionList";
import MonthPage from "./Page1/MonthPage/MainMonth";
import DutyPageMain from "./Page1/OnDutyPage/DutyPageMain";
import DefaultPage from "./Page2/DefaultPage/DefaultPage";
import SettingPage from "./Page2/SettingPage/SettingPage";
import Sheet from "./Page2/SheetPage/Sheet";
import NightPage from "./Page2/NightCount/NightPage";

function AppV7() {
    const { fetchUsers,fetchPositions } = useStore();
    useEffect(() => {
        fetchUsers();
        fetchPositions();
    }, [fetchUsers,fetchPositions]);
    return (
        <PageContextProvider>
            <DialogContextProvider>
                <OnDutyUserContextProvider>
                    <Theme accentColor="indigo">
                        <BrowserRouter>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <Skeleton
                                            topNav={<TopNav />}
                                            LeftSidebar={<LeftBar />}
                                            bottomBar={<BottomBar />}
                                        />
                                    }
                                >
                                    <Route index element={<MonthPage/>} />

                                    <Route path="duty" element={<DutyPageMain/>} />
                                    <Route path="calendar" element={<MonthPage />} />
                                    <Route path="admin">
                                        <Route index element={<DefaultPage/>} />
                                        <Route path="sheet" element={<Sheet/>} />
                                        <Route path="setting" element={<SettingPage />} />
                                        <Route path="night" element={<NightPage/>} />
                                    </Route>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </Theme>
                </OnDutyUserContextProvider>
            </DialogContextProvider>
        </PageContextProvider>
    );
}

export default AppV7;
