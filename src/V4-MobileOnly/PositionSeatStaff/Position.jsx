import React from "react";
import { Button } from "@radix-ui/themes";
import Seat from "./Seat";

//*     Position
//*         |
//*    Seat    Seat
//*    |       |
//*    Staff   Staff
//*    Staff   Staff

function Position(props) {
    const { position, dutyType } = props;

    return (
        <div>
            <div className="border rounded-lg flex  flex-col items-center gap-2 p-1 self-stretch text-nowrap">
                <h2 className="font-black text-xl px-1">{position+"："+dutyType}</h2>

                <div className="flex flex-row gap-2 p-1">
                    {dutyType==="主班,副班" ? (
                        <>
                            {["主班","副班"].map((x, index) => {
                                return <Seat position={position} dutyType={x} key={index} />;
                            })}
                        </>
                    ) : (
                        <Seat position={position} dutyType={null} />

                    )}
                </div>
            </div>
        </div>
    );
}

export default Position;
