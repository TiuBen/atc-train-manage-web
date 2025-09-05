import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocalStorageState } from "ahooks";
import dayjs from "dayjs";
import useSWR, { mutate } from "swr";
import { SERVER_URL, FETCHER, usePage } from "@utils";
import { Settings, Edit3 } from "lucide-react";
import EditDutyRecordSheet from "../../../Dialog/EditDutyRecordSheet";
import { API_URL } from "../../../../utils/const/Const";
import useStore from "../../../../utils/store/userStore";
import useDialog from "../../../../utils/hooks/useDialog";
import DetailStatisticsTable from "./DetailStatisticsTable";

/**
 * 格式化数值：保留2位小数，若无有效值则返回0
 * @param {number|null|undefined} value - 输入值
 * @returns {number} 格式化后的值（或0）
 */
function formatDecimal(value) {
    // 检查是否为有效数字（非 null/undefined/NaN，且不为 0）
    if (value === null || value === undefined || isNaN(value)) {
        return 0;
    }

    // 四舍五入到2位小数，并避免 -0 的情况
    const rounded = Math.round(value * 100) / 100;
    return rounded === 0 ? "" : rounded; // 明确返回 0（而非 -0）
}

function LikeExcel() {
    const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
    const { payload, setPayload } = usePage();
    const { username: queryName, editSheetDisplay, id } = payload;

    const [dutyRows, setDutyRows] = useState([]);
    const [dutyStatics, setDutyStatics] = useState([]);
    const { selectedUser } = useStore();
    const { setDialogPayload } = useDialog();

    const [searchParams, setSearchParams] = useState(null);
    // 使用useSWR监听searchTerm，当searchTerm为空时不发送请求
    const { data: selectedUserDutyRows } = useSWR(searchParams ? `${API_URL.duty}?${searchParams}` : null, FETCHER, {
        // 可选配置：防抖等逻辑通常需要在输入框层面处理，这里可以配置一些SWR选项
        revalidateOnFocus: true, // 例如，搜索结果可能不需要在窗口聚焦时重新验证
        fallbackData: [],
    });

    const { data: selectedUserDutyStatistics } = useSWR(
        searchParams ? `${API_URL.users}/${searchParams.get("userId")}/dutyStatistics?${searchParams}` : null,
        FETCHER,
        {
            // 可选配置：防抖等逻辑通常需要在输入框层面处理，这里可以配置一些SWR选项
            revalidateOnFocus: true, // 例如，搜索结果可能不需要在窗口聚焦时重新验证
            fallbackData: {},
        }
    );

    const { data: selectedUserTeachStatistics } = useSWR(
        searchParams ? `${API_URL.users}/${searchParams.get("userId")}/teachStatistics?${searchParams}` : null,
        FETCHER,
        {
            // 可选配置：防抖等逻辑通常需要在输入框层面处理，这里可以配置一些SWR选项
            revalidateOnFocus: true, // 例如，搜索结果可能不需要在窗口聚焦时重新验证
            fallbackData: {},
        }
    );

    useEffect(() => {
        // append 可以添加多个相同名称的参数

        if (selectedMonth && selectedUser) {
            let q = new URLSearchParams();

            q.append("userId", selectedUser.id);
            q.append("username", selectedUser.username);

            // Append startDate and startTime
            q.append("startDate", dayjs().month(selectedMonth).date(1).format("YYYY-MM-DD"));
            q.append("startTime", "00:00:00");

            // Append endDate and endTime
            q.append(
                "endDate",
                dayjs()
                    .month(selectedMonth + 1)
                    .date(1)
                    .format("YYYY-MM-DD")
            );
            q.append("endTime", "00:00:01");

            setSearchParams(q);
        }
    }, [selectedMonth, selectedUser, payload]);

    return (
        <div className="relative  flex flex-col gap-1 text-wrap flex-1 m-2 ">
            <div className="w-full flex ">
                {["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"].map(
                    (x, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex-1 border border-black text-center rounded-t-lg hover:font-bold ${
                                    index === selectedMonth ? " bg-inherit font-extrabold  " : "bg-slate-200"
                                }`}
                                onClick={() => {
                                    setSelectedMonth(index);
                                }}
                            >
                                {x}
                            </div>
                        );
                    }
                )}
            </div>
            <div className="flex flex-row justify-start items-start gap-2 ">
                <table>
                    <thead>
                        <tr>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">修改</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">日 期</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">岗 位</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">上岗时刻</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">交接班</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">离岗时刻</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">
                                时段
                                <br />
                                工作小时
                            </td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">白班小时</td>
                            <td className="border border-slate-600 px-2 text-nowrap text-center">
                                夜班小时 <br /> (0000-0800)
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedUserDutyRows.map((x, index) => {
                            return (
                                <tr
                                    key={index}
                                    className={`text-sm font-bold group hover:bg-transparent ${
                                        dayjs(x.outTime).diff(dayjs(x.inTime, "YYYY-MM-DD HH:mm:ss"), "h", true) > 8.0
                                            ? "text-red-600"
                                            : ""
                                    }`}
                                >
                                    <td className="border border-slate-600 px-2 text-nowrap text-center group-hover:bg-slate-400">
                                        <button
                                            onClick={() => {
                                                console.log("clicked " + x.id);
                                                setDialogPayload({
                                                    ...payload,
                                                    editSheetDisplay: true,
                                                    editSheetRowId: x.id,
                                                });
                                                useStore.setState({ selectedDutyRecord: x });
                                            }}
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        {/* <>{x.id}</> */}
                                    </td>
                                    <td className="border border-slate-600 px-2 text-nowrap text-center group-hover:bg-slate-400">
                                        {dayjs(x.inTime).format("YYYY-MM-DD")}
                                    </td>
                                    <td className="border border-slate-600 px-2 text-nowrap group-hover:bg-slate-400">
                                        <span
                                            className={`text-xs italic ml-2 ${
                                                x.relatedDutyTableRowId && x.position !== "领班" ? "bg-slate-400" : ""
                                            }  ${x.roleType ? "bg-slate-400 line-through" : ""} `}
                                        >
                                            {x.position}
                                        </span>
                                        {x.roleType && <span className="text-xs italic ml-2   ">见习</span>}
                                        {x.relatedDutyTableRowId && (
                                            <span
                                                className={`text-xs italic ml-2 ${
                                                    x.position === "领班" ? "bg-slate-400 line-through" : ""
                                                }`}
                                            >
                                                教员
                                            </span>
                                        )}
                                        {x.dutyType === "副班" && <span className="text-xs  ml-2   ">(副班)</span>}
                                    </td>
                                    <td
                                        className={`border border-slate-600 px-2 text-nowrap text-center group-hover:bg-slate-400 ${
                                            dayjs(x.inTime).month() !== selectedMonth ? "bg-red-400" : " "
                                        }`}
                                    >
                                        {dayjs(x.inTime).format("YYYY-MM-DD HH:mm:ss")}
                                    </td>
                                    <td className="border border-slate-600 px-2 text-nowrap text-center group-hover:bg-slate-400">
                                        {x.outTime !== null ? "完成" : ""}
                                    </td>
                                    <td
                                        className={`border border-slate-600 px-2 text-nowrap text-center group-hover:bg-slate-400 ${
                                            dayjs(x.outTime).month() !== selectedMonth ? "bg-red-400" : " "
                                        }`}
                                    >
                                        {dayjs(x.outTime).format("YYYY-MM-DD HH:mm:ss")}
                                    </td>
                                    <td
                                        className={`border border-slate-600 px-2 text-nowrap text-center group-hover:bg-slate-400 `}
                                    >
                                        {Math.floor(
                                            dayjs(x.outTime).diff(dayjs(x.inTime, "YYYY-MM-DD HH:mm:ss"), "h", true) *
                                                100
                                        ) / 100}
                                    </td>
                                    <td className="border border-slate-600 px-2 text-nowrap text-center group-hover:bg-slate-400">
                                        {x.dayShift === 0 ? "" : x.dayShift}
                                    </td>
                                    <td className="border border-slate-600 px-2 text-nowrap text-center group-hover:bg-slate-400">
                                        {x.nightShift === 0 ? "" : x.nightShift}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <DetailStatisticsTable dutyStatistics={selectedUserDutyStatistics} teachStatistics={ selectedUserTeachStatistics}/>
            </div>
        </div>
    );
}

export default LikeExcel;

// {index === 0 && (
//     <>
//         <td className="border border-slate-600 px-2 text-nowrap text-center">
//             {" "}
//             带班主任席
//         </td>{" "}
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalCommanderTime?.time)}
//         </td>{" "}
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalCommanderTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalCommanderTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 1 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             塔台管制席
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTowerMainTime?.time)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTowerMainTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTowerMainTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 2 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             塔台协调席
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTowerSubTime?.time)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTowerSubTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTowerSubTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 3 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             放行席
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalDeliveryTime?.time)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalDeliveryTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalDeliveryTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 4 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             地面席
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalGroundTime?.time)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalGroundTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalGroundTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 5 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             综合协调席
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalZongheTime?.time)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalZongheTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalZongheTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 6 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             现场调度席
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalAOCTime?.time)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalAOCTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalAOCTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 7 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             见习
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalStudentTime?.time)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalStudentTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalStudentTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 8 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             教员
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTeacherTime?.time)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTeacherTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTeacherTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 9 && (
//     <>
//         <th
//             className=" border border-slate-600 px-2 text-nowrap text-center"
//             colSpan="5"
//         >
//             月度总小时统计
//         </th>
//     </>
// )}
// {index === 10 && (
//     <>
//         <th className=" border border-slate-600 px-2 text-nowrap text-center">
//             统计
//         </th>
//         <th className=" border border-slate-600 px-2 text-nowrap text-center">
//             各席位总小时
//         </th>
//         <th className=" border border-slate-600 px-2 text-nowrap text-center">
//             白班小时
//         </th>
//         <th className=" border border-slate-600 px-2 text-nowrap text-center">
//             夜班小时 <br /> (0000-0800)
//         </th>
//         <th className=" border border-slate-600 px-2 text-nowrap text-center">
//             备注
//         </th>
//     </>
// )}
// {index === 11 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             席位
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(
//                 dutyStatics?.totalCommanderTime?.time +
//                     dutyStatics?.totalTowerTime?.time +
//                     dutyStatics?.totalGroundTime?.time +
//                     dutyStatics?.totalDeliveryTime?.time +
//                     dutyStatics?.totalZongheTime?.time
//             )}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(
//                 dutyStatics?.totalCommanderTime?.dayShift +
//                     dutyStatics?.totalTowerTime?.dayShift +
//                     dutyStatics?.totalGroundTime?.dayShift +
//                     dutyStatics?.totalDeliveryTime?.dayShift +
//                     dutyStatics?.totalZongheTime?.dayShift
//             )}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(
//                 dutyStatics?.totalCommanderTime?.nightShift +
//                     dutyStatics?.totalTowerTime?.nightShift +
//                     dutyStatics?.totalGroundTime?.nightShift +
//                     dutyStatics?.totalDeliveryTime?.nightShift +
//                     dutyStatics?.totalZongheTime?.nightShift
//             )}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 12 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             见习
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalStudentTime?.time)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalStudentTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalStudentTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 13 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             教员
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTeacherTime?.time)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTeacherTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTeacherTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 14 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             现场调度
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalAOCTime?.time)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalAOCTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalAOCTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// {index === 15 && (
//     <>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             月度总小时
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTime?.time)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTime?.dayShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center">
//             {formatDecimal(dutyStatics?.totalTime?.nightShift)}
//         </td>
//         <td className=" border border-slate-600 px-2 text-nowrap text-center"></td>
//     </>
// )}
// </tr>
// );
// })}
