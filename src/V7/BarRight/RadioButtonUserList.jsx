import React, { useState } from "react";
import useStore from "../../utils/store/userStore";

// function RadioButtonUserList({ queryName, onClick }) {
function RadioButtonUserList() {

    const {users,selectedUser}=useStore()

    return (
        <div className="text-nowrap   content-start gap-1 m-1 grid grid-cols-2 w-[11rem]">
            {users.map((item, i) => {
                return (
                    <label
                        key={i}
                        className="border border-1 border-slate-500  rounded-md  flex flex-row gap-1  px-2 py-1    text-center"
                    >
                        <input
                            type="radio"
                            value={item.username}
                            checked={item === selectedUser}
                            onChange={(e) => {
                               useStore.setState({selectedUser:item})
                            }}
                        />
                        {item.username}
                    </label>
                );
            })}
        </div>
    );
}

export default RadioButtonUserList;
