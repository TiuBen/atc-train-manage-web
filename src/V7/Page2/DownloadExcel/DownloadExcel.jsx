import React from "react";
import { FileDown } from "lucide-react";
import {API_URL} from "../../../utils/const/Const";
function DownloadExcel({
    url = "/api/export/excel", // 后端接口地址
    fileName = "export.xlsx", // 下载的文件名
    className = "",
    disabled = false,
}) {
    const handleDownload = async () => {
        try {
            const res = await fetch(`${API_URL.excel}`, {
                method: "GET",
                headers: {
                    Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
            });

            if (!res.ok) throw new Error("下载失败");

            const blob = await res.blob();
            const href = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = href;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(href);
        } catch (err) {
            console.error("Excel 下载失败:", err);
        }
    };
    return (
        <button
            type="button"
            onClick={handleDownload}
            disabled={disabled}
            className={[
                "w-[10rem] h-[2rem]",
                "inline-flex items-center self-center justify-self-center gap-2 rounded-lg px-4 py-2",
                "border border-gray-300 shadow-sm",
                "hover:shadow transition active:scale-[0.98]",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "bg-white hover:bg-gray-50",
                className,
            ].join(" ")}
        >
            <FileDown className="w-5 h-5" />
            <span className="text-sm font-medium">下载 2025年8月执勤 Excel</span>
        </button>
    );
}

export default DownloadExcel;
