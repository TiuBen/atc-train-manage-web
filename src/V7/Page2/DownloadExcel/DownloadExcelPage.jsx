import React, { useState, useEffect, useRef } from "react";
import { TabNav, Tabs } from "@radix-ui/themes";
import { FileDown } from "lucide-react";
import dayjs from "dayjs";
import { API_URL, FETCHER } from "../../../utils/const/Const";

function DownloadExcel({
    fileName, // 下载的文件名
    disabled = false,
}) {
    const [exists, setExists] = useState(false);
    const [regenerating, setRegenerating] = useState(false);
    const timerRef = useRef(null);

    const [loading, setLoading] = useState(false);

    // 组件加载时检查文件是否存在
    useEffect(() => {
        fetch(`${API_URL.files}/exists?fileName=${fileName}`)
            .then((res) => res.json())
            .then((data) => setExists(data.exists))
            .catch(() => setExists(false));
    }, [fileName]);

    // 下载文件
    const handleDownload = async () => {
        if (!exists) return;
        const res = await fetch(`${API_URL}/download?fileName=${fileName}`);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
    // 长按开始（发起重新生成）
    const handleMouseDown = () => {
        timerRef.current = setTimeout(() => {
            setRegenerating(true);
            fetch(`${API_URL}/regenerate?fileName=${fileName}`, { method: "POST" })
                .then(() => {
                    // 模拟等待后端生成完成，再次检查文件是否存在
                    setTimeout(() => {
                        fetch(`${API_URL}/exists?fileName=${fileName}`)
                            .then((res) => res.json())
                            .then((data) => {
                                setExists(data.exists);
                                setRegenerating(false);
                            });
                    }, 2000);
                })
                .catch(() => setRegenerating(false));
        }, 800); // 长按 800ms 触发
    };

    // 鼠标抬起（如果没到长按时间，就算普通点击）
    const handleMouseUp = () => {
        clearTimeout(timerRef.current);
        if (!regenerating && exists) {
            handleDownload();
        }
    };

    // const handleDownload = async () => {
    //     setLoading(true);
    //     try {
    //         // 带文件名传递给后端
    //         const res = await fetch(`${API_URL.excel}?fileName=${encodeURIComponent(fileName)}`, {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //             },
    //         });

    //         if (res.status === 202) {
    //             // 后端说还在处理 → 轮询
    //             const { taskId } = await res.json();
    //             await pollForFile(taskId);
    //         } else if (res.ok) {
    //             await triggerDownload(res, fileName);
    //         } else {
    //             throw new Error("下载失败");
    //         }
    //     } catch (err) {
    //         console.error("Excel 下载失败:", err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

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
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => clearTimeout(timerRef.current)}
            className={`px-4 py-2 rounded-xl border transition-all 
        ${exists ? "border-blue-500 text-blue-600" : "border-gray-400 text-gray-400"}
        ${regenerating ? "bg-blue-100 animate-pulse shadow-[0_0_15px_#3b82f6]" : ""}
      `}
        >
            {regenerating ? "正在生成..." : exists ? "下载文件" : "文件不存在"}
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
