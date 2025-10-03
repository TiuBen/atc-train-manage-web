import React from "react";
import useStore from "../../utils/store/userStore";

function MonthPage() {
    const { users, detailUsers } = useStore();
    return (
        <div className="w-[calc(100vw-)] h-[calc(100vh-50px)]">
            <>
                <div className="flex flex-row gap-2 bg-slate-400  min-w-0 overflow-x-auto">
                    {users.map((user, index) => (
                        <div key={user.id} className="text-nowrap whitespace-nowrap">
                            {user.username}
                        </div>
                    ))}
                </div>
            </>
            <div className="flex min-w-0   overflow-x-auto">
                <div className="w-[1000px] h-[800px] bg-yellow-100">fadfasdfasf</div>
            </div>
        </div>
    );
}

export default MonthPage;
