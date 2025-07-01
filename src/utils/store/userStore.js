// store.js
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
const useStore = create((set) => ({
    users: [1, 1, 2],
    userStatics: {},
    userStaticsByMonth:[],
    positionsOnDuty: [],

    isLoading: true,
    error: null,

    // 获取用户数据
    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(API_URL.users+`?fields=${encodeURIComponent("id,username")}`);
            if (!response.ok) throw new Error("Network response was not ok");
            const users = await response.json();
            set({ users, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
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

    // 获取某个月的数据

    // 获取席位
    fetchPositions: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(API_URL.query_positions+ "?display=true");
            if (!response.ok) throw new Error("Network response was not ok");
            const positionsOnDuty = await response.json();
            set({ positionsOnDuty, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    }

}));

useStore.getState().fetchUsers();

export default useStore;
