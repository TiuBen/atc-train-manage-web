import React, { useContext, useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { useDialog, useOnDutyUser, SERVER_URL, FETCHER } from "@utils";
import useSWR, { useSWRConfig } from "swr";
import { X } from "lucide-react";

function UserListDialog() {
    const { dialogPayload, setDialogPayload } = useDialog();
    const { mutate } = useSWRConfig();

    // const { onDutyUser, postToServerUserGetIn } = useOnDutyUser();

    const { data: allUsers = [] } = useSWR(
        `${SERVER_URL}/users?fields=${encodeURIComponent("id,username,team")}&groupBy=team`,
        FETCHER
    );
    const { data: onDutyUsers = [] } = useSWR(
        `${SERVER_URL}/duty?fields=${encodeURIComponent("id,username")}&outTime=null`,
        FETCHER
    );

    // if (error) return <div>failed to load UserListDialog</div>;
    // if (isLoading) return <div>loading...UserListDialog</div>;

    return (
        <Dialog.Root
            open={dialogPayload?.userListDialogDisplay}
            // open={false}
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
                {dialogPayload?.position + "" + dialogPayload?.dutyType}
                <div className="flex flex-col flex-wrap gap-2">
                    {allUsers.map((uRow, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex flex-row flex-1 flex-wrap gap-2  ${
                                    index !== 0 ? "border-t-2 pt-2" : ""
                                }`}
                            >
                                {uRow.map((x, key) => {
                                    return (
                                        <Button
                                            color="cyan"
                                            variant="soft"
                                            disabled={onDutyUsers.some((item) => item.username === x.username)}
                                            onClick={async () => {
                                                await fetch(SERVER_URL + "/duty", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        id: x.id,
                                                        username: x.username,
                                                        position: dialogPayload?.position,
                                                        dutyType: dialogPayload?.dutyType,
                                                    }),
                                                })
                                                    .then((res) => res.json())
                                                    .then((data) => {
                                                        if (data.error) {
                                                            window.alert(data.error);
                                                        } else {
                                                            setDialogPayload((prev) => {
                                                                return {
                                                                    userListDialogDisplay: false,
                                                                };
                                                            });
                                                        }
                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                    });

                                                mutate(`${SERVER_URL}/duty?position=${dialogPayload.position}&dutyType=${dialogPayload.dutyType}&outTime=null`);
                                            }}
                                            key={key}
                                            style={{ width: "5rem" }}
                                        >
                                            {x.username}
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
