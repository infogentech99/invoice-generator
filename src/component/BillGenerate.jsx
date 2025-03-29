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
  const [bill, setbill] = useState({"rrno":"NGR46400","customerName":"A V Gundappa","connectionID":"534135","sanctionedLoadKW":100,"tarrifTypeId":"LT-1","billNumber":"254875165565","billDate":"2025-03-29T05:05:42.9495746Z","dueDate":"2025-03-29T05:05:42.9496009Z","prevReading":100,"presReading":100,"recordedMDConsumption":100,"subsidyEligibleUntis":100,"mdConsumption":100,"meterConstant":100,"fcSlab1":100,"fcSlab2":100,"energyCharge":100,"fac":100,"tax":100,"pfPenalty":100,"mdPenalty":100,"cgst":100,"sgst":100,"submetereEnergyCharge":100,"roundOff":100,"dandRFees":100,"miscChargesOrTaxShortClaim":100,"creditOrAdjustments":100,"auditShortClaim":100,"rebate":100,"shortClaim":100,"discount":100,"promptPayment":100,"subsidyFCSlab1":100,"subsidyFCSlab2":100,"subsidyEnergyCharge":100,"subsidyFAC":100,"subsidyTax":100,"totalSubsidy":100,"totalDemand":100,"revnueArrears":100,"taxInterest":100,"revenueInterest":100,"revenueOB":100,"taxOB":100,"interestOB":100,"arrearsTotal":100,"netPaybleByConsumer":100,"fcCharges":100,"mdMeterPrevReading":100,"mdMeterReading":100,"mdMeterDifference":100,"kwhMeterPrevReading":100,"kwhMetereading":100,"kwhConsuption":100,"kwHeterDifference":100,"kvaMeterPrevReading":100,"kvaMeterReading":100,"kvaConsuption":100,"mdConsuptionSlab1":100,"mdConsuptionSlab2":100,"kvaMeterDifference":100,"subMDConsuptionSlab1":100,"subMDConsuptionSlab2":100,"fcSlab1Price":100,"fcSlab2Price":100,"subFCSlab1Price":100,"subFCSlab2Price":100,"ecPrice":100,"facPrice":100,"taxPrice":100,"subEcPrice":100,"subFACPrice":100,"subTaxPrice":100,"subFCSlab1":100,"subFCSlab2":100,"subEnergyCharge":100,"subFAC":100,"subTax":100,"netTODCharges":100,"drFees":100,"miscCharges":100,"cads":100,"asc":100,"othersTotal":100,"billAmount1":100,"taxArrear":100,"totalArrear":100,"totalBillAmount":100,"netAmountPayble":100});

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Reports/GetMeterReadingStatus');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStatus(data);

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
      const response = await fetch("https://customertransactionapi20250312083911-fvcvh5d8c5fdbths.centralus-01.azurewebsites.net/api/Billing", {
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
    <div className="  min-h-screen bg-gray-100 p-4">
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