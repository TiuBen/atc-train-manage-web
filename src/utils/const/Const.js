const SERVER_URL = import.meta.env.VITE_SERVER_URL;
// const SERVER_URL = "http://localhost:3105/api";
// const SERVER_URL = "/api";

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

const API_URL= {
    "query_statics": `${SERVER_URL}/query/statics`,
    "query_now": `${SERVER_URL}/query/now`,
    "query_positions": `${SERVER_URL}/query/positions`,
    "query_roles": `${SERVER_URL}/query/roles`,
    "query_id":`${SERVER_URL}/query?id=`

}; 


export { SERVER_URL,FETCHER,POSITIONS,API_URL };
