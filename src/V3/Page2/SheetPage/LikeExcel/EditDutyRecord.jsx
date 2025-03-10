import { Button, Flex, Checkbox, CheckboxGroup, Text, TextField, Radio, RadioGroup } from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import { usePage, SERVER_URL, FETCHER } from "@utils";
import useSWR from "swr";
import { API_URL } from "../../../../utils/const/Const.js";
import { Theme } from "@radix-ui/themes";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";

const initDutyRecord = {
    id: 3499,
    username: "张文中",
    position: "东塔台",
    dutyType: "主班",
    inTime: "2025-03-01 19:00:32",
    outTime: "2025-03-01 21:04:49",
    roleType: null,
    relatedDutyTableRowId: null,
    roleStartTime: null,
    roleEndTime: null,
    roleTimes: null,
    status: null,
    relatedPrepareTableId: null,
    dayShift: 2.07,
    nightShift: 0,
};

function EditDutyRecord() {
    const { payload, setPayload } = usePage();
    // const { editSheetDisplay } = payload;
    const { data: positions, error, isLoading } = useSWR(API_URL.query_positions, FETCHER);

    // const { data: selectedDutyRow } = useSWR(API_URL.query_id + payload?.editSheetRowId, FETCHER);
    const { data: roles } = useSWR(API_URL.query_roles, FETCHER);

    // const [record, setRecord] = useState(selectedDutyRow[0]);

    const [selectedDutyRow, setSelectedDutyRow] = useState({});

    useEffect(() => {
        fetch(API_URL.query_id + payload?.editSheetRowId)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setSelectedDutyRow(data[0]);
            })
            .catch(() => {
                console.log("error");
            });
    }, [payload]);

    return (
        <Theme accentColor="indigo">
            <div className="m-auto  text-nowrap flex flex-col gap-2 py-2" onChange={() => {}}>
                <div className="grid gap-2   text-nowrap ">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Text size="3" weight="bold" htmlFor="name" className=" text-justify">
                            数据库 ID
                        </Text>
                        <TextField.Root
                            placeholder={selectedDutyRow?.id}
                            readOnly={true}
                            className="col-span-3"
                        ></TextField.Root>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Text size="3" weight="bold" htmlFor="name" className=" text-justify">
                            姓名
                        </Text>
                        <TextField.Root
                            placeholder={selectedDutyRow?.username}
                            readOnly={true}
                            className="col-span-3"
                        ></TextField.Root>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Text size="3" weight="bold" htmlFor="name" className=" text-justify self-start">
                            席位
                        </Text>
                        {
                            <RadioGroup.Root
                                id="username"
                                value={selectedDutyRow?.position}
                                className="col-span-3 flex flex-row gap-2 flex-wrap"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                                onValueChange={(e) => {
                                    setSelectedDutyRow((prev) => {
                                        
                                        return {
                                            ...prev,
                                            position: e,
                                        };
                                    });
                                }}
                            >
                                {positions?.map((item) => (
                                    <Text
                                        as="label"
                                        size="2"
                                        key={item.id}
                                        value={item.position}
                                        className="max-w-[100px]"
                                        
                                    >
                                        <Flex gap="2">
                                            <RadioGroup.Item
                                                size="2"
                                                key={item.id}
                                                value={item.position}
                                             
                                            />
                                            {item.position}
                                        </Flex>
                                    </Text>
                                ))}
                            </RadioGroup.Root>
                        }
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="username" className="text-justify  self-start">
                            角色
                        </label>
                        {
                            <RadioGroup.Root
                                id="username"
                                value={selectedDutyRow?.dutyType}
                                className="col-span-3 flex flex-row gap-2 flex-wrap"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                {roles?.map((item, index) => (
                                    <Text
                                        as="label"
                                        size="2"
                                        key={index}
                                        value={item.dutyType}
                                        className="max-w-[100px]"
                                    >
                                        <Flex gap="2">
                                            <RadioGroup.Item size="2" value={item} />
                                            {item}
                                        </Flex>
                                    </Text>
                                ))}
                            </RadioGroup.Root>
                        }
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 ">
                    <label className="text-justify  self-center font-semibold">开始时间</label>
                    <div className="flex flex-col col-span-3">
                        <Text
                            as="label"
                            size="2"
                            style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" }}
                        >
                            日期
                            <input
                                className="border rounded-sm p-1 text-base"
                                type="date"
                                value={dayjs(selectedDutyRow.inTime, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")}
                            />
                        </Text>
                        <Text
                            as="label"
                            size="2"
                            style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" }}
                        >
                            时刻
                            <input
                                className="border rounded-sm p-1 text-base"
                                type="time"
                                step="1"
                                value={dayjs(selectedDutyRow.inTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss")}
                            />
                        </Text>
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-justify  self-center  font-semibold">结束时间</label>
                    <div className="flex flex-col col-span-3">
                        <Text
                            as="label"
                            size="2"
                            style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" }}
                        >
                            日期
                            <input
                                className="border rounded-sm p-1 text-base"
                                type="date"
                                value={dayjs(selectedDutyRow.outTime, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")}
                            />
                        </Text>
                        <Text
                            as="label"
                            size="2"
                            style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" }}
                        >
                            时刻
                            <input
                                className="border rounded-sm p-1 text-base"
                                type="time"
                                step="1"
                                value={dayjs(selectedDutyRow.outTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss")}
                            />
                        </Text>
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="username" className="text-justify  self-start font-semibold">
                        关联数据
                    </label>
                    <div className="flex flex-col col-span-3">
                        {JSON.stringify(selectedDutyRow.relatedDutyTableRowId)}
                    </div>
                </div>
                <Button className="border  border-red-600">保存修改</Button>
                <Button color="red" className="border  border-red-600">
                    删除此条目
                </Button>
            </div>
        </Theme>
    );
}

export default EditDutyRecord;
