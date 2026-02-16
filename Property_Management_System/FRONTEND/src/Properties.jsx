import { useState, useEffect } from 'react';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/properties", {
          headers: {Authorization: `Bearer ${token}`}
        });

        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProperties();
  }, []);

  if (isLoading) return <p>Loading Properties.......</p>
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2  className="text-2xl font-bold text-gray-900">Properties Under Management</h2>
      <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-2.5 py-0.5 rounded">
        Total: {properties.length}
        </span>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-900 text-white">
          <tr>
          <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Property Name</th>
          <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Date Added</th>
          </tr>
        </thead>

        <tbody className = "divide-y divide-gray-300">
        {properties.map((property) => (
          <tr key = {properties.id} className="hover:bg-gray-100 transition-colors">
          <td className = "p-4 text-gray-700 font-medium whitespace-nowrap">{property.property_name}</td>
          <td className = "p-4 text-gray-700 font-medium whitespace-nowrap">{new Date (property.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Properties;