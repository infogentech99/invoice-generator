import React, { useState, useEffect } from 'react';
import ErrorPage from './ErrorPage';

const CustomerInfo = () => {
  let [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Billing/GetCustomerMasterData/dwd99');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomerData(data[0]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <ErrorPage message={error.message}/>;
  } 
  return (
    <>
   <div className="flex w-full h-screen ">
  {customerData ? (
    <div className="bg-white  p-8 w-full ">
      <h2 className="text-2xl font-bold text-center mb-4">Customer Information</h2>
      <p className="text-lg text-center"><strong>Name:</strong> {customerData.applicantName ? customerData.applicantName : 'Customer Name'}</p>
      <p className="text-lg text-center"><strong>Tariff Type ID:</strong> {customerData.tarrifTypeId ? customerData.tarrifTypeId : 'No'}</p>
    </div>
  ) : (
    <p>fetching the data...</p>
  )}
</div>

  </>
  );
};

export default CustomerInfo;




{/* <td
                          key={col}
                          className="border p-2 text-xs whitespace-nowrap text-blue-500 hover:underline cursor-pointer"
                          onClick={() => handleColumnClick(row.billNumber, col)}
                        >
                          {row[col] ?? "N/A"}
                        </td> */}