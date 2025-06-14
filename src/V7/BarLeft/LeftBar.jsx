import { ClipboardPenLine, MessageCircle, Sheet, UserRoundCog, BicepsFlexed, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const LeftNavItem = ({ title, href, Icon, active, isExpanded, subNav }) => {
    if (isExpanded) {
        return (
            <div className={`flex items-start gap-1   text-nowrap  flex-col `}>
                <Link to={href} title={href} className={`flex flex-row  gap-1 flex-nowrap   `}>
                    <Icon size={"1.5rem"} />
                    <h2 className={` text-lg`}>{title}</h2>
                </Link>
                {subNav && (
                    <div className="flex ml-2 flex-col gap-1 ">
                        {subNav.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={item.href}
                                    title={item.href}
                                    className={`flex flex-row  gap-1  flex-nowrap    text-base`}
                                >
                                    {item.Icon()}
                                    <h2 className={` text-base`}>{item.title}</h2>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link to={href} title={href} className={`self-center flex gap-1 items-center  flex-col `}>
            <Icon size={"2.5rem"} />
            <h2 className={`  text-sm`}>{title}</h2>
        </Link>
    );
};

function LeftBar(props) {
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);

    const items = [
        {
            title: "执勤",
            href: "/",
            Icon: (props) => <MessageCircle {...props} strokeWidth={1.5} />,
            active: true,
            subNav: [
                {
                    title: "岗位状态",
                    href: "/duty",
                    Icon: (props) => <BicepsFlexed {...props} strokeWidth={1.5} />,
                    active: true,
                },
                {
                    title: "日历",
                    href: "/calendar",
                    Icon: (props) => <CalendarDays {...props} strokeWidth={1.5} />,
                    active: false,
                },
            ],
        },
        {
            title: "后台",
            href: "/admin",
            Icon: (props) => <ClipboardPenLine {...props} strokeWidth={1.5} />,
            active: false,
            subNav: [
                {
                    title: "执勤表格",
                    href: "/admin/sheet",
                    Icon: (props) => <Sheet {...props} size={"1.5em"} strokeWidth={1.5} />,
                    active: true,
                },
                {
                    title: "设置",
                    href: "/admin/setting",
                    Icon: (props) => <UserRoundCog {...props} size={"1.5em"} strokeWidth={1.5} />,
                    active: false,
                },
                {
                    title: "夜班统计",
                    href: "admin/night",
                    Icon: (props) => <UserRoundCog {...props} size={"1.5em"} strokeWidth={1.5} />,
                    active: false,
                },
            ],
        },
    ];

    return (
        <aside
            className={`relative overflow-visible   ${
                isLeftSidebarOpen ? "w-[8rem]" : "w-[4rem]"
            }  flex flex-row bg-blue-600  text-blue-50`}
        >
            <div
                className="flex flex-col items-start gap-2 mx-2 mt-2 text-accent font-bold "
                // style={{ color: "var(--accent-9)" }}
            >
                {items.map((item, index) => {
                    return (
                        <LeftNavItem
                            key={index}
                            title={item.title}
                            href={item.href}
                            Icon={(props) => item.Icon({ ...props })}
                            active={item.active}
                            isExpanded={isLeftSidebarOpen}
                            subNav={item.subNav}
                            props={items}
                        />
                    );
                })}
            </div>
            <button
                className={` w-[1rem] hover:cursor-ew-resize  bg-blue-600 shadow-md  `}
                onClick={() => {
                    setLeftSidebarOpen(!isLeftSidebarOpen);
                }}
            ></button>
        </aside>
    );
}

export default LeftBar;
