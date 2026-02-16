import Sidebar from './Sidebar.jsx';
const TenantDashboard = () => {

  const handleLogout = () => {
  // 1. Remove the token from storage
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // if you store user info

  // 2. Redirect to login
  window.location.href = "/"; 
};

  return (
    <div className="bg-white-200">
      <div className="flex flex-row justify-between items-center p-2">
      <h1 className='text-green-700 font-bold mx-2 text-3xl bg-black-300 flex'>Tenant Dashboard</h1>
       <button onClick = {handleLogout} className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-900 flex font-bold">Logout</button>
       </div>
      <Sidebar />
    </div>
  );
}

export default TenantDashboard;