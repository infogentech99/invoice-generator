import React, { useRef, useState } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Bill = ({bill}) => {
  const billRef = useRef();

  const downloadPDF = async () => {
    const element = billRef.current;
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210; // A4 width in mm
    const margin = 10;
    const imgWidth = pdfWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", margin, margin, imgWidth, imgHeight);
    pdf.save(`Electricity_Bill_${bill.billNumber}.pdf`);
  };

  const openPDFInNewTab = async () => {
    const element = billRef.current;
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const margin = 10;
    const imgWidth = pdfWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", margin, margin, imgWidth, imgHeight);
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 
    ">
    <div className="max-w-5xl w-full bg-white rounded shadow-lg p-6">
    <div className="flex gap-4 mb-4">
          <button onClick={downloadPDF} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Download PDF
          </button>
          <button onClick={openPDFInNewTab} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Open in New Tab
          </button>
        </div>

        <div ref={billRef} className="text-sm bg-white p- w-full max-w-3xl mx-auto">
        <h1 className="text-xl font-bold text-center mb-2">Hubli Electricity Supply Company (HESCOM)</h1>
        <p className="text-center ">(Wholly owned Government of Karnataka Undertaking) GSTIN No-29AABCH3176JEZZ</p>
        <p className="text-center mb-4">Office Of The Assistant Executive Engineer (Ele..),C(O&M), Subdivision: {bill.subdivisionOfficeName ?? 'N/A'}</p>

        <div className="grid grid-cols-3 gap-2 mb-2">
            <div>
            <p><strong>Name: </strong> {bill.customerName}</p>
            <p><strong>Address: </strong>{bill.address1 ?? 'N/A'}</p>
            </div>
            <div>
            <p><strong>RR No:</strong> {bill.rrno}</p>
          <p><strong>Connection ID:</strong> {bill.connectionID}</p>
          <p><strong>Tariff:</strong> {bill.tarrifTypeId}</p>
          <p><strong>Bill No:</strong> {bill.billNumber}</p>
            </div>
            <div>
          <p className="text-nowrap"><strong>Billing Period:</strong> {bill.billDate.split("T")[0]} to {bill.dueDate.split("T")[0]}</p>
          <p><strong>Bill Date:</strong> {bill.billDate.split("T")[0]}</p>
          <p><strong>Due Date:</strong> {bill.dueDate.split("T")[0]}</p>

            </div>
        </div>

        <hr className="my-2" />

        {/* Meter Reading Details */}
        <table className="table-auto w-full text-sm border border-black">
  <thead>
    <tr>
      <th colSpan="4" className="border border-black text-center font-semibold p-1">
       Meter Reading Details
      </th>
    </tr>
    <tr>
      <th className="border border-black p-1">Details</th>
      <th className="border border-black p-1">MD Meter</th>
      <th className="border border-black p-1">KWH Meter</th>
      <th className="border border-black p-1">KVAH</th>
      <th className="border border-black p-1">PF</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-black p-1">Present Reading : {bill.billDate.split("T")[0]}</td>
      <td className="border border-black p-1">{bill.mdMeterReading}</td>
      <td className="border border-black p-1"> {bill.kwhMetereading} </td>
      <td className="border border-black p-1">{bill.kvaMeterReading}</td>
      <td className="border border-black p-1">{bill.PFLag ?? 'N/A'}</td> 
    </tr>
    <tr>
      <td className="border border-black p-1">Previous Reading : {bill.prevbilldate ? bill.prevbilldate.split("T")[0] : 'N/A'}</td>
      <td className="border border-black p-1">{bill.mdMeterPrevReading}</td>
      <td className="border border-black p-1">{bill.kwhMeterPrevReading}</td>
      <td className="border border-black p-1">{bill.kvaMeterPrevReading}</td>
    </tr>
    <tr>
      <td className="border border-black p-1">Difference</td>
      <td className="border border-black p-1">{bill.mdMeterDifference}</td>
      <td className="border border-black p-1">{bill.kwHeterDifference}</td>
      <td className="border border-black p-1">{bill.kvaMeterDifference}</td>
    </tr>
    <tr>
      <td className="border border-black p-1">Meter Constant</td>
      <td className="border border-black p-1">{bill.meterConstant}</td>
      <td className="border border-black p-1">{bill.meterConstant}</td>
      <td className="border border-black p-1"></td>
    </tr>
    <tr>
      <td className="border border-black p-1">Consumption</td>
      <td className="border border-black p-1">{bill.mdConsumption}</td>
      <td className="border border-black p-1">{bill.kwhConsuption}</td>
      <td className="border border-black p-1">{bill.kvaConsuption}</td>
    </tr>
    <tr>
      <td className="border border-black p-1">Total Billed Units</td>
      <td className="border border-black p-1">{bill.mdConsumption}</td>
      <td className="border border-black p-1">{bill.kwhConsuption}</td>
      <td className="border border-black p-1"></td>

    </tr>
    <tr>
      <td className="border border-black p-1">GJ subsidy Units</td>
      <td className="border border-black p-1">{bill.mdConsumption}</td>
      <td className="border border-black p-1">{bill.kwhConsuption}</td>
      <td className="border border-black p-1"></td>

    </tr>
  </tbody>
</table>

<div className="grid grid-cols-2 gap-2 ">
  {/* Row 1, Col 1 */}
  <div className="">
    {/* Present Month Billing  */}
<table className="table-auto w-full text-sm border border-black my-2">
  <thead>
    <tr>
      <th colSpan="4" className="border border-black text-center font-semibold p-1">
       Present Month Billing
      </th>
    </tr>
    <tr>
      <th className="border border-black p-1">Details</th>
      <th className="border border-black p-1">Units</th>
      <th className="border border-black p-1">Rate</th>
      <th className="border border-black p-1">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-black p-1">Fc Slab 1</td>
      <td className="border border-black p-1">{bill.mdConsuptionSlab1}</td>
      <td className="border border-black p-1">{bill.fcSlab1Price}</td>
      <td className="border border-black p-1">{bill.fcSlab2Price}</td>
    </tr>
    <tr>
      <td className="border border-black p-1">FC slab 2</td>
      <td className="border border-black p-1">{bill.mdConsuptionSlab2} </td>
      <td className="border border-black p-1">{bill.fcSlab2Price}</td>
      <td className="border border-black p-1">{bill.fcSlab2}</td>
    </tr>
    <tr>
      <td className="border border-black p-1">Energy Charge</td>
      <td className="border border-black p-1">{bill.energyCharge}</td>
      <td className="border border-black p-1">{bill.ecPrice}</td>
      <td className="border border-black p-1">{bill.energyCharge}</td>
    </tr>
    <tr>
      <td className="border border-black p-1">FAC</td>
      <td className="border border-black p-1">{bill.fac}</td>
      <td className="border border-black p-1">{bill.facPrice}</td>
      <td className="border border-black p-1">{bill.fac}</td>
    </tr>
    <tr>
      <td className="border border-black p-1">Tax (9% EC)</td>
      <td className="border border-black p-1">{bill.tax}</td>
      <td className="border border-black p-1">{bill.taxPrice}</td>
      <td className="border border-black p-1">{bill.tax}</td>
    </tr>
    <tr>
      <td colSpan="3" className="border border-black p-1"></td>
      <td className="border border-black p-1">Total = {bill.fcSlab2Price + bill.fcSlab2 + bill.energyCharge + bill.fac + bill.tax}</td>
    </tr>
  </tbody>
</table>
  </div>

  {/* Col 2 spanning 2 rows */}
  <div className="row-span-2  ">
    {/* Additional Charge  */}
<table className="table-auto w-full text-sm border border-black my-2 ">
  <thead>
    <tr>
      <th colSpan="2" className="border border-black text-center font-semibold p-1">
        Additional Charge
      </th>
    </tr>
  </thead>
  <tbody >
    <tr>
      <td className="border border-black p-1 font-semibold">PF penalty</td>
      <td className="border border-black p-1">{bill.pfPenalty}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold">MD penalty</td>
      <td className="border border-black p-1">{bill.mdPenalty}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold">CGST</td>
      <td className="border border-black p-1">{bill.cgst}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold">SGST</td>
      <td className="border border-black p-1">{bill.sgst}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold">SubMeter EC</td>
      <td className="border border-black p-1">{bill.submetereEnergyCharge}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold">Net TOD Charges</td>
      <td className="border border-black p-1">{bill.netTODCharges}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold">D & R Fees</td>
      <td className="border border-black p-1">{bill.drFees}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold">Misc Charges / Tax Short Claim</td>
      <td className="border border-black p-1">{bill.miscCharges}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold">Credit / Adjustment</td>
      <td className="border border-black p-1">{bill.cads}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold">Aadit Short Claim</td>
      <td className="border border-black p-1">{bill.asc}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold">Rebate / Discount / Prompt Payment</td>
      <td className="border border-black p-1">{bill.rebate}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold">Total</td>
      <td className="border border-black p-1">{bill.othersTotal}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold">Round Off</td>
      <td className="border border-black p-1">{bill.roundOff}</td>
    </tr>
    <tr>
      <td className="border border-black p-1 font-semibold  ">Bill Amount</td>
      <td className="border border-black p-1 ">{bill.billAmount1}</td>
    </tr>
  </tbody>
</table>
  </div>

  {/* Row 2, Col 1 */}
  <div className="">
    
{/* Graha Jyoti Subsidy */}

<table className="table-auto w-full text-sm border border-black">
  <thead>
    <tr>
      <th colSpan="4" className="border border-black text-center font-semibold p-1">
      Graha Jyoti Subsidy
      </th>
    </tr>
    <tr>
      <th className="border border-black p-1">Details</th>
      <th className="border border-black p-1">Units</th>
      <th className="border border-black p-1">Rate</th>
      <th className="border border-black p-1">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-black p-1">Fc Slab 1</td>
      <td className="border border-black p-1">{bill.subMDConsuptionSlab1}</td>
      <td className="border border-black p-1">{bill.subFCSlab1}</td>
      <td className="border border-black p-1">{bill.subFCSlab1}</td>
    </tr>
    <tr>
      <td className="border border-black p-1">FC slab 2</td>
      <td className="border border-black p-1">{bill.subMDConsuptionSlab2} </td>
      <td className="border border-black p-1">{bill.subFCSlab2Price}</td>
      <td className="border border-black p-1">{bill.subFCSlab2}</td>
    </tr>
    <tr>
      <td className="border border-black p-1">Energy Charge</td>
      <td className="border border-black p-1">{bill.subEnergyCharge}</td>
      <td className="border border-black p-1">{bill.subEcPrice}</td>
      <td className="border border-black p-1">{bill.subEnergyCharge}</td>
    </tr>
    <tr>
      <td className="border border-black p-1">FAC</td>
      <td className="border border-black p-1">{bill.subFAC}</td>
      <td className="border border-black p-1">{bill.subFACPrice}</td>
      <td className="border border-black p-1">{bill.subFAC}</td>
    </tr>
    <tr>
      <td className="border border-black p-1">Tax (9% EC)</td>
      <td className="border border-black p-1">{bill.subTax}</td>
      <td className="border border-black p-1">{bill.subTaxPrice}</td>
      <td className="border border-black p-1">{bill.subTax}</td>
    </tr>
    <tr>
      <td colSpan="3" className="border border-black p-1"></td>
      <td className="border border-black p-1">SubTotal = {bill.subFCSlab1 + bill.subFCSlab2 + bill.subEnergyCharge + bill.subFAC + bill.subTax}</td>
    </tr>
  </tbody>
</table>
  </div>
</div>





{/* Details of Arrears  */}

<table className="table-auto w-full text-sm border border-black my-2">
  <thead>
    <tr>
      <th colSpan="14" className="border border-black text-center font-semibold p-1">
      Details of Arrears 
      </th>
    </tr>
    <tr>
      <th className="border border-black p-1">Revenue</th>
      <th className="border border-black p-1">Tax</th>
      <th className="border border-black p-1">Interest on Revenue</th>
      <th className="border border-black p-1">Interest on Tax</th>
      <th className="border border-black p-1">Total Arrears</th>
      <th className="border border-black p-1">Total Bill Amount</th>
      <th className="border border-black p-1">Net Amount Payable</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-black p-1">{bill.revnueArrears}</td>
      <td className="border border-black p-1">{bill.taxArrear}</td>
      <td className="border border-black p-1">{bill.revenueInterest}</td>
      <td className="border border-black p-1">{bill.taxInterest}</td>
      <td className="border border-black p-1">{bill.totalArrear}</td>
      <td className="border border-black p-1">{bill.totalBillAmount}</td>
      <td className="border border-black p-1">{bill.netAmountPayble}</td>


    </tr>
  </tbody>
</table> 

      </div>
    </div>
  </div>
  );
};

export default Bill;
