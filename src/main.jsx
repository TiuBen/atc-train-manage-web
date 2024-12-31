import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'

import AppSkeleton from './v1-skeleton/AppSkeleton.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <AppSkeleton />
  </StrictMode>,
)
