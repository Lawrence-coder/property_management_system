import AdminSidebar from "./AdminSidebar.jsx";

const AdminDashboard = () => {

  const handleLogout = () => {
  // 1. Remove the token from storage
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // if you store user info

  // 2. Redirect to login
  window.location.href = "/"; 
};
  return (
    <div className="bg-white-200 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-40 flex flex-row justify-between items-center p-2">
          <h1 className='text-green-700 font-bold text-2xl'>Admin Dashboard</h1>

          <button onClick = {handleLogout} className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-800 transition-colors font-bold">
            Logout
          </button>
        </header>

      <AdminSidebar />
    </div>
  );
};

export default AdminDashboard;