import { Button, Flex, Checkbox, CheckboxGroup, Text, TextField, Radio, RadioGroup } from "@radix-ui/themes";
import React, { useState } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { API_URL } from "../../../../utils/const/Const";
import useSWR from "swr";
import { usePage, SERVER_URL, FETCHER } from "@utils";
import { PencilLine, Trash2,SquarePlus } from "lucide-react";

function PositionSetting() {
    const { data: positions } = useSWR(API_URL.query_positions, FETCHER);
    const [selectedUserName, setSelectedUserName] = useState("");
    const { payload, setPayload } = usePage();

    console.log(positions);

    return (
        <div className="flex flex-col gap-2">
            <table className="border-collapse border rounded-lg border-gray-400 table-auto ">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-2 py-1">序号</th>
                        <th className="border border-gray-300 px-2 py-1">席位名称</th>
                        <th className="border border-gray-300 px-2 py-1">主/副班</th>
                        <th className="border border-gray-300 px-2 py-1">描述</th>
                        <th className="border border-gray-300 px-2 py-1">是否显示</th>
                        <th className="border border-gray-300 px-2 py-1">编辑</th>
                    </tr>
                </thead>
                <tbody>
                    {positions?.map((position, index) => {
                        return (
                            <tr key={index} style={{ gap: "0.25rem" }}>
                                <td className="border border-gray-300 px-2 py-1"> {position.id}</td>
                                <td className="border border-gray-300 px-2 py-1"> {position.name}</td>
                                <td className="border border-gray-300 px-2 py-1"> {position.description}</td>
                                <td className="border border-gray-300 px-2 py-1"> {position.description}</td>
                                <td className="border border-gray-300 px-2 py-1"> {position.display}</td>
                                <td className="border border-gray-300 px-2 py-1">
                                    <Button>
                                        <PencilLine />
                                    </Button>
                                </td>
                               
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-end">
                <Button color="green">
                    <SquarePlus />
                    新建
                </Button>
            </div>
        </div>
    );
}

export default PositionSetting;
