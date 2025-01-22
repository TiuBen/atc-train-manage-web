const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const FETCHER = (...args) => fetch(...args).then((res) => res.json());

export { SERVER_URL,FETCHER };
