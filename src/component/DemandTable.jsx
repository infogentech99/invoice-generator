import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const DemandTable = () => {
  const { billNumber } = useOutletContext(); 
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Reports/GetDemandDetails/${billNumber}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log("Demand Data:", data);
        setCustomerData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [billNumber]);

  return (
    <>
      {customerData && customerData.length > 0 ? (
        <div className=" bg-white shadow-lg rounded-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full border border-gray-300 table-auto text-sm">
              <thead className="bg-gray-200">
                <tr>
                  {Object.keys(customerData[0]).map((header) => (
                    <th key={header} className="p-3 border whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customerData.map((row, index) => (
                  <tr key={index} className="odd:bg-gray-100 even:bg-white">
                    {Object.keys(row).map((key) => (
                      <td key={key} className="p-3 border whitespace-nowrap">
                        {row[key] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-500">No  data found.</p>
      )}
    </>
  );
};

export default DemandTable;
