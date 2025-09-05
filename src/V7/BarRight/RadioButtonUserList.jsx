import React, { useState } from "react";
import useStore from "../../utils/store/userStore";

// function RadioButtonUserList({ queryName, onClick }) {
function RadioButtonUserList() {

    const {users,selectedUser}=useStore()

    return (
        <div className="flex flex-row flex-wrap text-nowrap flex-1  content-start gap-1 m-2 ">
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
