import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="flex justify-center items-center gap-6 bg-white  p-4 ">
    <a
      href="/"
      className="text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition"
    >
      Bill Info
    </a>
    <a
      href="/Billing"
      className="text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition"
    >
      Bill Generate
    </a>
  </div>
    <App />
  </StrictMode>,
)
