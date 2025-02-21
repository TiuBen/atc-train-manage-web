import React, { useEffect, useState } from "react";
import { Route, useLoaderData, Outlet } from "react-router-dom";
import Sheet from "./SheetPage/Sheet.jsx";

import RadioButtonUserList from "./RightBar/RadioButtonUserList/RadioButtonUserList.jsx";
import DefaultPage from "./DefaultPage/DefaultPage.jsx";
import LikeExcel from "./SheetPage/LikeExcel/LikeExcel.jsx";

import UserSettingPage from "./UserSettingPage/UserSettingPage.jsx";

const _testData = {
    "2025-01-01": () => <div>新年快乐！</div>,
    "2025-01-15": () => <div>今天是特别的日子！</div>,
};

function Page2() {
    return (
        <div className="relative">
            <Outlet />
        </div>
    );
}

const TestPage = () => {
    return <div>test</div>;
};

// function Page2Route() {
//     return (
//         <Route path="admin" element={<Page2 />}>
//             <Route index element={<DefaultPage />} />
//             <Route path="sheet" element={<Sheet />} />
//             <Route path="setting" element={<TestPage />} />
//         </Route>
//     );
// }

const Page2Routes = [
    {
        path: "admin",
        main: () => <DefaultPage />,
        sidebar: () => <>ddd</>,
    },
    {
        path: "admin/sheet",
        main: () => <LikeExcel />,
        sidebar: () => <RadioButtonUserList />,
    },
    {
        path: "admin/setting",
        main: () => <UserSettingPage />,
        sidebar: () => < RadioButtonUserList/>,
    },
];

export { Page2Routes };
