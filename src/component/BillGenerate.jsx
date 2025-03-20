import React, { useEffect, useState } from "react";

const BillGenerate = () => {
  const [formData, setFormData] = useState({
    RRNO: "",
    MDMeterReading: "",
    KWHMeterReading: "",
    KVAMeterReading: "",
    CurrentStatus: "",
    billingType: "",
  });
  const [status, setStatus] =useState(null);
  const [billInfo, setbillInfo] = useState(null);
 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Reports/GetMeterReadingStatus');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStatus(data);
        console.log(data);

      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Billing/GetMonthlyBillingData",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("submitted successfully!");
        setFormData({
          RRNO: "",
          MDMeterReading: "",
          KWHMeterReading: "",
          KVAMeterReading: "",
          CurrentStatus: "",
          billingType: "",
        });
        const data= await response.json();
        console.log(data);
      } else {
        alert("Failed to submit the data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting the data.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Meter Reading Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Submit Meter Readings</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                RRNO
              </label>
              <input
                type="text"
                name="RRNO"
                value={formData.RRNO}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                MD Meter Reading
              </label>
              <input
                type="number"
                name="MDMeterReading"
                value={formData.MDMeterReading}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                KWH Meter Reading
              </label>
              <input
                type="number"
                name="KWHMeterReading"
                value={formData.KWHMeterReading}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                KVA Meter Reading
              </label>
              <input
                type="number"
                name="KVAMeterReading"
                value={formData.KVAMeterReading}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
                <div>
      <label className="block text-gray-700 font-semibold mb-2">
        Current Status
      </label>
      <select
        name="CurrentStatus"
        value={formData.CurrentStatus}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
        required
      >
        <option value="" disabled>Select Status</option>
      {status ? status.map((statu)=>{
        return <option value={statu.meaterReadindStatusID}>{statu.meaterReadindStatusID}</option>
      }): <option value=""></option> }
      </select>
    </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Billing Type
              </label>
              <input
                type="text"
                name="billingType"
                value={formData.billingType}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit Readings
            </button>
          </form>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Bill Summary</h2>

          {/* First Section */}
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold">Customer Details</h3>
            <p>Name: John Doe</p>
          </div>
          {/* Second Section */}
          <div className="border-b pb-4 mb-4">
            <p>Subdivision: XYZ</p>
            <p>RRNO: 123456</p>
            <p>Customer ID: 987654321</p>
          </div>

          {/* Third Section */}
          <div className="border-b pb-4 mb-4">
            <p>Meter Constant: 1.5</p>
            <p>Date of Reading: 10 March 2025</p>
            <p>Bill Issue Date: 12 March 2025</p>
            <p>Bill No: 789654</p>
          </div>

          {/* Fourth Section */}
          <div className="border-b pb-4 mb-4">
            <p>Griha Jyoti Avg Eligible Units: 50</p>
            <p>Present Read: 1200</p>
            <p>Previous Read: 1100</p>
            <p>PF: 0.95</p>
            <p>Session Load: 5 KW</p>
            <p>Suspendual Eligible Units: 30</p>
            <p>Payable Unit: 100</p>
          </div>

          {/* Fifth Section */}
          <div className="border-b pb-4 mb-4">
            <p>Consumed Bill Order: ₹500</p>
            <p>Fix Charge: ₹50</p>
            <p>Energy Charge: ₹450</p>
            <p>Feasible Charge: ₹30</p>
            <p>Tax: ₹20</p>
            <p>Sub Total-I: ₹1050</p>
          </div>

          {/* Sixth Section */}
          <div className="border-b pb-4 mb-4">
            <p>Griha Jyoti Avg Charge: ₹200</p>
            <p>Fix Charge: ₹50</p>
            <p>Energy Charge: ₹300</p>
            <p>Feasible Charge: ₹25</p>
            <p>Tax: ₹15</p>
            <p>Sub Total-II: ₹590</p>
          </div>

          {/* Seventh Section */}
          <div className="border-b pb-4 mb-4">
            <p>Total: ₹1640</p>
            <p>PF: ₹30</p>
            <p>Interest: ₹10</p>
            <p>Other: ₹20</p>
            <p>Balance: ₹100</p>
          </div>

          {/* Eighth Section */}
          <div>
            <h3 className="text-lg font-semibold text-red-600">
              Total Payable Amount
            </h3>
            <p className="text-2xl font-bold">₹1800</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default BillGenerate;
