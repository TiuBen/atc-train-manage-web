import React, { useState, useEffect } from "react";
import { TabNav, Tabs } from "@radix-ui/themes";
import UserSettingPage from "./UserSettingPage/UserSettingPage";
import PositionSetting from "./PositionSettingPage/PositionSetting";

function SettingPage() {
    // 根据当前路径匹配路由

    const [first, setfirst] = useState(2);
    useEffect(() => {
        console.log(`Type changed to: ${first}`);
    }, [first]);
    const renderComponent = () => {
        switch (first) {
            case 1:
                return <UserSettingPage />;
                case 2:
                    return <PositionSetting />;
    
            default:
                return <div>Unknown Type</div>;
        }
    };

    return (
        <div>
            <TabNav.Root>
                <TabNav.Link
                    href="/admin/setting/1"
                    active={first === 1}
                    onClick={(e) => {
                        setfirst(1);
                        e.preventDefault();
                    }}
                >
                    <label className="text-2xl font-bold">用户管理</label>
                </TabNav.Link>
                <TabNav.Link
                    href="/admin/setting/2"
                    active={first === 2}

                    onClick={(e) => {
                        setfirst(2);
                        e.preventDefault();
                    }}
                >
                     <label className="text-2xl font-bold">席位管理</label>
                </TabNav.Link>
            </TabNav.Root>
            <div className=" p-4">{renderComponent()}</div>
        </div>
    );
}

export default SettingPage;
