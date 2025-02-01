const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const FETCHER = (...args) => fetch(...args).then((res) => res.json());

const POSITIONS = [
    "带班主任",
    "放行",
    "地面",
    "综合协调",

    "西塔台",
    "西地面",
    "西放行",
    "东塔台",
    "东地面",
    "东放行",
    "领班",
    "流控",
    "进近高扇",
    "进近低扇",
];


export { SERVER_URL,FETCHER,POSITIONS };
