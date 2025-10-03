import React, { useState } from "react";
import useStore from "../../utils/store/userStore";

// function RadioButtonUserList({ queryName, onClick }) {
function RadioButtonUserList() {
    const { users, selectedUser } = useStore();

    return (
        <aside className="grid grid-cols-2 w-[13rem] overflow-auto min-h-0  content-start gap-1 p-2 ">
            {users.map((item, i) => {
                return (
                    <label
                        key={i}
                        className="border border-1 border-slate-500 text-nowrap  rounded-md  flex flex-row gap-1  px-2 py-1    text-center"
                    >
                        <input
                            type="radio"
                            value={item.username}
                            checked={item === selectedUser}
                            onChange={(e) => {
                                useStore.setState({ selectedUser: item });
                            }}
                        />
                        {item.username}
                    </label>
                );
            })}
        </aside>
    );
}

export default RadioButtonUserList;
