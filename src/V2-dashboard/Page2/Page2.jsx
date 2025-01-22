
import React, { useEffect, useState } from "react";
import { Route, useLoaderData, Outlet } from "react-router-dom";
import Sheet from './Sheet/Sheet.jsx'


const _testData = {
    "2025-01-01": () => <div>新年快乐！</div>,
    "2025-01-15": () => <div>今天是特别的日子！</div>,
};

function Page2() {
    return (
        <div className="relative flex-1">
            <Sheet />
            <Outlet />
        </div>
    );
}


const TestPage=()=>{
    return <div>test</div>
}

function Page2Route() {
    return (
        <Route path="admin" element={<Page2 />}>
            <Route path="sheet" element={<TestPage />} />
        </Route>
    );
}

export default Page2Route;
