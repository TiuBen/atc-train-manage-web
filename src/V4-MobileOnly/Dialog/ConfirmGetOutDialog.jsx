import React, { useContext, useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { useDialog, useOnDutyUser, SERVER_URL, FETCHER } from "@utils";
import useSWR from "swr";
import { X } from "lucide-react";
import dayjs from "dayjs";

function ConfirmGetOutDialog() {
    const { dialogPayload, setDialogPayload } = useDialog();

    return (
        <Dialog.Root
            open={dialogPayload?.confirmGetOutDialogDisplay}
            onOpenChange={() => setDialogPayload({ confirmGetOutDialogDisplay: false })}
        >
            <Dialog.Content
                maxWidth="200px"
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
                    <div>退出?</div>
                    <Button color="red" onClick={() => setDialogPayload({ confirmGetOutDialogDisplay: false })}>
                        <X />
                    </Button>
                </Dialog.Title>
             
                <Button
                    size={"4"}
                    onClick={() => {
                        // setDialogPayload({confirmGetOutDialogDisplay:false});
                        fetch(`${SERVER_URL}/duty/${dialogPayload.id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json", 
                            },
                            body: JSON.stringify({
                                ...dialogPayload,
                                outTime:dayjs().format("YYYY-MM-DD HH:mm:ss"),
                            }),
                        });
                    }}
                >
                    确定
                </Button>
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default ConfirmGetOutDialog;
