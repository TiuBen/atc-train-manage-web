import { ClipboardPenLine, MessageCircle, Sheet, UserRoundCog } from "lucide-react";
import { Theme, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const LeftNavItem = ({ title, href, Icon, active, isExpanded, subNav }) => {
    return (
        <div className={`flex items-start gap-1   text-nowrap ${isExpanded?"flex-col":"flex-row "} `} >
            <Link
                to={href}
                title={href}
                className={`flex gap-1 justify-center flex-nowrap ${isExpanded ? " flex-row  text-lg" : ""}`}
            >
                <Icon size={isExpanded ? "1.5rem" : "2rem"} />
                <h2>{title}</h2>
            </Link>
            {subNav && isExpanded && (
                <div className="flex ml-4 flex-col gap-1 ">
                    {subNav.map((item, index) => {
                        return (
                            // <div  className={`flex items-start gap-1 text-center  flex-nowrap flex-row }`}>
                            //     {item.Icon()}
                            //     <h2>{item.title}</h2>

                            // </div>
                            <LeftNavItem key={index} {...item} />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

function LeftBar(props) {
    const { isExpanded } = props;

    const items = [
        { title: "执勤", href: "/duty", Icon: (props) => <MessageCircle {...props} strokeWidth={1.5} />, active: true },
        {
            title: "后台",
            href: "/admin",
            Icon: (props) => <ClipboardPenLine {...props} strokeWidth={1.5} />,
            active: false,
            subNav: [
                { title: "执勤表格",  href: "/admin/sheet",Icon: (props) => <Sheet {...props} size={"1.5em"} strokeWidth={1.5} />, active: true },
                { title: "设置", Icon: (props) => <UserRoundCog {...props} size={"1.5em"} strokeWidth={1.5} />, active: false },
            ],
        },
        // {
        //     title: "Products",
        //     Icon: (props) => <ClipboardPenLine {...props} strokeWidth={2} />,
        //     active: false,
        // },
        // {
        //     title: "Orders",
        //     Icon: (props) => <ClipboardPenLine {...props} strokeWidth={2} />,
        //     active: false,
        // },
    ];

    return (
        <>
            <div
                className="flex flex-col items-start gap-2 mx-2 mt-2 text-accent font-extrabold "
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
                            isExpanded={isExpanded}
                            subNav={item.subNav}
                            props={items}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default LeftBar;
