import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const RebateAmountTable = () => {
    const { billNumber } = useOutletContext(); 
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const demandResponse = await fetch(
          `https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Reports/GetRebateDtls/${billNumber}`
        );
        if (!demandResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await demandResponse.json();
        setCustomerData([data]);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [billNumber]);

  return (
    <>
    {customerData && customerData.length > 0 ? (
      <div className=" bg-blue-100 shadow-lg rounded-lg">

        <div className="w-full overflow-x-auto">
          <table className="w-full border border-gray-300 table-auto text-sm">
            <thead className="bg-blue-100">
              <tr>
                {Object.keys(customerData[0]).map((header) => (
                  <th key={header} className="p-3 border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customerData.map((row, index) => (
                <tr key={index} className="odd:bg-blue-100 even:bg-blue-100">
                  {Object.keys(row).map((key) => (
                    <td key={key} className="p-3 border">
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
      <p className="text-center mt-4 text-gray-500">
        No data found for this bill.
      </p>
    )}
  </>
  );
};

export default RebateAmountTable;
