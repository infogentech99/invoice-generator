import React, { use, useEffect, useState } from 'react';
import Sidebar from '../slidebar';
import DemandTable from '../DemandTable';
import CollectionAmountTable from '../CollectionAmountTable';
import RebateAmountTable from '../RebateAmountTable';
import ClosingTable from '../ClosingTable';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBillIndex, setSelectedBillIndex] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [history, setHistory] = useState(null);
  const [Model, setModel] = useState(false);
  const [billNumber, setBillNumber] = useState('');
  const [demand, setDemand] = useState(false);
  const [totalCollection, setTotalCollection] = useState(false);
  const [rebate, setRebate] = useState(false);
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState(null);

  const GetCustomerHistory = async () => {
    try {
      const response = await fetch(
        `https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Reports/GetCustomerHistory/${searchTerm}`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const CusData = async () => {
    try {
      const response = await fetch(
        `https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Billing/GetCustomerMasterData/${searchTerm}`
      );

      if (!response.ok) throw new Error('Failed to fetch customer data');
      const data = await response.json();
      setCustomerData(data[0]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = () => {
    GetCustomerHistory();
    CusData();
    setModel(true);
    navigate('/admin-dashboard/Custome-History');
  };

  const linkableColumns = {
    rebateAmount: 'rebate',
    demand: 'demand',
    totalCollection: 'totalCollection',
    closingBalance: 'closing',
  };

  const handleColumnClick = (billNum, columnKey) => {
    setBillNumber(billNum);
    setDemand(columnKey === 'demand');
    setTotalCollection(columnKey === 'totalCollection');
    setRebate(columnKey === 'rebateAmount');
    setClosing(columnKey === 'closingBalance');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className={`transition-all duration-300 w-full ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} overflow-y-auto`}>

      {!location.pathname.includes('/admin-dashboard/slide')  && (
        <div className="p-6">
        {/* Search */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Search
          </button>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap gap-4 mb-6">
        {Model && customerData && (
            <div className="bg-[#2a4056] text-white p-4 rounded-md w-full sm:w-[300px]">
              <h1 className="text-xl font-bold mb-2">Personal information</h1>
              <div>Customer Name: {customerData.customerName || 'N/A' }</div>
              <div>Address: {customerData.addressLine1 || 'N/A'}</div>
              <div>Mobile Number: {customerData.mobileNumber || 'N/A'}</div>
            </div>
          )}
          {Model && customerData && (
            <div className="bg-[#2a4056] text-white p-4 rounded-md w-full sm:w-[300px]">
              <h1 className="text-xl font-bold mb-2">Meter Details</h1>
              <div>Meter Constant: {customerData.meterConstant}</div>
              <div>Sanction Load (KW): {customerData.sanctionedLoadKW}</div>
              <div>Sanction Load (HP): {customerData.sanctionedLoadHP}</div>
              <div>Contract Demand: {customerData.contractDemand}</div>
            </div>
          )}

          {Model && customerData && (
            <div className="bg-[#2a4056] text-white p-4 rounded-md w-full sm:w-[300px]">
              <h1 className="text-xl font-bold mb-2">Miscellaneous</h1>
              <div>Service Date: {customerData.serviceDate}</div>
              <div>Reading date: {customerData.readingDate}</div>
              <div>Due Date: {customerData.dueDate}</div>
            </div>
          )}

          {Model && customerData && (
            <div className="bg-[#2a4056] text-white p-4 rounded-md w-full sm:w-[300px]">
              <h1 className="text-xl font-bold mb-2">Other</h1>
              <div>LF No : {customerData.lfNo}</div>
              <div>Installation Type: {customerData.installationtype ?? 'N/A'}</div>
            </div>
          )}
        </div>

        {/* Bill Table */}

{Model &&  <div >
<div className="flex bg-blue-100 rounded-md flex-wrap gap-2 p-1">
<NavLink to="Custome-History"  className={({ isActive }) => (isActive ? '  bg-[#154c69] rounded-md  py-1.5 px-1.5  ' : ' py-1 px-1')} >Customer History</NavLink>
<NavLink to="Demand" className={({ isActive }) => (isActive ? '  bg-[#154c69] rounded-md  py-1.5 px-1.5  ' : ' py-1 px-1 ')}>Demand</NavLink>
<NavLink to="rebate"  className={({ isActive }) => (isActive ? '  bg-[#154c69] rounded-md  py-1.5 px-1.5  ' : ' py-1 px-1 ')} >Rebate Amount</NavLink>
<NavLink to="Subsidy" className={({ isActive }) => (isActive ? '  bg-[#154c69] rounded-md  py-1.5 px-1.5  ' : ' py-1 px-1 ')}>Subsidy</NavLink>
<NavLink to="Revenue" className={({ isActive }) => (isActive ? '  bg-[#154c69] rounded-md  py-1.5 px-1.5  ' : ' py-1 px-1 ')}>Revenue</NavLink>
<NavLink to="Interest" className={({ isActive }) => (isActive ? '  bg-[#154c69] rounded-md  py-1.5 px-1.5  ' : ' py-1 px-1 ')}>Interest</NavLink>
<NavLink to="GOK-Balanace" className={({ isActive }) => (isActive ? '  bg-[#154c69] rounded-md  py-1.5 px-1.5  ' : ' py-1 px-1 ')}>GOK Balanace</NavLink>
<NavLink to="Consumption" className={({ isActive }) => (isActive ? '  bg-[#154c69] rounded-md  py-1.5 px-1.5  ' : ' py-1 px-1 ')}>Consumption</NavLink>
<NavLink to="Collection" className={({ isActive }) => (isActive ? '  bg-[#154c69] rounded-md  py-1.5 px-1.5  ' : ' py-1 px-1 ')}>Collection</NavLink>
</div>
<div>
<Outlet context={{ history,billNumber,selectedBillIndex,setBillNumber,setSelectedBillIndex  }} />
  </div>
  </div>}
      </div>
      )}
      {location.pathname.includes('/admin-dashboard/slide') && (
        <div>
         <Outlet context={{ history,billNumber,selectedBillIndex,setBillNumber,setSelectedBillIndex  }} />
        </div>
      )}
        
      </div>
    </div>
  );
};

export default Dashboard;
