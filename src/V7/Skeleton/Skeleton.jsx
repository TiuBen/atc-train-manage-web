import { useState } from "react";
import { AlignJustify, User } from "lucide-react";
import UserListDialog from "../Dialog/UserListDialog";
import { Outlet } from "react-router-dom";
import LeftBar from "../BarLeft/LeftBar";

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
    const [navWidth, setNavWidth] = useState("8rem");

    return (
        <>
            <div className="grid grid-rows-[3rem,1fr,1.5rem] grid-cols-[min-content_1fr] h-[100vh] w-[100vw] overflow-hidden">
                <header className=" col-span-2">{topNav}</header>
                <nav className=" h-[calc(100vh-4.5rem)] overflow-y-auto">{LeftSidebar}</nav>
                <main className="w-full h-full  relative">{<Outlet />}</main>
                <footer className="col-span-2">{bottomBar}</footer>
            </div>
        </>
    );
}

export default Skeleton;
