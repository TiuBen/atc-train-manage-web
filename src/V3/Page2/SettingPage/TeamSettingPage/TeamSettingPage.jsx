import { Button, Flex, Checkbox, CheckboxGroup, Text, TextField, Radio, RadioGroup } from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../../../utils/const/Const";
import useSWR, { mutate } from "swr";
import { usePage, SERVER_URL, FETCHER } from "@utils";
import { Minus, Plus } from "lucide-react";
import useStore from "../../../../utils/store/userStore";
function TeamSettingPage() {
    // const { data: users } = useSWR(`${API_URL.users}`, FETCHER);

    const { users } = useStore();
    const [teamCount, setTeamCount] = useState(2);

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const maxTeam = Math.max(...users.map((item) => item.team));
        setTeamCount(maxTeam);
    }, [users]);

    // 根据团队数量初始化团队
    // 根据团队数量和用户现有团队分配初始化团队
    useEffect(() => {
        if (users.length === 0) return;

        // 创建团队结构
        const initialTeams = Array.from({ length: teamCount }, (_, i) => ({
            id: i + 1, // 团队ID与用户数据中的team字段对应
            name: `班组 ${i + 1}`,
            members: users.filter((user) => user.team === i + 1).map((user) => user.id),
        }));

        setTeams(initialTeams);
    }, [users, teamCount]);

    // 处理拖拽开始
    const handleDragStart = (e, userId) => {
        e.dataTransfer.setData("text/plain", userId);
        e.currentTarget.style.opacity = "0.4";
    };

    // 处理拖拽结束
    const handleDragEnd = (e) => {
        e.currentTarget.style.opacity = "1";
    };

    // 处理拖拽悬停
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // 处理放置
    const handleDrop = (e, teamId) => {
        e.preventDefault();
        const userId = e.dataTransfer.getData("text/plain");

        // 从所有团队中移除该用户
        const updatedTeams = teams.map((team) => ({
            ...team,
            members: team.members.filter((memberId) => memberId !== userId),
        }));

        // 将用户添加到目标团队
        const targetTeamIndex = updatedTeams.findIndex((team) => team.id === teamId);
        if (targetTeamIndex !== -1) {
            updatedTeams[targetTeamIndex].members.push(userId);
        }

        setTeams(updatedTeams);
    };

    // 提交分配结果
    //   const handleSubmit = () => {
    //     const result = teams.map(team => ({
    //       teamId: team.id,
    //       teamName: team.name,
    //       members: team.members.map(memberId =>
    //         users.find(user => user.id === Number(memberId))
    //     }));

    //     console.log('Allocation Result:', result);
    //     alert('分配结果已提交到控制台');
    //   };

    // 获取未分配的用户   // 获取未分配的用户
    const getUnassignedUsers = () => {
        return users.filter((user) => !user.team);
    };
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-gray-300">此处修改执勤界面</h1>
            <form className="flex flex-col gap-4">
                <fieldset className="border  rounded-md  p-2">
                    <legend className="text-lg font-bold">设置班组数</legend>
                    <div>
                        <label className="text-lg font-bold">当前班组数：{teamCount}</label>
                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4   text-lg rounded">
                                <Minus />
                            </button>
                            <input
                                type="range"
                                max={8}
                                value={teamCount}
                                className="border border-1 border-green-500  rounded-md px-1 py-1 text-lg   text-center"
                            />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4   text-lg rounded">
                                <Plus />
                            </button>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="border  rounded-md  p-2">
                    <legend className="text-lg font-bold">
                        全体成员 <span className="text-sm text-blue-700">(拖放分组)</span>{" "}
                    </legend>
                    <div className="flex flex-row gap-2 text-nowrap flex-wrap">
                        {users &&
                            users.map((user, i) => {
                                return (
                                    <div
                                        className="bg-blue-500 hover:bg-blue-700 hover:cursor-grabbing text-white font-bold py-1 px-2   text-base rounded"
                                        key={user.id}
                                    >
                                        {user.username}
                                    </div>
                                );
                            })}

                        {/* <label className="text-lg font-bold">当前班组数：{teamCount}</label>
                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4   text-lg rounded">
                                <Minus />
                            </button>
                            <input
                                type="range"
                                max={8}
                                value={teamCount}
                                className="border border-1 border-green-500  rounded-md px-1 py-1 text-lg   text-center"
                            />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4   text-lg rounded">
                                <Plus />
                            </button>
                        </div> */}
                    </div>
                </fieldset>
                {/* 未分配用户区域 */}
                <fieldset className="border  rounded-md  p-2">
                    <legend className="text-lg font-bold">未分配用户</legend>
                    <div className="flex flex-row gap-2 text-nowrap flex-wrap">
                        {getUnassignedUsers().length === 0 ? (
                            <p>所有用户已分配</p>
                        ) : (
                            getUnassignedUsers().map((user) => (
                                <div
                                    key={user.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, String(user.id))}
                                    onDragEnd={handleDragEnd}
                                    style={{
                                        padding: "8px",
                                        margin: "5px 0",
                                        background: "#e3f2fd",
                                        cursor: "move",
                                        borderRadius: "4px",
                                    }}
                                >
                                    {user.username}
                                </div>
                            ))
                        )}
                    </div>
                </fieldset>
                {/* 团队区域 */}
                {teams.map((team) => (
                    <fieldset
                        key={team.id}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, team.id)}
                        className="border  rounded-md bg-slate-300  p-2"
                    >
                        <legend  className="text-lg font-bold">
                            {team.name} ({team.members.length}人)
                        </legend>
                        <div className="flex flex-row gap-2 text-nowrap flex-wrap">
                            {team.members.length === 0 ? (
                                <p style={{ color: "#999" }}>拖拽用户到这里加入团队</p>
                            ) : (
                                team.members.map((memberId) => {
                                    const user = users.find((u) => u.id === memberId);
                                    return (
                                        <div
                                            key={memberId}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, memberId)}
                                            onDragEnd={handleDragEnd}
                                            style={{
                                                padding: "10px",
                                                margin: "8px 0",
                                                background: "#e3f2fd",
                                                cursor: "move",
                                                borderRadius: "4px",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <span style={{ marginRight: "10px" }}>👥</span>
                                            <div>
                                                <div style={{ fontWeight: "bold" }}>{user?.username || "未知用户"}</div>
                                                <div style={{ fontSize: "0.8em", color: "#666" }}>{user?.roleType }</div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </fieldset>
                ))}

            </form>
        </div>
    );
}

export default TeamSettingPage;

{
    /* <RadioGroup.Root
name="example"
style={{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "0.6rem",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "flex-start",
    width: "100%",
    height: "100%",
}}
onValueChange={(value) => {}}
>
{users &&
    users.map((item, i) => {
        return (
            <RadioGroup.Item
                value={item.id}
                key={i}
                style={{ gap: "0.25rem" }}
                className=" hover:font-bold hover:text-blue-700"
            >
                {item.username}
            </RadioGroup.Item>
        );
    })}
</RadioGroup.Root> */
}

{/* <fieldset className="border  rounded-md  p-2">
<legend className="text-lg font-bold">分类班组</legend>

{users &&
    Object.entries(
        users.reduce((acc, user) => {
            if (!acc[user.team]) acc[user.team] = [];
            acc[user.team].push(user);
            return acc;
        }, {})
    ).map(([teamId, teamUsers]) => (
        <fieldset key={`team-${teamId}`} style={{ marginBottom: "1rem" }}>
            <legend style={{ fontWeight: "bold" }}>Team:{teamId}</legend>
            <RadioGroup.Root
                name={`team-${teamId}-selection`}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "0.6rem",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    alignContent: "flex-start",
                    width: "100%",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "0.2rem",
                }}
                onValueChange={(value) => {
                    console.log(`Selected user ${value} from team ${teamId}`);
                }}
            >
                {teamUsers.map((user, i) => (
                    <RadioGroup.Item
                        value={user.id}
                        key={user.id}
                        style={{ gap: "0.25rem" }}
                        className="hover:font-bold hover:text-blue-700"
                    >
                        {user.username}
                    </RadioGroup.Item>
                ))}
            </RadioGroup.Root>
        </fieldset>
    ))}
</fieldset> */}