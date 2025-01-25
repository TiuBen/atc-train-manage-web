import React from "react";
import useSWR from "swr";
import { SERVER_URL, FETCHER } from "@utils";
function RadioButtonUserList() {
    const { data: userList, error, isLoading } = useSWR(`${SERVER_URL}/query/orderedusername`, FETCHER);

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    return (
        <div className="flex flex-row flex-wrap text-nowrap flex-1  content-start ">
            {userList.map((row, index) => {
                return (
                    <>
                        {row.map((username, i) => {
                            return (
                                <label
                                    key={(i + 1) * (index + 1)}
                                    className="border border-1 border-green-500  rounded-md   px-2 py-1 text-sm   text-center"
                                >
                                    <input type="radio" />
                                    {username}
                                </label>
                            );
                        })}
                    </>
                );
            })}
        </div>
    );
}

export default RadioButtonUserList;
