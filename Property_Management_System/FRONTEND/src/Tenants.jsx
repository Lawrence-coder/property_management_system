import { useState, useEffect } from 'react';

const Tenants = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState({ full_name: '', email: '', phone: '', role: '', house_id: '', house_number: '', house_type: '', property_name: '' });
  const [tenantsData, setTenantsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- EDIT LOGIC ---
  const handleEditClick = (tenant) => {
    setSelectedTenant(tenant);
    setIsModalOpen(true);
  };

  // --- DEACTIVATE LOGIC ---
  const handleDeactivate = async (tenant) => {
    if (tenant.role === 'admin') {
      return alert("System Error: Admin accounts must be deactivated via the database for security.");
    }

    if (tenant.status === 'Inactive') return; // Prevent deactivating an already inactive tenant

    const confirmMessage = `Deactivate ${tenant.full_name}? This will also mark House ${tenant.house_number || 'N/A'}, ${tenant.house_type} in the ${tenant.property_name} as vacant and the tenant looses access to the system.`;
    
    if (window.confirm(confirmMessage)) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/users/deactivate/${tenant.id}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          setTenantsData(prev => prev.map(u => u.id === tenant.id ? { ...u, status: 'Inactive' } : u)); // Update status locally meaning no refetch needed
          alert(`Tenant deactivated successfully and ${tenant.house_number} - ${tenant.house_type} is vacant.`);
        }
      } catch (error) {
        console.error("Deactivate error:", error);
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/users/${selectedTenant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(selectedTenant)
      });

      if (res.ok) {
        setTenantsData(tenantsData.map(t => t.id === selectedTenant.id ? selectedTenant : t));
        setIsModalOpen(false);
        alert("Updated successfully!");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const res = await fetch("/api/users", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        setTenantsData(data);
      } catch (error) {
        console.error("Tenants fetch error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersData();
  }, []);

  if (loading) return <div className="p-10 text-center text-xl">Loading tenants.....</div>;

  return (
    // min-w-0 is the secret fix for flex containers
    <div className="p-6 bg-gray-50 min-h-screen flex-1 min-w-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tenants Management</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-2.5 py-0.5 rounded">
          Total: {tenantsData.length}
        </span>
      </div>

      {/* --- TABLE FIXES START HERE --- */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {/* overflow-x-auto creates the horizontal scroll window */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-900 text-white">
              <tr>
                {/* whitespace-nowrap prevents headers from breaking into two lines */}
                <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Full Name</th>
                <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Email</th>
                <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Phone</th>
                <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">House #</th>
                <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Type</th>
                <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Property</th>
                <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Role</th>
                <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Joined</th>
                <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap">Status</th>
                <th className="p-4 font-semibold uppercase text-xs whitespace-nowrap text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {tenantsData.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-100 transition-colors">
                  <td className="p-4 text-gray-700 font-medium whitespace-nowrap">{tenant.full_name}</td>
                  <td className="p-4 text-gray-600 whitespace-nowrap">{tenant.email}</td>
                  <td className="p-4 text-gray-600 whitespace-nowrap">{tenant.phone || 'N/A'}</td>
                  <td className="p-4 text-gray-600 whitespace-nowrap">{tenant.house_number || 'N/A'}</td>
                  <td className="p-4 text-gray-600 whitespace-nowrap">{tenant.house_type || 'N/A'}</td>
                  <td className="p-4 text-gray-600 whitespace-nowrap">{tenant.property_name || 'N/A'}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      tenant.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {tenant.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 whitespace-nowrap">
                    {new Date(tenant.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      tenant.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {tenant.status}
                    </span>
                  </td>

                  <td className="p-4 text-center whitespace-nowrap">
                    {/* flex row + gap stops buttons from stacking vertically */}
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => handleEditClick(tenant)} 
                        className="text-blue-600 hover:text-blue-900 font-semibold text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeactivate(tenant)}
                        disabled={tenant.status === 'Inactive'}
                        className={`font-medium px-3 py-1 rounded ${
                          tenant.status === 'Inactive' 
                            ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                      >
                        {tenant.status === 'Inactive' ? 'Deactivated' : 'Deactivate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Edit Tenant Details</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <label className="text-xs font-bold text-gray-500 uppercase">Basic Info</label>
                  <input className="border p-2 rounded w-full" value={selectedTenant.full_name} onChange={(e) => setSelectedTenant({...selectedTenant, full_name: e.target.value})} placeholder="Full Name" />
                  <input className="border p-2 rounded w-full" value={selectedTenant.email} onChange={(e) => setSelectedTenant({...selectedTenant, email: e.target.value})} placeholder="Email" />
                  <input className="border p-2 rounded w-full" value={selectedTenant.phone} onChange={(e) => setSelectedTenant({...selectedTenant, phone: e.target.value})} placeholder="Phone" />
                  
                  <label className="text-xs font-bold text-gray-500 uppercase">Assignment</label>
                  <input className="border p-2 rounded w-full" value={selectedTenant.house_number} 
                  onChange={(e) => setSelectedTenant({...selectedTenant, house_number: e.target.value})} placeholder="House Number" />

                  <input className="border p-2 rounded w-full" value={selectedTenant.house_type} 
                  onChange={(e) => setSelectedTenant({...selectedTenant, house_type: e.target.value})} placeholder="House Type" />
                  
                  <input className="border p-2 rounded w-full" value={selectedTenant.property_name} 
                  onChange={(e) => setSelectedTenant({...selectedTenant, property_name: e.target.value})} placeholder="Property Name" />
                  
                  <select className="border p-2 rounded w-full bg-gray-50" value={selectedTenant.role} onChange={(e) => setSelectedTenant({...selectedTenant, role: e.target.value})}>
                    <option value="tenant">Tenant</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-200 hover:text-red-800 text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenants;