import { Button,Flex,Checkbox,CheckboxGroup } from "@radix-ui/themes";
import React from "react";

function UserSettingPage() {
    return (
        <div className="outline flex-1 items-center content-center p-4">
            功能待完善
            <form className="border">
                <div>
                    <label htmlFor="">岗位权限</label>

                    <Flex align="center" gap="2">
                        
                        <CheckboxGroup.Root size="1" defaultValue="1">
                            <CheckboxGroup.Item value="1" />
                        </CheckboxGroup.Root>

                      

                     
                    </Flex>
                </div>
                <div className="flex flex-1 flex-col">
                    <img src="" alt="系统人脸识别对比照" />
                    <Button className="flex-0 max-w-fit self-end">修改已存照片</Button>
                </div>
            </form>
        </div>
    );
}

export default UserSettingPage;
