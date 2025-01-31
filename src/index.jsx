import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import "@radix-ui/themes/styles.css";


import AppSkeleton from './v1-skeleton/AppSkeleton.jsx'
import AppV2 from './V2-dashboard/AppV2.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <AppSkeleton /> */}
    <AppV2 />
  </StrictMode>
)
