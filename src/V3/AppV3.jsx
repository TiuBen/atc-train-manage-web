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
import { RouteTestPage } from "./RouteTestPage/RouteTestPage";
const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);
const Profile = () => (
    <div>
        <h2>Profile</h2>
    </div>
);
const Settings = () => (
    <div>
        <h2>Settings</h2>
    </div>
);

const routes = [
    {
        path: "/",
        main: () => <Home />,
        sidebar: () => <p>This is your home page. You'll see your feed which is made up of the people you follow.</p>,
    },
    {
        path: "/profile",
        main: () => <Profile />,
        sidebar: () => (
            <p>
                This is your profile page. You'll be able to see all your profile information as well as the people you
                follow.
            </p>
        ),
    },
    {
        path: "/test",
        main: () => <Settings />,
        sidebar: () => (
            <p>
                This is your settings page. You can change your name, image, and anything else associated with your
                account.
                <Link to={"/"}>Back to Home</Link>
            </p>
        ),
    },
];

function AppVSkeleton() {
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);

    return (
        <DialogContextProvider>
            <OnDutyUserContextProvider>
                <Theme accentColor="indigo">
                    <Skeleton
                        topNav={<div>Top Na嘀嘀嘀vigation</div>}
                        LeftSidebar={<LeftBar isExpanded={isLeftSidebarOpen} />}
                        main={
                            <>
                                <Routes>
                                    {routes.map(({ path, sidebar }) => (
                                        <Route key={path} path={path} element={sidebar()} />
                                    ))}
                                </Routes>
                            "ddd "
                            </>
                        }
                        rightSidebar={
                            // <Routes>
                            //     {RouteTestPage.map(({ path, sidebar }) => (
                            //         <Route key={path} path={path} element={sidebar()} />
                            //     ))}
                            // </Routes>
                            <Routes>
                                {routes.map(({ path, sidebar }) => (
                                    <Route key={path} path={path} element={sidebar()} />
                                ))}
                            </Routes>
                        }
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

        // <RouterProvider
        //     router={createBrowserRouter(createRoutesFromElements(<Route index element={<AppVSkeleton />}></Route>))}
        // />
        <BrowserRouter>
            <AppVSkeleton />
        </BrowserRouter>
    );
}

export default AppV3;
