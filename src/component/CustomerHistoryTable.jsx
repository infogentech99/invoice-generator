import { useOutletContext } from "react-router-dom";
const CustomerHistoryTable = () => {
  const { history,selectedBillIndex,setSelectedBillIndex,setBillNumber } = useOutletContext(); 
  return (
    <>
    {history && history.length > 0 && (
            <div className=" bg-blue-100 shadow-lg rounded-lg">
              <div className="w-full overflow-x-auto">
                <table className="w-full border border-gray-300 table-auto text-sm">
                  <thead className="bg-blue-100">
                    <tr>
                    <th className="p-3 border">Select</th>
                      {Object.keys(history[0]).map((header) => (
                        <th key={header} className="p-3 border">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((row, index) => (
                      <tr key={index} className="odd:bg-blue-100 even:bg-blue-100">
                                        <td className="p-3 border text-center"
                                        key={row.billNumber}
                                        >
                            <input
                              type="checkbox"
                              checked={selectedBillIndex === index}
                              onChange={() => {
                                setSelectedBillIndex(index);
                                setBillNumber(row.billNumber);
                              }}
                            />
                        </td>
                        {Object.keys(row).map((key) => (
                          <td
                            key={key}
                            className={`p-3 border`}
                          >
                            {row[key] ?? '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
    </>
  );
};

export default CustomerHistoryTable;
