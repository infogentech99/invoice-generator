import React, { useEffect, useState , useRef} from "react";
import Bill from "./Bill";
const BillGenerate = () => {
  const [formData, setFormData] = useState({
    RRNO: "",
    MDMeterReading: "",
    KWHMetereading: "",
    KVAMeterReading: "",
    CurrentStatus: "",
    billingType: "",
    pfLag : Number
  });
  const [status, setStatus] =useState(null);
  const [bill, setbill] = useState({
    rrno: "DN999",
    connectionID: "28180826",
    tarrifTypeId: "LT1",
    billNumber: "202411281510592001",
    billDate: "2024-11-28",
    dueDate: "2024-12-17",
    disconnectionDate: "2024-12-27",
    name: "K Y KULAKARNI",
    address: "SODWAD, SODWAD",
    sanctionedLoad: 0.36,
    loadType: "KW/HP/MD",
    recordedMD: 0.1,
    status: "Connected",
    gyDate: "2023-07-04",
    gyAvg: 69,
    gyEntitlement: 76,
    readingDate: "2024-11-01",
    prevReading: 0,
    presReading: 4254,
    mdReading: 0.1,
    kwhReading: 416,
    kvahReading: 0,
    pf: 0.85,
    difference: 0,
    meterConstant: 1,
    consumption: 93,
    energyCharges: 93,
    facUnits: 93,
    subsidyUnits: 17,
    chargeableUnits: 76,
    slab1Units: 0.36,
    slab1Rate: 120,
    slab1Amount: 120,
    slab2Units: 0,
    slab2Rate: 210,
    slab2Amount: 0,
    energyRate: 5.9,
    energyAmount: 548.57,
    ruralRebate: 0,
    sgst: 0,
    fixedChargeUnits: 93,
    fixedChargeRate: 0.09,
    fixedChargeAmount: 8.37,
    netTODCharges: 49.33,
    mdPenalty: 0,
    pfPenalty: 0,
    solarRebate: 0,
    otherPenalty: 0,
    roundOff: -0.09,
    totalAmount: 726.45,
    bsrFees: 0,
    miscCharges: 0,
    creditAdjustment: 0,
    auditShortClaim: 0,
    rebate: 0,
    discount: 0,
    promptPayment: 0,
    totalOthers: 0,
    gyUnits: 76,
    gyRate: 0.64,
    gyAmount: 48.64,
    totalBillAmount: 111,
    energyChargesSubsidy: 40.36
  });

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Reports/GetMeterReadingStatus');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStatus(data);
        console.log("Bill data" ,data);

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
      const response = await fetch("http://localhost:4000/Billing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        setbill(data); 
        alert("Submitted successfully!");
      } else {
        alert("Failed to submit the data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting the data.");
    }
  };
  

  return (
    <div className=" justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Meter Reading Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Submit Meter Readings</h2>
          <form onSubmit={handleSubmit} className="">
            <div className="space-y-4 grid grid-cols-3 space-x-4">
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
                name="KWHMetereading"
                value={formData.KWHMetereading}
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

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                pfLag
              </label>
              <input
                type="text"
                name="pfLag"
                value={formData.pfLag}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500 mb-2"
                required
              />
            </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit Readings
            </button>
          </form>
        </div>

    </div>


        {bill && <Bill bill={bill}/>}
      </div>
  );
};


export default BillGenerate;
{/* Bill Generation Section */}
{/* {bill && <Bill bill={bill}/>} */}