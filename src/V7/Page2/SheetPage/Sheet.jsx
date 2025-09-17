import React, { useEffect, useState } from "react";
import RadioButtonUserList from "../../BarRight/RadioButtonUserList";
import LikeExcel from "./LikeExcel/LikeExcel";

function Sheet() {
   

    return (
        <>
            <div className="flex flex-1 flex-col flex-nowrap text-nowrap overflow-auto">
                <LikeExcel />
            </div>
            <aside className=" border-l px-2 ">
                <RadioButtonUserList />
            </aside>
        </>
    );
}

export default Sheet;
