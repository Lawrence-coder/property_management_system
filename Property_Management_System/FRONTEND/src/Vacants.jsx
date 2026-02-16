import { useState, useEffect } from 'react';

const Vacants = () => {
  const [vacants, setVacants] = useState([]);

  useEffect(() => {
    const fetchVacantHouses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/vacants", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setVacants(data);
      } catch (error) {
        console.error("Error fetching vacant houses.", error);
      }
    };
    fetchVacantHouses();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex-1 min-w-0">
      <div className="flex justify-between items-center mb-6">
        <h2  className="text-2xl font-bold text-gray-900">Vacant Houses Report</h2>
      <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-2.5 py-0.5 rounded">
        Total: {vacants.length}
        </span>
      </div>
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Property Name</th>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">House #</th>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Type</th>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Status</th>
            <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Amount (Ksh)</th>
          </tr>
        </thead>

    {/*-----The body of the Table------- */}
     <tbody className = "divide-y divide-gray-200">
      {vacants.map((houses) => (
        <tr key = {houses.id} className="hover:bg-gray-100 transition-colors">
          <td className = "p-4 text-gray-700 font-medium whitespace-nowrap">{houses.property_name}</td>
          <td className="p-4 text-gray-600 whitespace-nowrap">{houses.house_number}</td>
          <td className="p-4 text-gray-600 whitespace-nowrap">{houses.house_type}</td>
          <td>
              <span className = {`px-2 py-1 rounded-full text-xs font-bold
              ${
               houses.status === 'vacant' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>{houses.status}</span>
              </td>
          <td className="p-4 text-gray-600 whitespace-nowrap">{houses.amount}</td>
        </tr>
      ))}
     </tbody>
      </table>
      </div>
      </div>
    </div>
    
  );
};

export default Vacants;