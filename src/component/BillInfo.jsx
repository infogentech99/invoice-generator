import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DemandTable from "./DemandTable";
import RebateAmountTable from "./RebateAmountTable";
import CollectionAmountTable from "./CollectionAmountTable";
import ClosingTable from "./ClosingTable";

const BillGenerate = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const [billNumber, setBillNumber] = useState(null);
  const [columnHeader, setColumnHeader] = useState(null);
  const [history, setHistory] = useState(null);
  const [demand, setDemand] = useState(false);
  const [totalcollection, setTotalcollection] = useState(false);
  const [rebate, setRebate] = useState(false);
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    RRNO: "",
    ConnectionID: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Check if at least one field is filled
  const isFormValid = formData.RRNO.trim() !== "" || formData.ConnectionID.trim() !== "";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const get = formData.ConnectionID || formData.RRNO;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Billing/GetCustomerMasterData/${get}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch customer data");
      }

      const data = await response.json();
      setCustomerData(data[0]);

      const historyResponse = await fetch(
        `https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Reports/GetCustomerHistory/dwd99`
      );

      const historyData = await historyResponse.json();

      if (historyData.length > 0) {
        setHistory(historyData);
        console.log(historyData)
      } else {
        setHistory([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Clickable Columns
  const linkableColumns = {
    rebateAmount: "/billInfo/penalty-amount",
    demand: "/billInfo/demand",
    totalCollection: "/billInfo/collection-amount",
    closingBalance: "/billInfo/closing-balance",
  };

  // Handle Click Event for Columns
  const handleColumnClick = (billNum, columnHead) => {
    console.log(`Clicked on Bill Number: ${billNum}, Column: ${columnHead}`);
    if(columnHead=="rebateAmount"){
      setRebate(true);
      setClosing(false);
      setTotalcollection(false);
      setDemand(false);

    }
    if(columnHead=="closingBalance"){
      setRebate(false);
      setClosing(true);
      setTotalcollection(false);
      setDemand(false);
    }
    if(columnHead=="totalCollection"){
      setRebate(false);
      setClosing(false);
      setTotalcollection(true);
      setDemand(false);
    }
    if(columnHead=="demand"){
      setRebate(false);
      setClosing(false);
      setTotalcollection(false);
      setDemand(true);
    }
    setBillNumber(billNum);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <form onSubmit={handleSubmit} className="space-y-4 border-2 border-black p-4 rounded-2xl">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">RRNO</label>
            <input
              type="text"
              name="RRNO"
              value={formData.RRNO}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="text-center w-full font-semibold">or</div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">ConnectionID</label>
            <input
              type="text"
              name="ConnectionID"
              value={formData.ConnectionID}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white font-semibold py-2 px-4 rounded-lg ${
              isFormValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>


      {customerData && (
  <div className="bg-white p-6 w-full mt-6 shadow-md rounded-lg max-w-lg mx-auto border border-gray-300">
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Customer Information</h2>
    
    <div className="space-y-4">
      <div className="flex justify-between  pb-2">
        <span className="text-gray-600 font-semibold">Customer Name:</span>
        <span className="text-gray-800">{customerData.applicantName || "N/A"}</span>
      </div>

      <div className="flex justify-between  pb-2">
        <span className="text-gray-600 font-semibold">Address:</span>
        <span className="text-gray-800">{customerData.address || "N/A"}</span>
      </div>

      <div className="flex justify-between  pb-2">
        <span className="text-gray-600 font-semibold">Division:</span>
        <span className="text-gray-800">{customerData.division || "N/A"}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600 font-semibold">SubDivision:</span>
        <span className="text-gray-800">{customerData.subDivision || "N/A"}</span>
      </div>
    </div>
  </div>
)}
      </div>


      {/* Bill Summary */}
      {history && history.length > 0 ? (
        <div className="flex overflow-x-auto mt-6">
          <div className="bg-white shadow-lg rounded-lg p-8 min-w-full">
            <h2 className="text-2xl font-bold mb-4">Bill Summary</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="border p-2 text-xs whitespace-nowrap">Bill Number</th>
                    {Object.keys(history[0]).map((header) => (
                      <th key={header} className="border p-2 text-xs whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{row.billNumber ?? "N/A"}</td>
                      {Object.keys(row).map((key) => (
                        <td
                          key={key}
                          className={`border px-4 py-2 ${
                            linkableColumns[key] && row.billNumber ? "text-blue-500 hover:underline cursor-pointer" : ""
                          }`}
                        >
                          {linkableColumns[key] && row.billNumber ? <button onClick={() => handleColumnClick(row.billNumber, key)}>
                            {row[key] ?? "—"}
                          </button>
                          :
                          <>{row[key] ?? "—"}</>
                          }
                          
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-500">No bill history found.</p>
      )}

      {/* {Dynamic data} */}
      {/* <div className="px-5">
        <Outlet  billNumber={billNumber} columnHeader={columnHeader}/>
      </div> */}
      {demand ? <DemandTable billNumber={billNumber}/>:<></>}
      {totalcollection ? <CollectionAmountTable billNumber={billNumber}/>:<></>}
      {rebate ? <RebateAmountTable billNumber={billNumber}/>:<></>}
      {closing ? <ClosingTable billNumber={billNumber}/>:<></>}

    </div>
  );
};

export default BillGenerate;
