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

function UserSettingPage() {
    const { data: roles } = useSWR(API_URL.query_roles, FETCHER);
    const { data: positions } = useSWR(API_URL.query_positions, FETCHER);
    const { data: users } = useSWR(API_URL.query_users, FETCHER);
    const { data: userList, error, isLoading } = useSWR(`${SERVER_URL}/query/orderedusername`, FETCHER);
    const [selectedUserName, setSelectedUserName] = useState("");
    const { payload, setPayload } = usePage();

    console.log(positions);

    return (
        <div className=" flex-1 items-center content-start">
            {/* <h1 className="text-2xl font-bold">用户管理</h1> */}
            <form className="flex flex-col gap-4">
                <fieldset className="border  rounded-md  p-2">
                    <legend className="text-lg font-bold">选择用户</legend>
                    <RadioGroup.Root
                        defaultValue="1"
                        name="example"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "0.6rem",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            alignContent: "flex-start",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {userList &&
                            userList.flat().map((username, i) => {
                                return (
                                    <RadioGroup.Item value={username} key={i} style={{ gap: "0.25rem" }}>
                                        {username}
                                    </RadioGroup.Item>
                                );
                            })}
                    </RadioGroup.Root>
                </fieldset>
                <fieldset className="border  rounded-md  p-2">
                    <legend className="text-lg font-bold">席位权限</legend>
                    <CheckboxGroup.Root
                        defaultValue="1"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "0.6rem",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            alignContent: "flex-start",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {positions?.map((position, index) => {
                            return (
                                <CheckboxGroup.Item value={position.position} key={index} style={{ gap: "0.25rem" }}>
                                    {position.position}
                                </CheckboxGroup.Item>
                                // <Text as="label" key={index} size="2" >
                                //     <Flex gap="1">
                                //         <CheckboxGroup.Item value="1" />
                                //         {position.position}
                                //     </Flex>
                                // </Text>
                            );
                        })}
                    </CheckboxGroup.Root>
                </fieldset>
                <fieldset className="border  rounded-md p-2">
                    <legend className="text-lg font-bold">岗位权限</legend>
                    <CheckboxGroup.Root
                        defaultValue="1"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "0.6rem",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            alignContent: "flex-start",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {roles?.map((item, index) => {
                            return (
                                <CheckboxGroup.Item value={item} key={index} style={{ gap: "0.25rem" }}>
                                    {item}
                                </CheckboxGroup.Item>
                            );
                        })}
                    </CheckboxGroup.Root>
                </fieldset>
                <fieldset className="border  rounded-md p-2">
                    <legend className="text-lg font-bold">人脸识别照片</legend>
                    <div className="flex flex-1 flex-row gap-2">
                        <div className="w-[180px] h-[240px] border rounded-md">
                            <img src="" alt="系统人脸识别对比照" />
                        </div>
                        <div className="w-[180px] h-[240px] border rounded-md">新照片</div>
                        <Button className="flex-0 max-w-fit self-end">修改已存照片</Button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default UserSettingPage;
