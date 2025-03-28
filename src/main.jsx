import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="flex justify-between items-center gap-6 bg-blue-200 p-4 ">
    <div
      className="ml-4 lg:text-xl font-bold px-4 py-2 rounded-md  hover:bg-blue-100 transition"
    >
      HECOM TOTAL REVENUE MANGEMENT SYSTEM
    </div>
    <a
      href="/admin-dashboard"
      className=" font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition"
    >
      Admin Panel
    </a>
  </div>
    <App />
  </StrictMode>,
)
