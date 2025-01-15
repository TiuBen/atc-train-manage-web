import { useState } from "react";
import { Theme } from "@radix-ui/themes";
import Skeleton from "./Skeleton/Skeleton";
import LeftBar from "./LeftBar/LeftBar";
import { createBrowserRouter,createRoutesFromElements,Route, RouterProvider,Outlet } from "react-router-dom";
import Page1Route from "./Page1/Page1";
import Page2Route from "./Page2/Page2";

function AppVSkeleton() {
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);

    return (
        <Theme accentColor="indigo">
            <Skeleton
                topNav={<div>Top Na嘀嘀嘀vigation</div>}
                LeftSidebar={<LeftBar isExpanded={isLeftSidebarOpen} />}
                rightSidebar={<div>Right Sidebar</div>}
                main={<Outlet />}
                bottomBar={<div>Bottom Bar</div>}
                floatingAction={<span>+</span>}
                isLeftSidebarOpen={isLeftSidebarOpen}
                setLeftSidebarOpen={setLeftSidebarOpen}
            />
            
        </Theme>
    );

}




function AppV2() {
   

    return (
        // <BrowserRouter>
        //     <Routes>
        //         <Route path="/"  element={<AppVSkeleton />} > 
        //             {Page1Route()}
        //         </Route>
        //     </Routes>

        // </BrowserRouter>

        <RouterProvider router={createBrowserRouter(
            createRoutesFromElements(
                <Route path="/"  element={<AppVSkeleton />} > 
                    {Page1Route()}
                    {Page2Route()}
                </Route>
            )
        )} />

    )

}






export default AppV2;
