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
  const [bill, setbill] = useState(null);

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
      <div className="grid grid-cols-1  gap-8  w-full mt-4">
        {/* Meter Reading Form Section */}
        <div className="flex justify-center items-center  bg-gray-100 px-4  mx-auto ">
  <div className=" bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-5xl">
    <h2 className="text-2xl font-bold mb-6 whitespace-nowrap text-center">Submit Meter Readings</h2>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2 whitespace-nowrap">
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
          <label className="block text-gray-700 font-semibold mb-2 whitespace-nowrap">
            MDMeter Reading
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
          <label className="block text-gray-700 font-semibold mb-2 whitespace-nowrap">
            KWHMeter Reading
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
          <label className="block text-gray-700 font-semibold mb-2 whitespace-nowrap">
            KVAMeter Reading
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
          <label className="block text-gray-700 font-semibold mb-2 whitespace-nowrap">
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
            {status ? status.map((statu) => (
              <option key={statu.meaterReadindStatusID} value={statu.meaterReadindStatusID}>
                {statu.meaterReadindStatusID}
              </option>
            )) : <option value="">Loading...</option>}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2 whitespace-nowrap">
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
          <label className="block text-gray-700 font-semibold mb-2 whitespace-nowrap">
            pfLag
          </label>
          <input
            type="text"
            name="pfLag"
            value={formData.pfLag}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Submit Readings
      </button>
    </form>
  </div>
</div>


    </div>


        {bill && <Bill bill={bill}/>}
      </div>
  );
};


export default BillGenerate;
{/* Bill Generation Section */}
{/* {bill && <Bill bill={bill}/>} */}