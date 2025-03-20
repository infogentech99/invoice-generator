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
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Penalty Amount Details</h2>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              {[
                "PenaltyTransID",
                "PenaltyTypeID",
                "PenaltyName",
                "PenaltyDescription",
                "ConnectionID",
                "RRNO",
                "TarrifTypeId",
                "PenaltyAmount",
              ].map((header) => (
                <th key={header} className="border p-2 text-xs whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {penaltyData.map((row, index) => (
              <tr key={index} className="border">
                {Object.entries(row).map(([key, value]) => (
                  <td key={key} className="border p-2 text-xs whitespace-nowrap">
                    {typeof value === "string" && value.startsWith("PEN") ? (
                      <button className="text-blue-500 underline">{value}</button>
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
  );
};

export default PenaltyAmountTable;
