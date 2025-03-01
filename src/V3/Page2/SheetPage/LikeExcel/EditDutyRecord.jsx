import { Button, Flex, Checkbox, CheckboxGroup, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { usePage, SERVER_URL, FETCHER } from "@utils";
import useSWR from "swr";
import { API_URL } from "../../../../utils/const/Const.js";
import { Theme } from "@radix-ui/themes";
import { Input } from "@/components/ui/input"

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
    // const { payload, setPayload } = usePage();
    // const { editSheetDisplay } = payload;
    const { data: positions, error, isLoading } = useSWR(API_URL.query_positions, FETCHER);
    const { data: roles } = useSWR(API_URL.query_roles, FETCHER);

    const [record, setRecord] = useState(initDutyRecord);

    return (
        <Theme accentColor="indigo">
            <div className="w-[300px] border border-green-600 text-nowrap flex flex-col gap-2" onChange={() => {}}>
                <div className="grid gap-4 py-4 border text-nowrap ">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Text size="3" weight="bold" htmlFor="name" className=" text-justify">
                            数据库 ID
                        </Text>
                        <TextField.Root
                            placeholder={initDutyRecord.id}
                            readOnly={true}
                            className="col-span-3"
                        ></TextField.Root>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Text size="3" weight="bold" htmlFor="name" className=" text-justify">
                            姓名
                        </Text>
                        <TextField.Root
                            placeholder={initDutyRecord.username}
                            readOnly={true}
                            className="col-span-3"
                        ></TextField.Root>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Text size="3" weight="bold" htmlFor="name" className=" text-justify self-start">
                            席位
                        </Text>
                        {
                            <div id="username" value="@peduarte" className="col-span-3 flex flex-row gap-2 flex-wrap">
                                {positions?.map((item) => (
                                    <Text as="label" size="2" key={item.id}>
                                        <Flex gap="1" className="flex justify-center items-center">
                                            <Checkbox
                                                value={item.position}
                                                checked={item.position === record.position}
                                                onChange={(e) => {
                                                    setRecord({ ...record, position: e.target.value });
                                                }}
                                            />{" "}
                                            {item.position}
                                        </Flex>
                                    </Text>
                                ))}
                            </div>
                        }
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="username" className="text-justify  self-start">
                            角色
                        </label>
                        {
                            <div id="username" value="@peduarte" className="col-span-3 flex flex-row gap-2 flex-wrap">
                                {roles?.map((item, index) => (
                                    <label
                                        key={index}
                                        className="flex flex-row flex-nowrap gap-1 justify-center items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            value={item}
                                            checked={item === record.dutyType}
                                            onChange={(e) => {
                                                setRecord({ ...record, dutyType: e.target.value });
                                            }}
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        }
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="username" className="text-justify  self-start">
                        开始时间
                    </label>
                    <input id="username" value="2020-11-03 34：23：22" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="username" className="text-justify  self-start">
                        结束时间
                    </label>
                    <input id="username" value="2020-11-03 34：23：22" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="username" className="text-justify  self-start">
                        关联数据
                    </label>
                    <input id="username" value="" className="col-span-3" />
                </div>
                <Input type="time" step="1" />

            </div>
        </Theme>
    );
}

export default EditDutyRecord;
