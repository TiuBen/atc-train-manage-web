import React from "react";

function TimelineDutyDialog() {
    return (
        <div className="relative left-[4rem] border-l-[0.2rem] border-gray-300 h-[600px]">
            {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="absolute" style={{ top: `${(i / 24) * 100}%`, left: "0px" }}>
                    {/* 短横线 */}
                    <div className="w-2 h-[2px] absolute left-[-0.5rem] top-[0rem] bg-red-400 inline-block" />
                    {/* 时间文字 */}
                    <span className="ml-1 text-xs text-gray-500 absolute left-[-2.5rem]">
                        {String(i).padStart(2, "0")}:00
                    </span>
                </div>
            ))}
        </div>
    );
}

export default TimelineDutyDialog;
