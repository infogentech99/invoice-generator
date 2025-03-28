import React from "react";

const PenaltyAmountTable = () => {
  const penaltyData = [
    {
      PenaltyTransID: "PEN001",
      PenaltyTypeID: "PT123",
      PenaltyName: "Late Fee",
      PenaltyDescription: "Penalty for late payment",
      ConnectionID: "CON5678",
      RRNO: "RR9876",
      TarrifTypeId: "TAR789",
      PenaltyAmount: "₹500",
    },
    {
      PenaltyTransID: "PEN002",
      PenaltyTypeID: "PT124",
      PenaltyName: "Overusage",
      PenaltyDescription: "Penalty for exceeding limits",
      ConnectionID: "CON9876",
      RRNO: "RR1234",
      TarrifTypeId: "TAR456",
      PenaltyAmount: "₹700",
    },
    // Add more rows dynamically
  ];

  return (
    <>
      {penaltyData && penaltyData.length > 0 ? (
        <div className=" bg-white shadow-lg rounded-lg">

          <div className="w-full overflow-x-auto">
            <table className="w-full border border-gray-300 table-auto text-sm">
              <thead className="bg-gray-200">
                <tr>
                  {Object.keys(penaltyData[0]).map((header) => (
                    <th key={header} className="p-3 border whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {penaltyData.map((row, index) => (
                  <tr key={index} className="odd:bg-gray-100 even:bg-white">
                    {Object.entries(row).map(([key, value]) => (
                      <td key={key} className="p-3 border whitespace-nowrap">
                        {typeof value === "string" && value.startsWith("PEN") ? (
                          <button className="text-blue-500 hover:underline">
                            {value}
                          </button>
                        ) : (
                          value
                        )}
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
          No penalty data available.
        </p>
      )}
    </>
  );
};

export default PenaltyAmountTable;
