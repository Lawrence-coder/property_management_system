import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";

const AdminMaintenanceRequests = () => {
  const [issues, setIssues] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [archivedIssues, setArchivedIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
    fetchFrequency();
  }, []);

  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/admin/issuesrequests", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      const allIssues = Array.isArray(data) ? data : [];
      setIssues(allIssues.filter(issue => issue.status !== "resolved"));
      setArchivedIssues(allIssues.filter(issue => issue.status === "resolved"));
    } catch (error) {
      console.error(error);
      setIssues([]);
    }
  };

  const fetchFrequency = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/admin/issuesrequests/frequency", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setFrequency(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setFrequency([]);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/admin/issuesrequests/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      fetchIssues();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-slate-900 text-slate-200 p-8">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-white">
        Maintenance Requests
      </h1>

      {/* Frequency Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 size={18} /> Issue Frequency by Property
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {frequency.map((item) => (
            <div
              key={item.property_name}
              className="bg-slate-900 p-6 rounded-2xl border border-green-700 shadow"
            >
              <h3 className="text-lg font-semibold text-white">
                {item.property_name}
              </h3>
              <p className="text-slate-400 mt-2">
                Total Issues:{" "}
                <span className="text-indigo-400 font-bold">
                  {item.total_issues}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
  <button
    onClick={() => setActiveTab("active")}
    className={`px-4 py-2 rounded-lg font-semibold ${
      activeTab === "active"
        ? "bg-green-600 text-white"
        : "bg-slate-700 text-slate-300"
    }`}
  >
    Active Issues
  </button>

  <button
    onClick={() => setActiveTab("archive")}
    className={`px-4 py-2 rounded-lg font-semibold ${
      activeTab === "archive"
        ? "bg-green-600 text-white"
        : "bg-slate-700 text-slate-300"
    }`}
  >
    Archive
  </button>
</div>

      {/* Issues Table */}
      <div className="bg-white rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">
              <tr>
                <th className="px-6 py-4">Full Names</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">House Number</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Property Name</th>
                <th className="px-6 py-4">Issue Description</th>
                <th className="px-6 py-4">Date submitted</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {(activeTab === "active" ? issues : archivedIssues).map((issue) => (
                <tr
                  key={issue.id}
                  className="border-t border-gray-900 hover:bg-gray-200/40 transition whitespace-nowrap"
                >
                  <td className="px-6 py-4 text-gray-900">{issue.full_name}</td>
                  <td className="px-6 py-4 text-gray-800">{issue.email}</td>
                  <td className="px-6 py-4 text-gray-800">{issue.phone}</td>
                  <td className="px-6 py-4 text-gray-800">{issue.house_number}</td>
                  <td className="px-6 py-4 text-gray-800">{issue.house_type}</td>
                  <td className="px-6 py-4 text-gray-800">{issue.property_name}</td>
                  <td className="px-6 py-4 text-gray-800">{issue.issue_description}</td>
                  <td className="px-6 py-4 text-gray-800">{new Date(issue.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <select
                      value={issue.status}
                      onChange={(e) =>
                        updateStatus(issue.id, e.target.value)
                      }
                      className="bg-slate-900 border border-slate-600 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                    </select>
                  </td>
                </tr>
              ))}

              {(activeTab === "active" ? issues : archivedIssues).length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-10 text-slate-400">
                    {activeTab === "active"
                      ? "No active maintenance requests."
                      : "No archived issues."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMaintenanceRequests;