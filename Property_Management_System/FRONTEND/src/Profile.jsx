import apartmentImg from "../src/Uploads/manson-street-vancouver.webp";

import { useEffect, useState } from "react";

const Profile = () => {

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");// retrieving the token from local storage.

      const res = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setProfileData(data);
    } catch (error) {
      console.error("Profile fetch error", error);
    }
  };

  fetchProfileData(); // Call the function to fetch profile data when the component mounts
}, []);


   if (!profileData) return <p>Loading details.....</p>

  return (
    <div className="relative w-full h-screen">
      <img className="absolute inset-0 w-full h-full object-cover" 
      src={apartmentImg}
      alt="Profile" />

      <div className="relative z-10 w-full h-full inset-0 bg-black/40 flex items-center justify-center">
      <form className="flex flex-col gap-4 shadow-2xl p-8 rounded-lg bg-gray-900/90 text-white w-full max-w-150 border border-gray-700 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold">Profile</h2>
        
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase font-bold">Full Name</label>
        <input 
        type="text" 
        value={profileData.full_name} 
        readOnly 
        className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase font-bold">Email</label>
        <input 
        type="email" 
        value={profileData.email} 
        readOnly 
        className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase font-bold">Phone</label>
        <input 
        type="tel" 
        value={profileData.phone} 
        readOnly
        className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase font-bold">House Number</label>
        <input 
        type="text" 
        value={profileData.house_number} 
        readOnly
        className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase font-bold">House Type</label>
        <input 
        value={profileData.house_type} 
        readOnly
        className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
        </div>
        
        <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 uppercase font-bold">Property Name</label>
        <input  
        value={profileData.property_name} 
        readOnly
        className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400 cursor-not-allowed" />
        </div>

      </form>
      </div>
    </div>
  );
};

export default Profile;