import React, { useContext, useEffect, useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { useDialog, useOnDutyUser, SERVER_URL, FETCHER } from "@utils";
import useSWR, { useSWRConfig } from "swr";
import { X } from "lucide-react";
import useStore from "../../utils/store/userStore";

function UserListDialog() {
    const { dialogPayload, setDialogPayload } = useDialog();
    const { mutate } = useSWRConfig();
    const [availableStaffs, setAvailableStaffs] = useState([]);

    const { groupedUsers, detailUsers, onDutyUsers, selectedPosition } = useStore();

    // if (error) return <div>failed to load UserListDialog</div>;
    // if (isLoading) return <div>loading...UserListDialog</div>;

    // ! 在这部分直接监听 dialogPayload 中的席位 然后来判断能不能 点击
    useEffect(() => {
        console.log("出现");
        // console.log(detailUsers);
        // console.log(dialogPayload);
        const _availableStaffs = [];

        detailUsers.forEach((user) => {
            const uPositions = user.position || [];
            const { position, dutyType, roleType } = selectedPosition;
            uPositions.forEach((x) => {
                // console.log(x.position + "  " + x.dutyType);
                // console.log(x.position === dialogPayload.position);
                if (x.position === position) {
                    // console.log(user.username);
                    if (roleType === "见习") {
                        if (x.dutyType === null) {
                            // console.log("xxx null:" + x.dutyType === dutyType);
                            if (x.dutyType === dutyType && x.roleType === roleType) {
                                // console.log("push1");
                                _availableStaffs.push(user.username);
                            }
                        } else {
                            // console.log("ddddd：" + x.dutyType.includes(dutyType));
                            if (x.dutyType.includes(dutyType) && x.roleType === roleType) {
                                // console.log("push2");
                                _availableStaffs.push(user.username);
                            }
                        }
                    } else {
                        if (x.dutyType === null) {
                            // console.log("xxx null:" + x.dutyType === dutyType);
                            if (x.dutyType === dutyType) {
                                // console.log("push1");
                                _availableStaffs.push(user.username);
                            }
                        } else {
                            // console.log("ddddd：" + x.dutyType.includes(dutyType));
                            if (x.dutyType.includes(dutyType)) {
                                // console.log("push2");
                                _availableStaffs.push(user.username);
                            }
                        }
                    }
                }
            });
        });

        setAvailableStaffs(_availableStaffs);
    }, [selectedPosition, detailUsers]);

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
                <Dialog.Description className="text-center border pr-[40px] font-bold text-blue-500">
                    {"席位:" +
                        selectedPosition.position +
                        "(" +
                        selectedPosition?.dutyType +
                        ")" +
                        "(" +
                        selectedPosition?.roleType +
                        ")"}
                </Dialog.Description>
                <div className="flex flex-col flex-wrap gap-2">
                    {groupedUsers.map((uRow, index) => {
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
                                            disabled={
                                                onDutyUsers.some((item) => item.username === x.username) ||
                                                !availableStaffs.includes(x.username)
                                            }
                                            onClick={() => {
                                                fetch(SERVER_URL + "/duty", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        ...selectedPosition,
                                                        id: x.id,
                                                        username: x.username,
                                                    }),
                                                })
                                                    .then((res) => res.json())
                                                    .then((data) => {
                                                        if (data.error) {
                                                            window.alert(data.error);
                                                        } else {
                                                            setDialogPayload({
                                                                userListDialogDisplay: false,
                                                            });
                                                        }

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
                                                    });
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
