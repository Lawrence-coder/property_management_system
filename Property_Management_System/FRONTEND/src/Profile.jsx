import apartmentImg from "../src/Uploads/manson-street-vancouver.webp";

import { useEffect, useState } from "react";

const Profile = () => {

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");// retrieving the token from local storage.

      const res = await fetch("http://localhost:3000/api/profile", {
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
    <div>
      <img className="relative" 
      src={apartmentImg}
      alt="Profile" />
      <form className="flex flex-col gap-4 shadow-lg p-6 rounded-md bg-gray-900/90 text-white w-1/2 absolute top-18 right-45">
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
  );
};

export default Profile;