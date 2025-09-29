import { useState } from "react";
import { AlignJustify, User } from "lucide-react";
import UserListDialog from "../Dialog/UserListDialog";
import { Outlet } from "react-router-dom";

function Skeleton({
    LeftSidebar,
    isLeftSidebarOpen,
    setLeftSidebarOpen,
    topNav,
    rightSidebar,
    main,
    bottomBar,
    floatingAction,
    children,
}) {
    const [isRightSidebarOpen, setRightSidebarOpen] = useState(true);

    return (
        <>
            <div
                className=" overflow-hidden"
                style={{ display: "grid", height: "100vh", gridTemplateRows: "3rem 1fr 2rem", position: "relative" }}
            >
                {/* Top Navigation */}
                {
                    <header className=" sticky w-full top-0  h-[3rem] text-white bg-blue-900 " style={{ gridRow: "1" }}>
                        {topNav}
                    </header>
                }

                <div className="flex flex-1 flex-row overflow-hidden">
                    {/* Left Sidebar */}

                    <>{LeftSidebar}</>

                    {/* Main Content */}
                    <main className="border border-yellow-400  w-full h-full  relative">{<Outlet />}</main>

                    {/* Right Sidebar */}
                    {/* {rightSidebar!==null ? (
                        <aside className="w-64 bg-gray-400 border-l border-gray-200 ">ddd {rightSidebar}</aside>
                    ):<></>} */}
                </div>

                {/* Bottom Bar */}
                {bottomBar && (
                    <footer className="w-full bg-blue-900 text-white flex flex-row flex-1 items-center ">
                        {bottomBar}
                    </footer>
                )}

                {/* Floating Action Button */}
                {/* {floatingAction && (
                <div className=" bottom-8 right-8">
                    <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700">
                        {floatingAction}
                    </button>
                </div>
            )} */}
            </div>
            {/* <UserListDialog />   */}
        </>
    );
}

export default Skeleton;
