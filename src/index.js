import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import "@radix-ui/themes/styles.css";

import AppSkeleton from "./v1-skeleton/AppSkeleton.jsx";
import AppV2 from "./V2-dashboard/AppV2.jsx";
import AppV3 from "./V3/AppV3.jsx";
import AppMobile from "./V4-MobileOnly/AppMobile.jsx";
import EditDutyRecord from "./V3/Page2/SheetPage/LikeExcel/EditDutyRecord.jsx";
import AppV5 from "./V5-new-skeleton/routes.js";

createRoot(document.getElementById("root")).render(
    // <AppMobile />
    <AppV3 />
    // <AppV5 />
);

// <StrictMode>
{
    /* <App /> */
}
{
    /* <AppSkeleton /> */
}
{
    /* <AppV2 /> */
}
{
    /* <EditDutyRecord /> */
}
// </StrictMode>
