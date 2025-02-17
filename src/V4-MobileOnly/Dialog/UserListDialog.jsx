import React, { useContext, useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { useDialog, useOnDutyUser, SERVER_URL, FETCHER } from "@utils";
import useSWR from "swr";
import { X } from "lucide-react";

function UserListDialog() {
    const { dialogPayload, setDialogPayload } = useDialog();

    const { onDutyUser, postToServerUserGetIn } = useOnDutyUser();

    const { data: orderedusername, error, isLoading } = useSWR(`${SERVER_URL}/query/orderedusername`, FETCHER);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    return (
        <Dialog.Root
            open={dialogPayload?.userListDialogDisplay}
            onOpenChange={() => setDialogPayload({ userListDialogDisplay: false })}
        >
            <Dialog.Content
                maxWidth="1000px"
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
                <Dialog.Title className="flex flex-row justify-between text-wrap">
                    <div>{dialogPayload.dialogTitle}</div>
                    <Button color="red" onClick={() => setDialogPayload({ userListDialogDisplay: false })}>
                        <X />
                    </Button>
                </Dialog.Title>
                <Dialog.Description className="text-l">点击姓名</Dialog.Description>
                <div className="flex flex-col flex-wrap gap-2">
                    {orderedusername.map((uRow, index) => {
                        return (
                            <div key={index} className="flex flex-row flex-1 flex-wrap gap-2 border-b-2 pb-1">
                                {uRow.map((x, key) => {
                                    return (
                                        <Button
                                            color="cyan"
                                            variant="soft"
                                            disabled={onDutyUser.some((item) => item.username === x)}
                                            onClick={() => {
                                                setDialogPayload((prev) => {
                                                    return {
                                                        ...prev,
                                                        userListDialogDisplay: true,
                                                        faceDialogDisplay: true,
                                                        username:x
                                                    };
                                                });
                                            }}
                                            key={key}
                                            style={{ width: "5rem" }}
                                        >
                                            {x}
                                        </Button>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default UserListDialog;

// fetch(server + "/duty", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//         username: x,
//         position: selectedPosition,
//         dutyType: selectedDutyType,
//     }),
// })
//     .then((res) => res.json())
//     .then((data) => {
//         setOpenUserListDialog(false);
//     })
//     .then(() => {
//         window.location.reload();
//     });
