import { useState } from "react";
import { Home, User, Settings, Menu, RectangleGogglesIcon } from "lucide-react";
import { Link, Routes, Route } from "react-router-dom";
import VacatingForm from "./VacatingForm.jsx";
import HomePage from "./HomePage.jsx";
import Profile from "./Profile.jsx";
import RentPayment from "./RentPayment.jsx";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
     
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } h-screen bg-gray-900 text-white p-4 transition-all duration-300 flex flex-col overflow-hidden`}
      >
        <button onClick={() => setIsOpen(!isOpen)} className="mb-6">
          <Menu />
        </button>

        <nav className="flex flex-col gap-4">
          <Link to="/TenantDashboard/" className="flex items-center gap-3 hover:text-gray-300">
            <Home size={20} />
            {isOpen && <span>Home Page</span>}
          </Link>

          <Link to="/TenantDashboard/Profile" className="flex items-center gap-3 hover:text-gray-300">
            <User size={20} />
            {isOpen && <span>Profile</span>}
          </Link>

          <Link to="/TenantDashboard/RentPayment" className="flex items-center gap-3 hover:text-gray-300">
            <RectangleGogglesIcon size={20} />
            {isOpen && <span>Rent Payment</span>}
          </Link>
          <Link to="/TenantDashboard/VacatingForm" className="flex items-center gap-3 hover:text-gray-300">
            <RectangleGogglesIcon size={20} />
            {isOpen && <span>Vacating Form</span>}
          </Link>

          <Link to="/Settings" className="flex items-center gap-3 hover:text-gray-300">
            <Settings size={20} />
            {isOpen && <span>Settings</span>}
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Routes>
        <Route index element={<HomePage />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="RentPayment" element={<RentPayment />} />
        <Route path="VacatingForm" element={<VacatingForm />} />

       </Routes>
       
        
      </div>
    </div>
  );
};

export default Sidebar;
