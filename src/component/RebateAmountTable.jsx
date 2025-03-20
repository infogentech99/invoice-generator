import React, { useEffect, useState } from "react";

const RebateAmountTable = ({billNumber}) => {
    const [customerData, setCustomerData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const demandResponse = await fetch(
            `https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Reports/GetRebateDtls/${billNumber}`
          );
          if (!demandResponse.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await demandResponse.json();
          console.log(data);
          setCustomerData(data);
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, [billNumber]);
  return (
<>
      {/* Responsive Table Container */}
      {customerData && customerData.length > 0 ? (
        <div className="flex overflow-x-auto mt-6">
          <div className="bg-white shadow-lg rounded-lg p-8 min-w-full">
          <h2 className="text-2xl font-bold mb-4">Rebate Amount Details</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="border p-2 text-xs whitespace-nowrap">Bill Number</th>
                    {Object.keys(customerData[0]).map((header) => (
                      <th key={header} className="border p-2 text-xs whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customerData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{row.billNumber ?? "N/A"}</td>
                      {Object.keys(row).map((key) => (
                        <td
                          key={key}
                          className={`border px-4 py-2`}
                        >
                          {row[key] ?? "—"}
                          
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
        <p className="text-center mt-4 text-gray-500">No bill customerData found.</p>
      )}
</>
  );
};

export default RebateAmountTable;
