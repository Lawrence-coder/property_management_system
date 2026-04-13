import { useState, useEffect } from "react";
import apartmentImg from "../src/Uploads/manson-street-vancouver.webp";

const MaintenanceRequests = () => {
  const [tenantInfo, setTenantInfo] = useState({});
  const [issue, setIssue] = useState({
    issue_description: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  useEffect(() => {
    const fetchTenantInfo = async () => {

      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:3000/api/issues/tenant-info", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setTenantInfo(data);
        setIsPending(data.hasPending || false);
        setIsInProgress(data.hasInProgress || false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTenantInfo();
  }, []);

  {/*--------Function to handle marking the issue as resolved and notifying the admin------*/}
  const handleResolve = async (maintenance_requestsid, status) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:3000/api/issues/resolve/${maintenance_requestsid}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Issue marked as resolved. Admin notified.");
      setIsInProgress(false);
    } else {
      alert(data.message || "Failed to resolve issue");
    }
  } catch (error) {
    console.error(error);
    alert("Error resolving issue");
  }
};

  const handleChange = (e) => {
    setIssue({
      ...issue,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/issues", {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
        house_id: tenantInfo.house_id,
        issue_description: issue.issue_description
      })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Maintenance request submitted successfully");
      } else {
        alert("Error: " + data.message);
      }

    {/*Reseting the issue description field after submission */}
    setIssue({
    issue_description: ""
  });

    } catch (error) {
      alert("Submission failed: " + error.message);
    }
  };

 return (
  <div className="relative w-full h-screen">

    {/* Background Image */}
    <img
      src={apartmentImg}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover"
    />

    

    {/* Form Card */}
    <div className="relative z-10 w-full h-full inset-0 bg-black/40 flex items-center justify-center">


      <form onSubmit={handleSubmit} className="flex flex-col gap-4 shadow-2xl p-8 rounded-lg bg-gray-900/90 text-white w-full max-w-150 border border-gray-700 max-h-[90vh] overflow-y-auto">
  
      <h2 className="text-3xl font-semibold text-white mb-10 text-center tracking-wide">
        Report a Maintenance Issue
      </h2>


      {isPending && (
            <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-800 p-3 mb-2 rounded text-sm font-semibold">
              Your issue is pending. An admin is working to assign a technician.
            </div>
          )}

      {isInProgress && (
         <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-3 mb-2 rounded text-sm font-semibold">
               Your issue is in progress and a technician has been sent. After the issue has been resolved please notify the admin by clicking the resolved button.
            </div>
      )}

      {isInProgress && (
          <button
            type="button"
            onClick={handleResolve}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            Mark Issue as Resolved
          </button>
        )}

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Names
          </label>
          <input
            type="text"
            value={tenantInfo.full_name || ""}
            disabled
            className="w-full rounded-lg bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="text"
            value={tenantInfo.phone || ""}
            disabled
            className="w-full rounded-lg bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="text"
            value={tenantInfo.email || ""}
            disabled
            className="w-full rounded-lg bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 cursor-not-allowed"
          />
        </div>

        {/* House Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              House Type
            </label>
            <input
              type="text"
              value={tenantInfo.house_type || ""}
              disabled
              className="w-full rounded-lg bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              House Number
            </label>
            <input
              type="text"
              value={tenantInfo.house_number || ""}
              disabled
              className="w-full rounded-lg bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Property Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Property Name
          </label>
          <input
            type="text"
            value={tenantInfo.property_name || ""}
            disabled
            className="w-full rounded-lg bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 cursor-not-allowed"
          />
        </div>

        {/* Issue Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Describe the Issue
          </label>
          <textarea
            name="issue_description"
            rows="4"
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition"
            placeholder="Explain the issue in detail..."
          />
        </div>

        {/* Date 
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date
          </label>
          <input
            type="date"
            name="issue_date"
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-white text-gray-800 border border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition"
          />
        </div> */}
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
        >
          Submit Issue
        </button>

      </form>
    </div>
  </div>
);
};

export default MaintenanceRequests;