import React, { useState } from "react";
import useSWR from "swr";
import { SERVER_URL, FETCHER, usePage } from "@utils";
// function RadioButtonUserList({ queryName, onClick }) {
function RadioButtonUserList() {
    const { data: userList, error, isLoading } = useSWR(`${SERVER_URL}/query/orderedusername`, FETCHER);
    const [selectedUserName, setSelectedUserName] = useState("");
    const { payload, setPayload } = usePage();

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    return (
        <div className="flex flex-row flex-wrap text-nowrap flex-1  content-start gap-1 m-2">
            {userList.flat().map((username, i) => {
                return (
                    <label
                        key={i}
                        className="border border-1 border-slate-500  rounded-md  flex flex-row gap-1  px-2 py-1    text-center"
                    >
                        <input
                            type="radio"
                            value={username}
                            checked={username === selectedUserName}
                            onChange={(e) => {
                                setSelectedUserName(e.target.value);
                                setPayload({ queryName: e.target.value });
                            }}
                        />
                        {username}
                    </label>
                );
            })}
        </div>
    );
}

export default RadioButtonUserList;
