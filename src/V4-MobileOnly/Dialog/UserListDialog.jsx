import React, { useContext, useEffect, useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { useDialog, useOnDutyUser, SERVER_URL, FETCHER } from "@utils";
import useSWR, { useSWRConfig } from "swr";
import { X } from "lucide-react";

function UserListDialog({ allDetailUsers = [] }) {
    const { dialogPayload, setDialogPayload } = useDialog();
    const { mutate } = useSWRConfig();
    const [availableStaffs, setAvailableStaffs] = useState([]);

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

    // 在这部分直接监听 dialogPayload 中的席位 然后来判断能不能 点击

    useEffect(() => {
        console.log("出现");

        const _availableStaffs = [];

        allDetailUsers.forEach((user) => {
            // console.log("dd");

            const uP = user.position || [];
            console.log(uP);

            // const found = uP.find(
            //     (x) => x.position === dialogPayload.position && x.dutyType.includes(dialogPayload.dutyType)
            // );

            uP.forEach((x) => {
                console.log(x.position + "  " + x.dutyType);
                console.log(x.position === dialogPayload.position);
                if (x.position === dialogPayload.position) {
                    if (x.dutyType === null) {
                        console.log("null:" + x.dutyType === dialogPayload.dutyType);
                        if (x.dutyType === dialogPayload.dutyType) {
                            _availableStaffs.push(user.username);
                        }
                    } else {
                        console.log(x.dutyType.includes(dialogPayload.dutyType));
                        if (x.dutyType.includes(dialogPayload.dutyType)) {
                            _availableStaffs.push(user.username);
                        }
                    }
                }

                // if (x.position === dialogPayload.position && x.dutyType.includes(dialogPayload.dutyType)) {
                //     _availableStaffs.push(user.username);
                //     console.log("zhaodao");
                // }
            });

            // console.log("found: " + found);

            // if (found) {
            //     console.log("找到");
            //     _availableStaffs.push(user);
            // }
        });

        setAvailableStaffs(_availableStaffs);
    }, [dialogPayload.position, dialogPayload.dutyType, allDetailUsers]);

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
                    <>{JSON.stringify(dialogPayload)}</>
                    <br />
                    <>{JSON.stringify(availableStaffs)}</>
                    <div>{dialogPayload.dialogTitle}</div>
                    <Button color="red" onClick={() => setDialogPayload({ userListDialogDisplay: false })}>
                        <X />
                    </Button>
                </Dialog.Title>
                <Dialog.Description className="text-l">点击姓名d</Dialog.Description>
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

                                                mutate(
                                                    `${SERVER_URL}/duty?position=${dialogPayload.position}&dutyType=${dialogPayload.dutyType}&outTime=null`
                                                );
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
