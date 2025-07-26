import React, { useContext, useState } from "react";
import { Avatar, Button, Dialog } from "@radix-ui/themes";
import { useDialog, useOnDutyUser, SERVER_URL, FETCHER } from "@utils";
import useSWR, { useSWRConfig } from "swr";
import { X } from "lucide-react";
import dayjs from "dayjs";
import useStore from "../../utils/store/userStore";

function ConfirmGetOutDialog() {
    const { dialogPayload, setDialogPayload } = useDialog();
    const { selectedPosition } = useStore();
    const { mutate } = useSWRConfig();
    return (
        <Dialog.Root
            open={dialogPayload?.confirmGetOutDialogDisplay}
            onOpenChange={() => setDialogPayload({ confirmGetOutDialogDisplay: false })}
        >
            <Dialog.Description></Dialog.Description>
            <Dialog.Content
                maxWidth="340px"
                className=" flex flex-col"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    zIndex: 1000,
                    gap: "10px",
                    textWrap: "nowrap",
                }}
            >
                <Dialog.Title className="flex flex-row justify-between text-wrap items-center">
                    {/* <div className="text-wrap text-sm">{JSON.stringify(dialogPayload)}</div> */}
                    <div>确认停止本席位值班 ?</div>
                    <Button color="red" onClick={() => setDialogPayload({ confirmGetOutDialogDisplay: false })}>
                        <X />
                    </Button>
                </Dialog.Title>
                <div className="flex flex-row gap-2 w-full items-center justify-evenly">
                    <img
                        size={"9"}
                        className=" h-[6rem]"
                        src={SERVER_URL + "/" + dialogPayload.username + ".jpg"}
                        alt={dialogPayload.username}
                    />
                    <Button
                        className="aspect-square"
                        size={"4"}
                        onClick={() => {
                            //!
                            const dutyRecord = { ...dialogPayload.dutyRecord };
                            setDialogPayload((prev) => {
                                return { ...prev, confirmGetOutDialogDisplay: false };
                            });
                            //!
                            //! 单独是见习的人退出
                            const _putData = {};
                            _putData.outTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
                            if (dutyRecord.roleType === "见习") {
                                _putData.roleEndTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
                            }
                            fetch(`${SERVER_URL}/duty/${dutyRecord.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(_putData),
                            })
                                .then((res) => res.json())
                                .then((data) => {
                                    console.log("yaoshuangx 1111111111" + selectedPosition);
                                    console.log(selectedPosition);
                                    mutate(
                                        `${SERVER_URL}/duty?position=${selectedPosition.position}${
                                            selectedPosition.dutyType ? `&dutyType=${selectedPosition.dutyType}` : ""
                                        }&outTime=null`
                                    );
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                                .finally(() => {
                                    // setDialogPayload(null);
                                });

                            if (dutyRecord.relatedDutyTableRowId !== null) {
                                console.log("relatedDutyTableRowId", dutyRecord);
                                console.log("relatedDutyTableRowId", dutyRecord.relatedDutyTableRowId);

                                const parts = dutyRecord.relatedDutyTableRowId.split(";").filter((part) => part !== ""); // 按 `;` 分割并过滤空字符串
                                const lastPart = parts[parts.length - 1]; // 取最后一段
                                console.log(parts);
                                console.log(lastPart);

                                const _putDataStudent = {};
                                _putDataStudent.outTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
                                _putDataStudent.roleEndTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
                                fetch(`${SERVER_URL}/duty/${lastPart}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(_putDataStudent),
                                })
                                    .then((res) => res.json())
                                    .then((data) => {
                                        console.log("yaoshuangx 22222222222");
                                        console.log(selectedPosition);

                                        mutate(
                                            `${SERVER_URL}/duty?position=${selectedPosition.position}${
                                                selectedPosition.dutyType
                                                    ? `&dutyType=${selectedPosition.dutyType}`
                                                    : ""
                                            }&outTime=null`
                                        );
                                    })

                                    .catch((err) => {
                                        console.log(err);
                                    })
                                    .finally(() => {
                                        // setDialogPayload(null);
                                    });
                            }

                            //!
                        }}
                    >
                        确定
                    </Button>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default ConfirmGetOutDialog;
