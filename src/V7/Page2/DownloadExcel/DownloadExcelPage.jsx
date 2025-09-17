import React, { useState, useEffect } from "react";
import { TabNav, Tabs } from "@radix-ui/themes";
import { FileDown } from "lucide-react";
import dayjs from "dayjs";
import { API_URL, FETCHER } from "../../../utils/const/Const";

function DownloadExcel({
    fileName, // 下载的文件名
    className = "",
    disabled = false,
}) {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            // 带文件名传递给后端
            const res = await fetch(`${API_URL.excel}?fileName=${encodeURIComponent(fileName)}`, {
                method: "GET",
                headers: {
                    Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
            });

            if (res.status === 202) {
                // 后端说还在处理 → 轮询
                const { taskId } = await res.json();
                await pollForFile(taskId);
            } else if (res.ok) {
                await triggerDownload(res, fileName);
            } else {
                throw new Error("下载失败");
            }
        } catch (err) {
            console.error("Excel 下载失败:", err);
        } finally {
            setLoading(false);
        }
    };

    const pollForFile = async (taskId) => {
        let done = false;
        while (!done) {
            await new Promise((r) => setTimeout(r, 1000)); // 每 3 秒轮询
            const res = await fetch(`${API_URL.excel}/status/${taskId}`);
            if (res.ok) {
                const blob = await res.blob();
                await triggerDownload(blob, fileName);
                done = true;
            }
        }
    };

    const triggerDownload = async (resOrBlob, fileName) => {
        const blob = resOrBlob instanceof Response ? await resOrBlob.blob() : resOrBlob;
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    return (
        <button
            type="button"
            onClick={handleDownload}
            disabled={disabled||loading}
            className={[
                "w-[12rem] h-[2rem] text-nowrap text-center",
                "inline-flex items-center  justify-start px-2 self-center justify-self-center gap-2 rounded-lg  py-2",
                "border border-gray-300 shadow-sm",
                "hover:shadow transition active:scale-[0.98]",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "bg-white hover:bg-gray-50",
                className,
            ].join(" ")}
        >
            <FileDown size={"1em"} />
            <span className=" font-medium">{fileName}</span>
        </button>
    );
}

function DownloadExcelPage() {
    return (
        <>
            <div className="flex flex-col gap-2 flex-1 ">
                <div className="flex flex-row items-center px-4">
                    <h1 className=" self-center text-xl font-bold text-blue-700 text-center">
                        {dayjs().get("year")}年夜班次数统计
                    </h1>
                    {/* 撑空间用的 */}
                    <TabNav.Root style={{ visibility: "hidden" }}>
                        <TabNav.Link style={{ visibility: "hidden" }}></TabNav.Link>
                    </TabNav.Root>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: dayjs().month() + 1 }).map((_, index) => (
                        <DownloadExcel key={index} fileName={`${dayjs().get("year")}年${index + 1}月执勤.xlsx`} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default DownloadExcelPage;
