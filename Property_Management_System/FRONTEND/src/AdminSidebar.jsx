import { useState } from 'react';
import { Menu, Users, Building2, Building, DoorOpen, LogOut, Receipt, HousePlugIcon } from 'lucide-react';
import { Link, Routes, Route } from 'react-router-dom';
import Tenants  from './Tenants.jsx';
import VacatingNotices from './VacatingNotices.jsx';
import AddProperty from './AddProperty.jsx';
import Properties from './Properties.jsx';
import Vacants from './Vacants.jsx';
import PaymentReceipts from './PaymentReceipts.jsx';
import AdminMaintenanceRequests from './AdminMaintenanceRequests.jsx';


const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex">

      <div className={`${
        isOpen ? "w-64" : "w-16"
      } h-screen bg-gray-900 text-white p-4 transition-all duration-300 flex flex-col shrink-0 fixed `}>

        <button onClick={() => setIsOpen(!isOpen)} className="mb-6"><Menu /></button>

        <nav className='flex flex-col gap-4'>
         <Link to= "/AdminDashboard/" className="flex items-center gap-3 hover:text-gray-300">
          <Users size={20} />
          {isOpen && <span>Tenants</span>}
         </Link>

         <Link to="/AdminDashboard/Properties" className="flex items-center gap-3 hover:text-gray-300">
          <Building2 size={20} />
          {isOpen && <span>Properties</span>}
         </Link>

         <Link to="/AdminDashboard/AddProperty" className="flex items-center gap-3 hover:text-gray-300">
         <Building size={20}/>
         {isOpen && <span>Add Property</span>}
         </Link>

         <Link to="/AdminDashboard/Vacants" className="flex items-center gap-3 hover:text-gray-300">
          <DoorOpen size={20}/>
          {isOpen && <span>Vacants</span>}
         </Link>

         <Link to="/AdminDashboard/VacatingNotices" className="flex items-center gap-3 hover:text-gray-300">
          <LogOut size={20}/>
          {isOpen && <span>Vacanting Notices</span>}
         </Link>

         <Link to="/AdminDashboard/PaymentReceipts" className="flex items-center gap-3 hover:text-gray-300">
          <Receipt size={20}/>
          {isOpen && <span>Payment Receipts</span>}
         </Link>

         <Link to="/AdminDashboard/AdminMaintenanceRequests" className="flex items-center gap-3 hover:text-gray-300">
          <HousePlugIcon size={20}/>
          {isOpen && <span>Maintenance Requests</span>}
         </Link>
        </nav>
     </div>
     
      {/*Main content*/}
     <div className={`flex-1 min-w-0 bg-gray-200 p-6 transition-all duration-300 ${
        isOpen ? "ml-64" : "ml-16"
      }`}>

        
        <div className="max-w-full">
           <Routes>
             <Route index element={<Tenants />} />
             <Route path = "/Properties" element={<Properties />} />
              <Route path = "/AddProperty" element={<AddProperty />} />
              <Route path = "/Vacants" element={<Vacants />} />
              <Route path = "/VacatingNotices" element={<VacatingNotices />} />
              <Route path = "/PaymentReceipts" element={<PaymentReceipts />} />
              <Route path = "/AdminMaintenanceRequests" element={<AdminMaintenanceRequests />} />
           </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;