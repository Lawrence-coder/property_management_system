import { useState, useEffect } from 'react';

const VacatingNotices = () => {

  const [vacatingRequests, setVacatingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleAprroval = async (requests) => {

    if (requests.status === 'rejected') return; // Prevents approving what already has been rejected.
    

    const confirmMessage = `Approve vacating notice for ${requests.full_name} ? This will require you to deactivate them in order to mark the house as vacant.`;

    if (window.confirm(confirmMessage)) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/vacatingNotices/approve/${requests.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ status: 'approved' })
        });

        if (res.ok) {
          setVacatingRequests(prev => prev.map(vr => vr.id === requests.id ? {...vr, status: 'approved'} : vr));
        alert(`The vacating notices for ${requests.full_name} has been approved successfully. Proceed to deactivate them.`)
        }
      } catch (error) {
        console.error("Approval error", error);
      }
    }
    
  };

  const handleDeclined = async (requests) => {
    if (requests.status === "approved") return;

    const confirmMessage = `Decline vacating notice for ${requests.full_name} ? It was not sent one month before.`

    if (window.confirm(confirmMessage)) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/vacatingNotices/decline/${requests.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({status: 'rejected'})
        });

        if (res.ok) {
          setVacatingRequests(prev => prev.map(vr => vr.id === requests.id ? {...vr, status: 'rejected'} : vr));
          alert(`Vacating notice for ${requests.full_name} has been rejected successfully and the reasons issued to them.`)
        }
      } catch (error) {
        console.error("Decline Error", error);
      }
    }
  };


 useEffect(() => {
   const fetchVacatingRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/vacatingNotices", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    const data = await res.json();
    setVacatingRequests(data);
    } catch (error) {
    console.error("Error fetching vacating notices", error);
    } finally {
      setIsLoading(false);
    }
   };
   fetchVacatingRequests();
 }, []);

 if (isLoading) return <p>Loading vacating notices-------</p>

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex-1 min-w-0">
      <div className="flex justify-between items-center mb-6">
        <h2  className="text-2xl font-bold text-gray-900">Vacating Notices Report</h2>
      <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-2.5 py-0.5 rounded">
        Total: {vacatingRequests.length}
        </span>
      </div>
      
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
         <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Full Name</th>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Email</th>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">House #</th>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Type</th>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Property</th>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Vacate Date</th>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Status</th>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Date Submitted</th>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap text-center">Actions</th>
          </tr>
         </thead>

         {/*----------Next is tbody which takes <tr> then inside <td>......... */}

         <tbody className = "divide-y divide-gray-200">
          {vacatingRequests.map((requests) => (
            <tr key = {requests.id} className="hover:bg-gray-100 transition-colors">
            <td className = "p-4 text-gray-700 font-medium whitespace-nowrap">{requests.full_name}</td>
            <td className="p-4 text-gray-600 whitespace-nowrap">{requests.email}</td>
            <td className="p-4 text-gray-600 whitespace-nowrap">{requests.house_number}</td>
            <td className="p-4 text-gray-600 whitespace-nowrap">{requests.house_type}</td>
            <td className="p-4 text-gray-600 whitespace-nowrap">{requests.property_name}</td>
            <td className="p-4 text-gray-600 whitespace-nowrap">{new Date(requests.vacate_date).toLocaleDateString()}</td>
            <td>
              <span className = {`px-2 py-1 rounded-full text-xs font-bold
              ${
               requests.status === 'pending' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>{requests.status}</span>
              </td>

            <td className="p-4 text-gray-600 whitespace-nowrap">{new Date(requests.created_at).toDateString()}</td>

            <td className="p-4 text-center whitespace-nowrap">
              <div className="flex justify-center gap-3">
              <button
              onClick = {() =>handleAprroval(requests)}
              disabled= {requests.status === 'approved'}
              className = {`font-medium px-3 py-1 rounded ${
                requests.status === 'approved' 
                ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                : 'text-green-700 hover:bg-green-100 '
              }`}
              >
                {requests.status === 'approved' ? 'Approved' : 'Approve'}
              </button>
               
              <button
              onClick={() =>handleDeclined(requests)}
              disabled = {requests.status === 'rejected'}
              className= {`font-medium px-3 py-1 rounded ${
              requests.status === 'rejected' 
              ? 'bg-blue-100 text-blue-700 cursor-not-allowed'
              : 'text-red-700 hover:bg-red-100'
              }`}
              >
                {requests.status === 'rejected' ? 'Declined' : 'Decline'}
              </button>
              </div>
            </td>
           </tr>
          ))}
         </tbody>
        </table>
      </div>
    </div>
    </div>
  )
};

export default VacatingNotices;