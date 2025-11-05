import React from "react";
import UserStore from "../store/UserStore";

function TestStore() {
    const { users,groupedUsers,detailUsers, positions, onDutyUsers, isLoading, error, initStore, fetchOnDutyUsers } = UserStore();

    return (
        <div>
            TestStore
            <br></br>
            {JSON.stringify(users)}
            {JSON.stringify(groupedUsers)}
            detailUsers
            {JSON.stringify(detailUsers)}
        </div>
    );
}

export default TestStore;
