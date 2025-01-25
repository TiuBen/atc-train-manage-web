import React from "react";
import styled from "styled-components";

const StyledLikeExcel = styled.table`
    width: 100%;
    border-collapse: collapse;

    td {
        padding: 0.2rem;
        border: 1px solid black;

        &:hover {
            background-color: #e0e0e0;
        }
    }

    th {
        padding: 0.2rem;
        border: 1px solid black;
    }
`;

function LikeExcel() {
    return (
        <div className="flex flex-col justify-start items-start">
           
            <div className="flex flex-row justify-start items-start">
                <StyledLikeExcel>
                    <thead>
                        <tr>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">日 期</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">岗 位</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">上岗时刻</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">交接班</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">离岗时刻</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">时段工作小时</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">白班小时</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">
                                夜班小时 (0000-0800)
                            </td>
                        </tr>
                    </thead>
                </StyledLikeExcel>
                <div>
                    <StyledLikeExcel>
                        <tr>
                            <th rowSpan="2">统计</th>
                            <th colSpan="3">各席位总小时</th>
                            <th rowSpan="2">备注</th>
                        </tr>
                        <tr>
                            <th>白班小时</th>
                            <th>夜班小时 (0000-0800)</th>
                        </tr>
                        <tr>
                            <td>带班主任席执勤小时</td>
                            <td>58.4</td>
                            <td>33.5</td>
                            <td>24.9</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>机场管制席执勤小时</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>机场协调席执勤小时</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>放行席执勤小时</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>地面席执勤小时</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>进近管制席执勤小时</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>进近协调席执勤小时</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>综合协调席小时</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>见习管制员小时</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>管制教员席小时</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td></td>
                        </tr>
                    </StyledLikeExcel>
                    <StyledLikeExcel>
                        <tr>
                            <th rowSpan="2">统计</th>
                            <th rowSpan="2">各席位总小时</th>
                            <th colSpan="2">月度总小时统计</th>
                            <th rowSpan="2">备注</th>
                        </tr>
                        <tr>
                            <th>白班小时</th>
                            <th>夜班小时 (0000-0800)</th>
                        </tr>
                        <tr>
                            <td>带班主任席执勤小时</td>
                            <td>58.4</td>
                            <td>33.5</td>
                            <td>24.9</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>席位执勤小时</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>见习管制员小时</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>管制教员小时</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>月度总小时</td>
                            <td>58.4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </StyledLikeExcel>
                </div>
            </div>
            <StyledLikeExcel>
                <tr>
                    <th>1月</th>
                    <th>2月</th>
                    <th>3月</th>
                    <th>4月</th>
                    <th>5月</th>
                    <th>6月</th>
                    <th>7月</th>
                    <th>8月</th>
                    <th>9月</th>
                    <th>10月</th>
                    <th>11月</th>
                    <th>12月</th>
                </tr>
            </StyledLikeExcel>
        </div>
    );
}

export default LikeExcel;
