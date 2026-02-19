import { useState, useEffect } from "react";
import apartmentImg from "../src/Uploads/manson-street-vancouver.webp";

const VacatingForm = () => {
  const [vacatingDetails, setVacatingDetails] = useState(null);
  const [vacateDate, setVacateDate] = useState("");
  const [isPending, setIsPending] = useState(false); // To track if a request already exists
  const [isApproved, setIsApproved] = useState(false); // To track if a request is approved
  const [isDeclined, setIsDeclined] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDetails = async () => {
      try {
        const res = await fetch('/api/vacatingForm/details', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        
        setVacatingDetails(data);
{/*-----Checking when the status is pending------ */}
        setIsPending(data.hasPending || false); // If hasPending is true, set isPending to true otherwise false.
{/*-----Checking if status is Approved------- */}
        setIsApproved(data.hasApproved || false);
{/*-----Checking when status is declined------- */}
        setIsDeclined(data.hasDeclined || false);

        
        // If the backend returns hasPending: true, lock the form
       {/*if (data.hasPending) {
          setIsPending(true);
        }

      
        if (data.hasApproved) {
          setIsApproved(true);
        }
      
        if (data.hasDeclined) {
          setIsDeclined(true);
        } */}
   
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchDetails();
  }, []);

  const isDisabled = isPending || isApproved

  const submitVacating = async (e) => {
    e.preventDefault();
    if (!vacateDate) return alert("Please select a date.");

    const token = localStorage.getItem("token");
    const res = await fetch('/api/vacatingForm/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        house_id: vacatingDetails.house_id,
        vacate_date: vacateDate
      })
    });

    if (res.ok) {
      setIsPending(true); // Lock the UI after successful submit
      setIsDeclined(false);
      alert("Vacating request submitted successfully!");
    } else {
      const errorData = await res.json();
      alert(errorData.message);
    }
  };

  if (!vacatingDetails) return <p className="p-10 text-center">Loading details...</p>;

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img className="absolute inset-0 w-full h-full object-cover" src={apartmentImg} alt="Apartment" />
      
      {/* Form Container */}
      <div className="relative z-10 w-full h-full inset-0 bg-black/40 flex items-center justify-center">

        <form onSubmit={submitVacating} className="flex flex-col gap-4 shadow-2xl p-8 rounded-lg bg-gray-900/90 text-white w-full max-w-150 border border-gray-700 max-h-[90vh] overflow-y-auto">

          <h2 className="text-2xl font-bold text-center mb-2">Vacating Notice</h2>
          <p className="text-gray-400 text-sm text-center mb-4">Please confirm your details and select a moving date before you submit the notice.</p>

          {/* Status Alert if already submitted */}
          {isPending && (
            <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-800 p-3 mb-2 rounded text-sm font-semibold">
              ⚠️ You have a pending vacating notice. An admin is currently reviewing it.
            </div>
          )}

{/*--------Status alert if the submitted notice is approved------- */}
          {isApproved && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-3 mb-2 rounded text-sm font-semibold">
               Your vacating notice has been approved.
            </div>
          )}
{/*-----Status alert when the notice is declined-------- */}
          {isDeclined && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-3 mb-2 rounded text-sm font-semibold">
              Your vacating notice has been declined.
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase font-bold">Full Name</label>
            <input value={vacatingDetails.full_name} readOnly className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase font-bold">Property Name</label>
            <input value={vacatingDetails.property_name} readOnly className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
          </div>

          <div className = "flex flex-col gap-1">
             <label className="text-xs text-gray-400 uppercase font-bold">House Type</label>
             <input value={vacatingDetails.house_type} readOnly className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
          </div>

          <div className ="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase font-bold">House Number</label>
            <input value={vacatingDetails.house_number} readOnly className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase font-bold">Pick Vacating Date</label>
            <input 
              type="date" 
              value={vacateDate} 
              disabled={isDisabled} // Lock the date picker when status is pending or approved.
              onChange={(e) => setVacateDate(e.target.value)} 
              className={`p-2 rounded text-black border-2 outline-none ${isDisabled ? 'bg-gray-300' : 'border-blue-500 bg-white'}`} 
            />
          </div>

          <button 
            type="submit" 
            disabled={isDisabled}
            className={`mt-4 p-3 rounded-md font-bold text-white transition-all ${
              isDisabled ? "bg-gray-600 cursor-not-allowed opacity-50" 
              : "bg-blue-600 hover:bg-blue-700 shadow-lg active:scale-95"
            }`}
          >
            {isPending ? "Notice Already Sent" : isApproved ? "Notice Approved" : "Submit Notice"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VacatingForm;