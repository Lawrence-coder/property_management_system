import { useState, useEffect } from 'react';
import apartmentImg from "../src/Uploads/manson-street-vancouver.webp";

const RentPayment = () => {
const [rentPaymentDetails, setRentPaymentDetails ] = useState(null); //state to hold rent payment details fetched from backend
const [file, setFile ] = useState(null); //state to hold the path of the uploaded receipt

useEffect(() => { //the purpose of useEffecct is to fetch data from the backend when the component mounts
const token = localStorage.getItem("token");


   const fetchRentPaymentDetails = async () => {
   const res = await fetch("/api/rentPayment", {
     headers: {
      Authorization: `Bearer ${token}`
     }
   }); 
   //console.log("TOKEN:", token);
   const data = await res.json(); //fetch the data from the backend
   setRentPaymentDetails(data); 
  };
  fetchRentPaymentDetails(); 
}, []); //empty dependency array means this effect runs only once when the component mounts 

if (!rentPaymentDetails) return <p>Rent payment details loading....</p>

const submitPayment = async (e) => {
  const token = localStorage.getItem("token");
  e.preventDefault();

  const formData = new FormData(); //create a new FormData object to hold the form data including the file
  formData.append("house_id", rentPaymentDetails.house_id); //append means to add key-value pairs to the FormData object which means we are adding the house_id, amount and receipt file to the form data
  formData.append("amount", rentPaymentDetails.amount);
  formData.append("receipt", file);
  await fetch("/api/rentPayment", {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  }).then((res) => res.json())
    .then((data) => {
      alert(data.message || "Payment submitted successfully.");
  });
};

return (
    <div className="relative w-full h-screen">
      <img className="absolute inset-0 w-full h-full object-cover" src={apartmentImg} alt="Rent Payment Form" />

     <div className="relative z-10 w-full h-full inset-0 bg-black/40 flex items-center justify-center">

      <form onSubmit={submitPayment} className="flex flex-col gap-4 shadow-2xl p-8 rounded-lg bg-gray-900/90 text-white w-full max-w-150 border border-gray-700 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-2">Rent Payment</h2>
        <p className="text-gray-400 text-sm text-center mb-4">Please confirm your details before submitting the payment.</p>

        <div className="flex flex-col gap-1">
         <label className="text-xs text-gray-400 uppercase font-bold">Property Name</label>
         <input value={rentPaymentDetails.property_name} readOnly className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
        </div>
        
        <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 uppercase font-bold">House Type</label>
        <input value={rentPaymentDetails.house_type} readOnly className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
        </div>

        <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 uppercase font-bold">House Number</label>
        <input value={rentPaymentDetails.house_number} readOnly className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
        </div>

        <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 uppercase font-bold">Rent Amount(Ksh)</label>
        <input type="String"
          value={rentPaymentDetails.amount} readOnly
         className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400"
        />
        </div>
      
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase font-bold">Add the Receipt here</label>
        <input type="file"
         onChange={(e) => setFile(e.target.files[0])} className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400" />
         </div>

        <button className="border-2 p-2 rounded bg-blue-950 hover:bg-blue-700 hover:text-gray-300" type="submit">Submit Payment</button>
      </form>
      </div>
    </div>
  );

}

export default RentPayment;