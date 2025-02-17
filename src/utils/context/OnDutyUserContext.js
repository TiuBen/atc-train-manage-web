import React, { createContext, useState, useEffect } from "react";
import { SERVER_URL, FETCHER } from "@utils";
import dayjs from "dayjs";
import useSWR from "swr";

const OnDutyUserContext = createContext();
// 定义一个延迟函数
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const OnDutyUserContextProvider = ({ children }) => {
    const [onDutyUser, setOnDutyUser] = useState([]); // ! 必须默认是【】
    const [authStatus, setAuthStatus] = useState({
        canAuth: false,
        // isVerifying: false,
        verifyResult: false,
        verifyResultMsg: "",
        tryTimes: 0,
    });

    function groupDutiesByPositionAndType(position, dutyType) {
        console.log("groupDutiesByPositionAndType");
        const _temp = onDutyUser.filter((item) => item.position === position && item.dutyType === dutyType);

        console.log(_temp);
        return _temp;
    }

    function purePostToServerUserGetIn(props) {
        console.log("purePostToServerUserGetIn");

        fetch(`${SERVER_URL}/duty`, {
            method: "POST", // 或者 "PUT"，根据你的需求
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(props),
        })
            .then((response) => response.json())
            .then((dutyData) => {
                console.log("Duty request successful:", dutyData);
                // 处理 duty 请求成功的逻辑
                if (dutyData?.id) {
                    // 有这个ID代表创建成功
                    setAuthStatus({
                        verifyResult: "SUCCESS",
                    });
                } else {
                    setAuthStatus((prev) => {
                        return {
                            verifyResult: "FAIL",
                            verifyResultMsg: "验证失败",
                        };
                    });
                }
            })
            .catch((error) => {
                console.error("Duty request error:", error);
                // 处理 duty 请求失败的逻辑
                setAuthStatus({
                    verifyResult: "FAIL",
                    verifyResultMsg: "验证失败",
                });
            });
    }

    async function postFaceImageToServerUserGetIn(props) {
        console.log("postFaceImageToServerUserGetIn");
        if (!props) {
            return;
        }
        setAuthStatus({
            verifyResult: "VERIFYING",
        });

        try {
            // 暂停 1 秒
            await delay(1000);

            // 执行 fetch
            const response = await fetch(`${SERVER_URL}/auth/face/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(props),
            });

            const result = await response.json();

            if (result?.body?.data?.confidence >= 75) {
                console.log("验证成功");
                purePostToServerUserGetIn(props);
            } else {
                setAuthStatus((prev) => ({
                    ...prev,
                    tryTimes: prev.tryTimes + 1,
                    verifyResult: "FAIL",
                    verifyResultMsg: "人脸可信度不够,验证失败",
                }));
                setTimeout(() => {
                    setAuthStatus((prev) => ({
                        ...prev,
                        canAuth: true,
                    }));
                }, 500);
            }
        } catch (error) {
            console.log("Error:", error);

            setAuthStatus((prev) => ({
                ...prev,
                tryTimes: prev.tryTimes + 1,
                verifyResult: "FAIL",
                verifyResultMsg: "FACE服务器错误,验证失败",
            }));

            setTimeout(() => {
                setAuthStatus((prev) => ({
                    ...prev,
                    canAuth: true,
                }));
            }, 500);
        }
    }

    function putToServerUserGetOut(props) {
        console.log("putToServerUserGetOut");
        console.log(props);
    }

    // ! 旧方法 需要前端的 员工席位 不方便

    useEffect(() => {
        // let todayQ = new URLSearchParams();
        // todayQ.append("startDate", dayjs().format("YYYY-MM-DD"));
        // todayQ.append("startTime", "00:00:00");
        // todayQ.append("endDate", dayjs().add(1, "day").format("YYYY-MM-DD"));
        // todayQ.append("endTime", "00:00:01");
        // fetch(`${SERVER_URL}/query/statics?${todayQ}`, {
        fetch(`${SERVER_URL}/query/now`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("今天正在值班的人员");
                console.log(result);
                const outTimeNullUser = result.filter((item) => item.outTime === null);
                setOnDutyUser(outTimeNullUser);
                console.log(outTimeNullUser);
            });
    }, []);

    return (
        <OnDutyUserContext.Provider
            value={{
                onDutyUser,
                setOnDutyUser,
                groupDutiesByPositionAndType,
                postFaceImageToServerUserGetIn,
                authStatus,
                setAuthStatus,
                putToServerUserGetOut,
            }}
        >
            {children}
        </OnDutyUserContext.Provider>
    );
};

export { OnDutyUserContext, OnDutyUserContextProvider };
