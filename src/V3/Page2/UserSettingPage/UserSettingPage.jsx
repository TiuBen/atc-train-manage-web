import { Button, Flex, Checkbox, CheckboxGroup, Text, TextField, Radio, RadioGroup } from "@radix-ui/themes";
import React from "react";
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
import { API_URL } from "../../../utils/const/Const";
import useSWR from "swr";
import { usePage, SERVER_URL, FETCHER } from "@utils";

function UserSettingPage() {
    const { data: roles } = useSWR(API_URL.query_roles, FETCHER);
    const { data: positions, error, isLoading } = useSWR(API_URL.query_positions, FETCHER);

    console.log(positions);

    return (
        <div className="outline flex-1 items-center content-start p-4">
            功能待完善
            <form className="border flex flex-col gap-2">
                <div>
                    <label htmlFor="">席位权限</label>

                    <CheckboxGroup.Root
                        defaultValue="1"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "2px",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            alignContent: "flex-start",
                            width: "100%",
                            height: "100%",
                            padding: "0px",
                        }}
                    >
                        {positions?.map((position, index) => {
                            return (
                                <Text as="label" key={index} size="2">
                                    <Flex gap="2">
                                        <CheckboxGroup.Item value="1" />
                                        {position.position}
                                    </Flex>
                                </Text>
                            );
                        })}
                    </CheckboxGroup.Root>
                </div>
                <div>
                    <label htmlFor="">岗位权限</label>

                    <CheckboxGroup.Root
                        defaultValue="1"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "2px",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            alignContent: "flex-start",
                            width: "100%",
                            height: "100%",
                            padding: "0px",
                        }}
                    >
                        {roles?.map((item, index) => {
                            return (
                                <Text as="label" key={index} size="2">
                                    <Flex gap="2">
                                        <CheckboxGroup.Item value={item} />
                                        {item}
                                    </Flex>
                                </Text>
                            );
                        })}
                    </CheckboxGroup.Root>
                </div>
                <div className="flex flex-1 flex-row gap-2">
                    <div className="w-[180px] h-[240px] border rounded-md">
                        <img src="" alt="系统人脸识别对比照" />
                    </div>
                    <div className="w-[180px] h-[240px] border rounded-md">新照片</div>
                    <Button className="flex-0 max-w-fit self-end">修改已存照片</Button>
                </div>
            </form>
        </div>
    );
}

export default UserSettingPage;
