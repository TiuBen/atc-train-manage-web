import { Button, Flex, Checkbox, CheckboxGroup, Text, TextField, Radio, RadioGroup } from "@radix-ui/themes";
import React, { useState } from "react";
import { API_URL } from "../../../../utils/const/Const";
import useSWR, { mutate } from "swr";
import { usePage, SERVER_URL, FETCHER } from "@utils";
import { PencilLine, Trash2, SquarePlus, Check } from "lucide-react";

function PositionSetting() {
    const { data: positions } = useSWR(API_URL.query_positions, FETCHER);
    const { payload, setPayload } = usePage();

    const [editRow, setEditRow] = useState(null);
    const [editedData, setEditedData] = useState({});

    const handleEdit = (position) => {
        setEditRow(position.id);
        setEditedData({ ...position });
    };

    const handleSave = (id) => {
        // 在这里处理保存逻辑，例如更新状态或发送API请求
        console.log("Saving data for position:", id, editedData);
        setEditRow(null);
        fetch(`${SERVER_URL}/positions/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data updated successfully:", data);
                setEditRow(null);
                setEditedData({});
            })
            .then(() => {
                mutate(API_URL.query_positions);
            });
    };

    const handleChange = (e, field) => {
        console.log("Editing data for field:", field, e.target.value);
        setEditedData((prev) => {
            return {
                ...prev,
                [field]: e.target.value,
            };
        });
    };

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-gray-300">部分席位名称被历史执勤数据使用，无法删除</h1>
            <table className="border-collapse border rounded-lg border-gray-400 table-auto ">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-2 py-1">序号</th>
                        <th className="border border-gray-300 px-2 py-1">席位名称</th>
                        <th className="border border-gray-300 px-2 py-1">主/副班</th>
                        <th className="border border-gray-300 px-2 py-1">是否显示</th>
                        <th className="border border-gray-300 px-2 py-1">编辑</th>
                    </tr>
                </thead>
                <tbody>
                    {positions?.map((position, index) => {
                        return (
                            <tr key={index} style={{ gap: "0.25rem" }}>
                                <td className="border border-gray-300 px-2 py-1">{position.id}</td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {editRow === position.id ? (
                                        <input
                                            className="border-2 border-blue-600 rounded-lg px-2 py-1"
                                            type="text"
                                            value={editedData.name}
                                            onChange={(e) => handleChange(e, "name")}
                                        />
                                    ) : (
                                        position.name
                                    )}
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {editRow === position.id ? (
                                        <label
                                            htmlFor={`${position.id}description`}
                                            className="flex justify-items-center gap-1 text-blue-600 font-bold"
                                        >
                                            <input
                                                type="checkbox"
                                                id={`${position.id}description`}
                                                value={editedData.description}
                                                checked={editedData.description !== null}
                                                onChange={(e) => {
                                                    if (editedData.description === null) {
                                                        setEditedData((prev) => {
                                                            return {
                                                                ...prev,
                                                                "description": `主班,副班`,
                                                            };
                                                        });
                                                    } else {
                                                        setEditedData((prev) => {
                                                            return {
                                                                ...prev,
                                                                description: null,
                                                            };
                                                        });
                                                    }
                                                }}
                                            />
                                            配置主副班
                                        </label>
                                    ) : (
                                        position.description
                                    )}
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {editRow === position.id ? (
                                        <label
                                            htmlFor={`${position.id}display`}
                                            className="flex justify-items-center gap-1 text-blue-600 font-bold"
                                        >
                                            <input
                                                type="checkbox"
                                                id={`${position.id}display`}
                                                value={editedData.display}
                                                onChange={(e) => {
                                                    setEditedData((prev) => {
                                                        return {
                                                            ...prev,
                                                            display: prev.display === 1 ? 0 : 1,
                                                        };
                                                    });
                                                }}
                                                checked={editedData.display}
                                            />
                                            显示
                                        </label>
                                    ) : (
                                        <>{position.display === 1 ? "是" : "否"}</>
                                    )}
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {editRow === position.id ? (
                                        <Button onClick={() => handleSave(position.id)}>
                                            <Check />
                                        </Button>
                                    ) : (
                                        <Button color="gray" onClick={() => handleEdit(position)}>
                                            <PencilLine />
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-end">
                <Button color="green" onClick={() =>{
                    setEditedData({
                        name: "",
                        description: null,
                        display: 1,
                    });

                    set
                }}>
                    <SquarePlus />
                    新建
                </Button>
            </div>
            {JSON.stringify(editedData)}
        </div>
    );
}

export default PositionSetting;
