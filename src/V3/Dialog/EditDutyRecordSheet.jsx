import { Button, Flex, Checkbox, CheckboxGroup, Text } from "@radix-ui/themes";
import React from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { usePage, SERVER_URL, FETCHER } from "@utils";
import useSWR from "swr";
import { API_URL } from "../../utils/const/Const";

function EditDutyRecordSheet() {
    const { payload,setPayload } = usePage();
    const { editSheetDisplay } = payload;
    const { data: positions, error, isLoading } = useSWR(API_URL.query_positions, FETCHER);
    const { data: roles } = useSWR(API_URL.query_roles, FETCHER);

    return (
        <Sheet open={editSheetDisplay} onOpenChange={() => {
            setPayload((prev) => {
                return { ...prev, editSheetDisplay: false };
            }); 

        }}>
            {/* <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
            </SheetTrigger> */}
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>修改执勤记录</SheetTitle>
                    <SheetDescription>
                        此功能仅能修改执勤记录,如果此条目具备教员资格,请先检查或修改学员记录。
                    </SheetDescription>
                </SheetHeader>
              
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default EditDutyRecordSheet;
