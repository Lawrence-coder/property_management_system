import { useState, useEffect } from 'react';

const PaymentReceipts = () => {
  const [report, setReport] = useState([]);
  const [properties, setProperties] = useState([]); // State to hold properties list
  const [filters, setFilters] = useState({ 
    propertyId: "", 
    month: new Date().getMonth() + 1, 
    year: new Date().getFullYear() 
  });

  // 1. Fetch properties for the dropdown on mount
  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/addproperty/created", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setProperties(data);
    };
    fetchProperties();
  }, []);

  // 2. Fetch report when filters change
  useEffect(() => {
    const fetchReport = async () => {
      if (!filters.propertyId) return; // Don't fetch if no property selected

      try {
        const token = localStorage.getItem("token");
        // FIX: Use filters object properties here
        const res = await fetch(
          `http://localhost:3000/api/payments/monthly-report?propertyId=${filters.propertyId}&month=${filters.month}&year=${filters.year}`, 
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const data = await res.json();
        setReport(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching payment report", error);
      }
    };

    fetchReport();
  }, [filters]); // Dependency array: re-run when filters change

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Monthly Payment Status</h2>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded shadow items-end">
        
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-600">Property</label>
          <select 
            value={filters.propertyId}
            className="border p-2 rounded bg-gray-50"
            onChange={(e) => setFilters({...filters, propertyId: e.target.value})}
          >
            <option value="">Select Property</option>
            {properties.map(p => (
              <option key={p.id} value={p.id}>{p.property_name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-600">Month</label>
          <select 
            value={filters.month}
            className="border p-2 rounded bg-gray-50"
            onChange={(e) => setFilters({...filters, month: e.target.value})}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i+1} value={i+1}>
                {new Date(0, i).toLocaleString('en-US', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-600">Year</label>
          <input 
            type="number" 
            value={filters.year}
            className="border p-2 rounded bg-gray-50 w-24"
            onChange={(e) => setFilters({...filters, year: e.target.value})}
          />
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3">Full Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">House</th>
              <th className="p-3">Type</th>
              <th className="p-3">Rent (Ksh)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Receipt</th>
              <th className="p-3">Approval</th>
            </tr>
          </thead>
          <tbody>
            {report.length > 0 ? report.map((item) => (
              <tr key={item.house_id} className={`border-b ${item.house_status === 'Unpaid' ? 'bg-red-50' : 'bg-green-50'}`}>
                <td className="p-3 font-medium">{item.full_name}</td>
                <td className="p-3 font-medium">{item.phone}</td>
                <td className="p-3 font-medium">{item.house_number}</td>
                <td className="p-3">{item.house_type}</td>
                <td className="p-3">{item.rent_price}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    item.house_status === 'Paid' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {item.house_status}
                  </span>
                </td>
                <td className="p-3">
                  {item.receipt_path ? (
                    <a href={`http://localhost:3000/src/Uploads/${item.receipt_path}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                      View Receipt
                    </a>
                  ) : "-"}
                </td>
                <td className="p-3 uppercase text-xs font-bold text-gray-600">
                    {item.payment_status || "N/A"}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="p-10 text-center text-gray-500">
                  Select a property to view payment status
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentReceipts;