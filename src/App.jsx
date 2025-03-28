import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BillInfo from "./component/BillInfo";
import BillGenerate from "./component/BillGenerate";
import Dashboard from "./component/Dashboard/Dashboard";
import CustomerHistoryTable from "./component/CustomerHistoryTable";
import DemandTable from "./component/DemandTable";
import RebateAmountTable from "./component/RebateAmountTable";
import CollectionAmountTable from "./component/CollectionAmountTable";
import SubsidyTable from "./component/SubsidyTable";
import InterestTable from "./component/interestTable";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/Billing", 
      element: <BillGenerate />,
    },
    {
      path: "/",
      element: <BillInfo />,
    },
    {
      path: "/admin-dashboard",
      element: <Dashboard/>,
      children: [
        {
          path: "",
          element: <></>,  
        },
        {
          path: "slide/Billing/backoffice",
          element: <BillGenerate/>,  
        },
        {
          path: "Custome-History",
          element: <CustomerHistoryTable/>,  
        },
        {
          path: "rebate",
          element: <RebateAmountTable/>,  
        },
        {
          path: "Subsidy",
          element: <SubsidyTable/>,  
        },
        {
          path: "Revenue",
          element: <DemandTable/>,  
        },
        {
          path: "Demand",
          element: <DemandTable/>,  
        },
        {
          path: "GOK-Balanace",
          element: <DemandTable/>,  
        },
        {
          path: "Subsidy",
          element: <DemandTable/>,  
        },
        {
          path: "Collection",
          element: <CollectionAmountTable/>,  
        },
        {
          path: "Consumption",
          element: <CollectionAmountTable/>,  
        },
        {
          path: "Interest",
          element: <InterestTable/>,  
        },
        
      ]
    },
    
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
