import React from "react";

function LikeExcel() {
    return (
        <div>
            LikeExcel
            <table className="border-collapse border border-slate-40">
                <thead>
                    <tr>
                        <td className="border border-slate-300">日 期</td>
                        <td className="border border-slate-300">岗 位</td>
                        <td className="border border-slate-300">上岗时刻</td>
                        <td className="border border-slate-300">交接班</td>
                        <td className="border border-slate-300">离岗时刻</td>
                        <td className="border border-slate-300">时段工作小时</td>
                        <td className="border border-slate-300">白班小时</td>
                        <td className="border border-slate-300">夜班小时 (0000-0800)</td>
                    </tr>
                </thead>
            </table>
        </div>
    );
}

export default LikeExcel;
