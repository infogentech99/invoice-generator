import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BillInfo from "./component/BillInfo";
import BillGenerate from "./component/BillGenerate";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/billGenerate", 
      element: <BillGenerate />,
    },
    {
      path: "/",
      element: <BillInfo />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
