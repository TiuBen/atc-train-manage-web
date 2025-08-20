// store.js
import dayjs from "dayjs";
import { create } from "zustand";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const API_URL = {
    query_now: `${SERVER_URL}/query/now`,
    query_positions: `${SERVER_URL}/positions`,
    query_roles: `${SERVER_URL}/query/roles`,
    query_id: `${SERVER_URL}/query?id=`,
    query_users: `${SERVER_URL}/query/users`,
    users: `${SERVER_URL}/users`,
    duty: `${SERVER_URL}/duty`,
    query_duty: `${SERVER_URL}/duty?`,
    roles: `${SERVER_URL}/roles`,
    query_statics: `${SERVER_URL}/statics?`,
};

// 创建 store
const useStore = create((set, get) => ({
    users: [1, 1, 2],
    groupedUsers: [],
    detailUsers: [],
    onDutyUsers: [],
    //
    selectedPosition: null, // 用来在 席位点击后使用
    selectedDutyRecord: null, // 用来在  某个 人被点击后用

    // 用在 详情页
    selectedUser:null,
    selectedUserNightCount: {},

    userStatics: {},
    userStaticsByMonth: [],
    positionsOnDuty: [],

    positions: [],


    isLoading: true,
    error: null,

    // 获取用户数据
    // ! 这段只是获取 所有的user
    // ! 用来 配合 弹出的 用户列表选择
    initStore: async () => {
        set({ isLoading: true, error: null });
        try {
            fetch(`${SERVER_URL}/positions?display=true`)
                .then((response) => response.json())
                .then((data) => {
                    set({ positions: data, isLoading: false });
                })
                .catch((error) => {
                    console.error("Error:", error);
                    set(error);
                });

            fetch(API_URL.users + `?fields=${encodeURIComponent("id,username")}`)
                .then((response) => response.json())
                .then((data) => {
                    set({ users: data });
                })
                .catch((error) => {
                    console.error("Error:", error);
                    set(error);
                });

            fetch(`${SERVER_URL}/users?fields=${encodeURIComponent("id,username,team,position")}&groupBy=team`)
                .then((response) => response.json())
                .then((data) => {
                    const groupedUsers = data;
                    const detailUsers = data
                        .flat()
                        .map(({ id, username, team, position }) => ({ id, username, position }));
                    set({ groupedUsers, detailUsers });
                })
                .catch((error) => {
                    console.error("Error:", error);
                    set({ error });
                });

            fetch(`${SERVER_URL}/duty?outTime=null`)
                .then((response) => response.json())
                .then((data) => {
                    set({ onDutyUsers: data });
                })
                .catch((error) => {
                    console.error("Error:", error);
                    set(error);
                });
        } catch (error) {
            set({ error: error.message });
        }
        // set({ isLoading: false });
    },

    //
    // fetchDetailUsers: async () => {
    //     console.log("testSSS");
    //     set({ isLoading: true, error: null });
    //     try {
    //         const response = await fetch(API_URL.users);
    //         if (!response.ok) throw new Error("Network response was not ok");
    //         const detailUsers = await response.json();
    //         set({ detailUsers, isLoading: false });
    //     } catch (error) {
    //         set({ error: error.message, isLoading: false });
    //     }
    // },

    // fetchOnDutyUsers: (x) => {
    //     set((state) => {
    //         if (state.onDutyUsers.some((i) => i.id === x.id)) {
    //         }
    //     });
    // },

    // 试试 这段用来 提交数据

    setSelectedPosition: (position) =>
        set((state) => ({
            selectedPosition: position,
        })),
    setSelectedDutyRecord: (dutyRecord) =>
        set((state) => ({
            selectedDutyRecord: dutyRecord,
        })),

    putDutyRecord: async (dutyRecord) => {
        const _temp = { ...dutyRecord };
        if (_temp.roleType === null) {
            //! 只有 既不是 见习 也不是 教员 的才只改变自己
            fetch(`${SERVER_URL}/duty/${_temp.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    outTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                }),
            })
                .then((res) => res.json())
                .then(async (data) => {
                    console.log(data);
                    await get().fetchOnDutyUsers();
                    get().setSelectedDutyRecord(null);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {});
        } else {
            let studentData, studentDataID, teacherData, teacherDataID;
            const parts = _temp.relatedDutyTableRowId.split(";").filter((part) => part !== ""); // 按 `;` 分割并过滤空字符串
            const lastPart = parts[parts.length - 1]; // 取最后一段

            if (_temp.roleType === "见习") {
                studentData = {
                    outTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                    roleEndTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                    relatedDutyTableRowId: null,
                };
                studentDataID = _temp.id;
                teacherData = {
                    roleType: null,
                    roleStartTime: null,
                    roleEndTime: null,
                };
                teacherDataID = lastPart;
            } else if (_temp.roleType === "教员") {
                studentData = {
                    outTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                    roleEndTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                    relatedDutyTableRowId: null,
                };
                studentDataID = lastPart;
                teacherData = {
                    roleType: null,
                    roleEndTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                    outTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                };
                teacherDataID = _temp.id;
            }

            const promises = [
                { id: studentDataID, data: studentData },
                { id: teacherDataID, data: teacherData },
            ].map(({ id, data }) =>
                fetch(`${SERVER_URL}/duty/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
            );

            Promise.all(promises)
                .then((responses) => Promise.all(responses.map((res) => res.json())))
                .then(async (data) => {
                    console.log("所有更新成功", data);
                    await get().fetchOnDutyUsers();
                    get().setSelectedDutyRecord(null);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {});
        }
    },

    // 更新用户数据
    updateUser: async (userId, updatedData) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${API_URL.users}/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error("Network response was not ok");
            const updatedUser = await response.json();

            set((state) => ({
                users: state.users.map((user) => (user.id === userId ? { ...user, ...updatedUser } : user)),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // 获取用户统计数据
    fetchStatics: async (query) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${API_URL.query_statics}?${query}`);
            if (!response.ok) throw new Error("Network response was not ok");
            const userStatics = await response.json();
            set({ userStatics, isLoading: false });
        } catch (error) {
            console.log(error);
        }
    },

    fetchOnDutyUsers: async () => {
        fetch(`${SERVER_URL}/duty?outTime=null`)
            .then((res) => res.json())
            .then((data) => {
                const prev = get().onDutyUsers;
                if (JSON.stringify(prev) !== JSON.stringify(data)) {
                    set({ onDutyUsers: data });
                }
            });
    },

    // 获取某个月的数据

    // 获取席位
    fetchPositions: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(API_URL.query_positions + "?display=true");
            if (!response.ok) throw new Error("Network response was not ok");
            const positionsOnDuty = await response.json();
            set({ positionsOnDuty, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

   
}));

useStore.getState().initStore();
// useStore.getState().fetchDetailUsers();

export default useStore;
