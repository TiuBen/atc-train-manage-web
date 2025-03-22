import { Button, Flex, Checkbox, CheckboxGroup, Text, TextField, Radio, RadioGroup } from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../../../utils/const/Const";
import useSWR, { mutate } from "swr";
import { usePage, SERVER_URL, FETCHER } from "@utils";

function TeamSettingPage() {
    const { data: users } = useSWR(API_URL.users, FETCHER);

    return (
        <div className=" flex-1 items-center content-start">
            <form className="flex flex-col gap-4">
                <fieldset className="border  rounded-md  p-2">
                    <legend className="text-lg font-bold">分类班组</legend>
                    <RadioGroup.Root
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
                        onValueChange={(value) => {
                        
                        }}
                    >
                        {users &&
                            users.map((item, i) => {
                                return (
                                    <RadioGroup.Item
                                        value={item.id}
                                        key={i}
                                        style={{ gap: "0.25rem" }}
                                        className=" hover:font-bold hover:text-blue-700"
                                
                                    >
                                        {item.username}
                                    </RadioGroup.Item>
                                );
                            })}
                    </RadioGroup.Root>
                </fieldset>
            </form>
        </div>
    );
}

export default TeamSettingPage;
