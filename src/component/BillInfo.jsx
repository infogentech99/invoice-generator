import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DemandTable from "./DemandTable";
import RebateAmountTable from "./RebateAmountTable";
import CollectionAmountTable from "./CollectionAmountTable";
import ClosingTable from "./ClosingTable";

const BillGenerate = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const [billNumber, setBillNumber] = useState(null);
  const [history, setHistory] = useState(null);
  const [demand, setDemand] = useState(false);
  const [totalCollection, setTotalCollection] = useState(false);
  const [rebate, setRebate] = useState(false);
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    RRNO: "",
    ConnectionID: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = formData.RRNO.trim() !== "" || formData.ConnectionID.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const identifier = formData.ConnectionID || formData.RRNO;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Billing/GetCustomerMasterData/${identifier}`
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
      setHistory(historyData.length > 0 ? historyData : []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const linkableColumns = {
    rebateAmount: "rebate",
    demand: "demand",
    totalCollection: "totalCollection",
    closingBalance: "closing",
  };

  const handleColumnClick = (billNum, columnKey) => {
    setRebate(columnKey === "rebateAmount");
    setClosing(columnKey === "closingBalance");
    setTotalCollection(columnKey === "totalCollection");
    setDemand(columnKey === "demand");
    setBillNumber(billNum);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Find Customer</h2>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">RRNO</label>
            <input
              type="text"
              name="RRNO"
              value={formData.RRNO}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="text-center text-gray-500 font-semibold mb-4">or</div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Connection ID</label>
            <input
              type="text"
              name="ConnectionID"
              value={formData.ConnectionID}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              isFormValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </form>

        {customerData && (
          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">Customer Info</h2>
            <div className="space-y-3">
              <p className="flex justify-between"><span className="text-gray-600">Name:</span> <span>{customerData.applicantName || "N/A"}</span></p>
              <p className="flex justify-between"><span className="text-gray-600">Address:</span> <span>{customerData.address || "N/A"}</span></p>
              <p className="flex justify-between"><span className="text-gray-600">Division:</span> <span>{customerData.division || "N/A"}</span></p>
              <p className="flex justify-between"><span className="text-gray-600">SubDivision:</span> <span>{customerData.subDivision || "N/A"}</span></p>
            </div>
          </div>
        )}
      </div>

      {history && history.length > 0 && (
        <div className="mt-6 bg-white shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-2xl font-bold text-center py-4 bg-blue-500 text-white">Bill Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm">
                  <th className="p-3 border">Bill Number</th>
                  {Object.keys(history[0]).map((header) => (
                    <th key={header} className="p-3 border">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((row, index) => (
                  <tr key={index} className="text-gray-700 text-sm odd:bg-gray-100 even:bg-white">
                    <td className="p-3 border">{row.billNumber ?? "N/A"}</td>
                    {Object.keys(row).map((key) => (
                      <td key={key} className={`p-3 border ${linkableColumns[key] ? "text-blue-500 hover:underline cursor-pointer" : ""}`}>
                        {linkableColumns[key] ? (
                          <button onClick={() => handleColumnClick(row.billNumber, key)}>
                            {row[key] ?? "—"}
                          </button>
                        ) : (
                          row[key] ?? "—"
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {demand && <DemandTable billNumber={billNumber} />}
      {totalCollection && <CollectionAmountTable billNumber={billNumber} />}
      {rebate && <RebateAmountTable billNumber={billNumber} />}
      {closing && <ClosingTable billNumber={billNumber} />}
    </div>
  );
};

export default BillGenerate;
