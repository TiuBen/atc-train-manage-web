import React from "react";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import RadioButtonUserList from "./RadioButtonUserList/RadioButtonUserList";
import LikeExcel from "./LikeExcel/LikeExcel";

function Sheet() {
    return (
        <div className="flex flex-row flex-nowrap">
            <div className="flex flex-1 flex-col flex-nowrap text-nowrap">
                <LikeExcel />
            </div>
            <aside className="w-64">
                <RadioButtonUserList />
            </aside>
        </div>
    );
}

export default Sheet;

{
    /* <div  className="sheet-item border border-gray-600 items-center flex">
<ChevronLeft size={16} absoluteStrokeWidth />
</div>
<div  className="sheet-item border border-gray-600 items-center flex">
<ChevronRight size={16} absoluteStrokeWidth />
</div>
<div  className="sheet-item border border-gray-600 items-center flex">
<Ellipsis size={16} absoluteStrokeWidth />
</div>
{Array(20)
 .fill(0)
 .map((x, i) => {
     return (
         <div key={i} className="sheet-item border border-gray-600">
             <div className="sheet-item-title px-2">Sheet {i + 1}</div>
         </div>
     );
 })} */
}
