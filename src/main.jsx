import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="flex justify-center items-center gap-6 bg-[#154c69] p-4 ">
    <div
      className="ml-4 lg:text-xl font-bold px-4 py-2 rounded-md   text-white "
    >
       TOTAL REVENUE MANGEMENT SYSTEM
    </div>
  </div>
    <App />
    <div className="flex justify-center items-center gap-6 bg-[#154c69] p-4 ">
    <div
      className="ml-4 lg:text-xl font-bold px-4 py-2 rounded-md   text-white "
    >
      Design and Developed By Rinim Technologies Pvt Ltd.
    </div>
  </div>
  </StrictMode>,
)
