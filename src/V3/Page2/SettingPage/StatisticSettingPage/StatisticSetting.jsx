import { Button, Flex, Checkbox, CheckboxGroup, Text, TextField, Radio, RadioGroup } from "@radix-ui/themes";
import React, { useState } from "react";
import { API_URL } from "../../../../utils/const/Const";
import useSWR, { mutate } from "swr";
import { usePage, SERVER_URL, FETCHER } from "@utils";
import { PencilLine, Trash2, SquarePlus, Check } from "lucide-react";

function StatisticSetting() {
    const [calConfig, setCalConfig] = useState([
        {
            name: "test",
            func: [
                {
                    position: ["带班主任", "领班"],
                    dutyType: [null],
                    roleType: [null],
                    relatedDutyTableRowId: [null, "NOT NULL"],
                },
            ],
        },
    ]);

    return (
        <div>
            StatisticSetting
            {calConfig &&
                calConfig.map((item, index) => {
                    return (
                        <div key={index} className="border rounded ">
                            <div>序号：{index + 1} </div>
                            <div>
                                {" "}
                                名称：
                                <input type="text" value={item?.name} />{" "}
                            </div>
                            <div>
                                {" "}
                                可选数据
                                {item?.func?.map((func, funcIndex) => {})}
                            </div>
                            <div>计算公式描述</div>
                        </div>
                    );
                })}
            <button
                onClick={() => {
                    setCalConfig([...calConfig, {}]);
                }}
            >
                新增
            </button>
        </div>
    );
}

export default StatisticSetting;
