import { useState } from "react";
import { Theme } from "@radix-ui/themes";
import Skeleton from "./Skeleton/Skeleton";
import LeftBar from "./LeftBar/LeftBar";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Outlet,
    BrowserRouter,
    Routes,
    Link
} from "react-router-dom";
import { DialogContextProvider } from "@/utils/context/DialogContext";
import { OnDutyUserContextProvider } from "@/utils/context/OnDutyUserContext";
import { PageContextProvider } from "@/utils/context/PageContext";
import {Page1Routes} from "./Page1/Page1"
import { Page2Routes } from "./Page2/Page2";

import  UserListDialog  from "./Dialog/UserListDialog";
import TopNav from "./TopNav/TopNav";
import BottomBar from "./BottomBar/BottomBar";



const routes = [
    ...Page1Routes,
    ...Page2Routes,
];

function AppVSkeleton() {
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);

    return (
        <PageContextProvider>

        <DialogContextProvider>
            <OnDutyUserContextProvider>
                <Theme accentColor="indigo">
                    <Skeleton
                        topNav={<TopNav />}
                        LeftSidebar={<LeftBar isExpanded={isLeftSidebarOpen} />}
                        main={
                            <>
                                <Routes>
                                    {routes.map(({ path, main }) => (
                                        <Route key={path} path={path} element={main()} />
                                    ))}
                                </Routes>
                                
                            </>
                        }
                        rightSidebar={
                            <Routes>
                                {routes.map(({ path, sidebar }) => (
                                    <Route key={path} path={path} element={sidebar()} />
                                ))}
                            </Routes>
                        }
                        bottomBar={<BottomBar />}
                        floatingAction={<span>+</span>}
                        isLeftSidebarOpen={isLeftSidebarOpen}
                        setLeftSidebarOpen={setLeftSidebarOpen}
                    />
                    <UserListDialog />
                </Theme>
            </OnDutyUserContextProvider>
        </DialogContextProvider>
        </PageContextProvider>

    );
}

function AppV3() {
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);

    return (
        // <BrowserRouter>
        //     <Skeleton
        //         topNav={<div>Top Na嘀嘀嘀vigation</div>}
        //         LeftSidebar={<LeftBar isExpanded={isLeftSidebarOpen} />}
        //         main={<Outlet />}
        //         rightSidebar={<>对对对对</>}
        //         bottomBar={<div>Bottom Bar</div>}
        //         floatingAction={<span>+</span>}
        //         isLeftSidebarOpen={isLeftSidebarOpen}
        //         setLeftSidebarOpen={setLeftSidebarOpen}

        //     />
        // </BrowserRouter>

        // <RouterProvider
        //     router={createBrowserRouter(createRoutesFromElements(<Route index element={<AppVSkeleton />}></Route>))}
        // />
        <BrowserRouter>
            <AppVSkeleton />
        </BrowserRouter>
    );
}

export default AppV3;
