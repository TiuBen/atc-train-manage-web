import React, { useContext, useEffect, useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { useDialog, useOnDutyUser, SERVER_URL, FETCHER } from "@utils";
import useSWR, { useSWRConfig } from "swr";
import { X } from "lucide-react";
import useStore from "../../utils/store/userStore";
import dayjs from "dayjs";
function UserListDialog() {
    const { dialogPayload, setDialogPayload } = useDialog();
    const { mutate } = useSWRConfig();
    const [availableStaffs, setAvailableStaffs] = useState([]);

    const {
        groupedUsers,
        detailUsers,
        onDutyUsers,
        selectedPosition,
        setSelectedPosition,
        selectedDutyRecord,
        setSelectedDutyRecord,
        fetchOnDutyUsers,
    } = useStore();

    // if (error) return <div>failed to load UserListDialog</div>;
    // if (isLoading) return <div>loading...UserListDialog</div>;

    // ! 在这部分直接监听 dialogPayload 中的席位 然后来判断能不能 点击
    useEffect(() => {
        console.log("出现");
        const _availableStaffs = [];
        let position, dutyType, roleType;
        if (selectedPosition) {
            position = selectedPosition?.position;
            dutyType = selectedPosition?.dutyType;
            roleType = selectedPosition?.roleType;
        }
        if (selectedDutyRecord) {
            position = selectedDutyRecord?.position;
            dutyType = selectedDutyRecord?.dutyType;
            roleType = selectedDutyRecord?.roleType;
        }

        detailUsers.forEach((user) => {
            const uPositions = user.position || [];
            uPositions.forEach((x) => {
                // 要 position dutyType roleType 都匹配
                if (x?.position === position) {
                    //! 职位匹配
                    if (roleType === "见习") {
                        //! 要撒选出来 学员
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
                            if (x.dutyType === dutyType) {
                                _availableStaffs.push(user.username);
                            }
                        } else {
                            if (x.dutyType.includes(dutyType)) {
                                _availableStaffs.push(user.username);
                            }
                        }
                    }
                }
            });
        });

        setAvailableStaffs(_availableStaffs);
    }, [selectedPosition, detailUsers, selectedDutyRecord]);

    return (
        <Dialog.Root
            open={dialogPayload?.userListDialogDisplay}
            // open={false}
            onOpenChange={() => {
                setDialogPayload({ userListDialogDisplay: false });
                setSelectedPosition(null);
                setSelectedDutyRecord(null);
            }}
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
                    <Button
                        color="red"
                        onClick={() => {
                            setDialogPayload({ userListDialogDisplay: false });
                            setSelectedPosition(null);
                            setSelectedDutyRecord(null);
                        }}
                    >
                        <X />
                    </Button>
                </Dialog.Title>
                <Dialog.Description className="text-center border pr-[40px] font-bold text-blue-500">
                    {/* {`席位:${selected?.Position&&selected?.Position} ${dutyType ? `(${dutyType})` : ""}${roleType ? `(${roleType})` : ""}`} */}
                    {`席位:${selectedPosition?.position || selectedDutyRecord?.position} ${
                        selectedPosition?.dutyType || selectedDutyRecord?.dutyType
                    }`}
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
                                                //* 这部分应对如下情况
                                                //* 按 seat上的接班 普通 2个 staff
                                                //* 长按 staff 上的头像 进行接班
                                                //*

                                                //* 按 seat上的接班 普通 2个 staff
                                                if (selectedPosition) {
                                                    let postToDutyTableData = {};
                                                    postToDutyTableData = {
                                                        userId: x.id,
                                                        username: x.username,
                                                        ...selectedPosition,
                                                    };

                                                    fetch(SERVER_URL + "/duty", {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify(postToDutyTableData),
                                                    })
                                                        .then((res) => res.json())
                                                        .then((data) => {
                                                            console.log(data);
                                                            setDialogPayload({
                                                                userListDialogDisplay: false,
                                                            });
                                                            setSelectedPosition(null);
                                                            fetchOnDutyUsers();
                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                        })
                                                        .finally(() => {});
                                                }

                                                //* 长按 staff 上的头像 进行接班
                                                if (selectedDutyRecord) {
                                                    let postToDutyTableData = {
                                                        userId: x.id,
                                                        username: x.username,
                                                        position: selectedDutyRecord.position,
                                                        dutyType: selectedDutyRecord.dutyType,
                                                        roleType: "见习",
                                                        inTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                                                        roleStartTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                                                        relatedDutyTableRowId: selectedDutyRecord.id+";",
                                                    };

                                                    fetch(SERVER_URL + "/duty", {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify(postToDutyTableData),
                                                    })
                                                        .then((res) => res.json())
                                                        .then((data) => {
                                                            
                                                            console.log("//* 更新教员部分");
                                                            console.log(data);
                                                            //* 更新教员部分
                                                            let putToDutyTableData = {
                                                                roleType: "教员",
                                                                relatedDutyTableRowId:
                                                                    selectedDutyRecord.relatedDutyTableRowId
                                                                        ? selectedDutyRecord.relatedDutyTableRowId +
                                                                          data.lastID +
                                                                          ";"
                                                                        : data.lastID + ";",
                                                                roleStartTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                                                            };
                                                            fetch(SERVER_URL + "/duty/" + selectedDutyRecord.id, {
                                                                method: "PUT",
                                                                headers: {
                                                                    "Content-Type": "application/json",
                                                                },
                                                                body: JSON.stringify(putToDutyTableData),
                                                            })
                                                                .then((res) => res.json())
                                                                .then((data) => {
                                                                    console.log(data);
                                                                    setDialogPayload({
                                                                        userListDialogDisplay: false,
                                                                    });
                                                                    fetchOnDutyUsers();
                                                                    setSelectedDutyRecord(null);
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err);
                                                                });
                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                        })
                                                        .finally(() => {});
                                                }
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
