import { useState } from "react";
import { Theme } from "@radix-ui/themes";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Outlet,
    BrowserRouter,
    Routes,
    Link,
} from "react-router-dom";
import { OnDutyUserContextProvider, DialogContextProvider, PageContextProvider } from "@utils";
import Skeleton from "./Skeleton/Skeleton";
import LeftBar from "./LeftBar/LeftBar";
import { Page1Routes } from "./Page1/Page1";
import { Page2Routes } from "./Page2/Page2";

import UserListDialog from "./Dialog/UserListDialog";
import TopNav from "./TopNav/TopNav";
import BottomBar from "./BottomBar/BottomBar";
import FaceDialog from "./Dialog/FaceDialog";
const routes = [...Page1Routes, ...Page2Routes];

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
                        <FaceDialog />
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
