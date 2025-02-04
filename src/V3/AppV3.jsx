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
} from "react-router-dom";
import { DialogContextProvider } from "@/utils/context/DialogContext";
import { OnDutyUserContextProvider } from "@/utils/context/OnDutyUserContext";
import RouteTestPage from "./RouteTestPage/RouteTestPage";

function AppVSkeleton() {
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);

    return (
        <DialogContextProvider>
            <OnDutyUserContextProvider>
                <Theme accentColor="indigo">
                    <Skeleton
                        topNav={<div>Top Na嘀嘀嘀vigation</div>}
                        LeftSidebar={<LeftBar isExpanded={isLeftSidebarOpen} />}
                        main={<Routes>{RouteTestPage()}</Routes>}
                        rightSidebar={<Routes>{RouteTestPage()}</Routes>}
                        bottomBar={<div>Bottom Bar</div>}
                        floatingAction={<span>+</span>}
                        isLeftSidebarOpen={isLeftSidebarOpen}
                        setLeftSidebarOpen={setLeftSidebarOpen}
                    />
                </Theme>
            </OnDutyUserContextProvider>
        </DialogContextProvider>
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

        <RouterProvider
            router={createBrowserRouter(
                createRoutesFromElements(
                    <Route path="/" element={<AppVSkeleton />}>
                        {Page1Route()}
                        {Page2Route()}
                    </Route>
                )
            )}
        />
    );
}

export default AppV3;
