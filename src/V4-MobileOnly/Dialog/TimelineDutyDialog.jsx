import React from "react";
import styled from "styled-components";

const timelineC = styled.div`
    position: static;
    height: 100%;
`;
const timelineDD = styled.div`
    border-left: 0.2rem black solid;
`;

function TimelineDutyDialog() {
    return (
        <div className="relative flex flex-row h-[1000px]">
            <div className="hidden relative left-[4rem] border-l-[0.2rem] border-gray-300 h-[600px]">
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

            <div className="relative h-full ">
                {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className="relative border border-gray-300">
                        <div
                            className="border-r-[0.2rem] pr-[1rem] border-green-200  
                            after:content-[''] 
                            after:absolute 
                            after:h-[0.25rem] 
                            after:w-[1rem] 
                            after:bg-red-500
                            after:top-1/2 
                            after:translate-y-[-50%]
                            after:translate-x-1/2
                            "
                        >
                            {/* 时间文字 */}
                            {String(i).padStart(2, "0")}:00{" "}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TimelineDutyDialog;
