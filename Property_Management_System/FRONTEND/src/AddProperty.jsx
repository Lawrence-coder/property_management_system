import { useState, useEffect } from 'react';
import apartmentImg from "../src/Uploads/manson-street-vancouver.webp";

const AddProperty = () => {
const [successMsg, setSuccessMsg] = useState("");
const [successHouseMsg, setSuccessHouseMsg] = useState("");
const [properties, setProperties] = useState([]);
const [formData, setFormData] = useState({
  property_name: "",
});

const [houses, setHouses] = useState({
  property_id: "",
  house_type: "",
  house_number: "",
  amount: ""
});

useEffect(() => {
  const fetchAddedProperties = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/addproperty/created", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setProperties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching added properties", error)
    }
  }
  fetchAddedProperties();
}, []);

const handleHouseChange = (e) => {
  setHouses({
    ...houses,
    [e.target.name]: e.target.value
  })
}

const handlePropertyChange = (e) => { // to handle form input changes insimple words it means when user types something in the input field this function captures that event and updates the formData state with the new value for the corresponding input field.
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};


const handleAddedPropertyChange = async (e) => {
  const propertyId = e.target.value;

  setHouses({
    ...houses,
    property_id: propertyId // Update the property_id in houses
  });
};

const handlePropertySubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/addproperty", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {
    setSuccessMsg(data.message); 
    setFormData({ property_name: "" }); // Reset to just the name field
    setTimeout(() => setSuccessMsg(""), 10000);
  } else {
    alert(data.message || "Something went wrong");
  }

  } catch (error) {
    console.error("Failed to add property", error);
  }
};



const handleHouseSubmit = async (e) => {
  e.preventDefault();


  try {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/addproperty/createunit", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(houses)
    })

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Failed to add unit to property");
      return;
    }

    setHouses({
      property_id: "",
      house_type: "",
      house_number: "",
      amount: ""
    });

    setSuccessHouseMsg(data.message || "House added successfully.");
    setTimeout(() => setSuccessHouseMsg(""), 10000);

  } catch (error) {
    console.error("Error adding unit:", error);
  }
};

  return (
    <div className="relative w-full h-screen">
       <img className="absolute inset-0 w-full h-full object-cover" src={apartmentImg} alt="Apartment" />
       <div className="relative z-10 w-full h-full inset-0 bg-black/40 flex items-center justify-center flex-col gap-4">

      <form onSubmit={handlePropertySubmit} className="flex flex-col gap-4 shadow-2xl p-8 rounded-lg bg-gray-900/90 text-white w-full max-w-150 border border-gray-700 max-h-[90vh] overflow-y-auto">
        
      {successMsg && <div className="bg-green-500 text-white p-2 mb-4">{successMsg}</div>}
        
        <h2 className="text-2xl font-bold text-center mb-2">Add Property</h2>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase font-bold">Property Name</label>
          <input 
          type = 'text'
          name = "property_name"
          placeholder ="Add Property"
          onChange = {handlePropertyChange}
          value = {formData.property_name}
          required
          className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400"
           />

           <button type = "submit" className = "border border-gray-400 p-2 mt-4 text-white bg-blue-600 font-bold">Add Property</button>
        </div>
        </form>

        <form onSubmit={handleHouseSubmit} className="flex flex-col gap-4 shadow-2xl p-8 rounded-lg bg-gray-900/90 text-white w-full max-w-150 border border-gray-700 max-h-[90vh] overflow-y-auto">
      {successHouseMsg && <div className="bg-green-500 text-white p-2 mb-4">{successHouseMsg}</div>}
      <h2 className="text-2xl font-bold text-center mb-2 horizontal-rule">Create House/Unit</h2>
       
       <div className = "flex flex-col gap-1">
        <label className="text-xs text-gray-400 uppercase font-bold">Property Name</label>
        <select
         value = {houses.property_id}
         onChange={handleAddedPropertyChange}
         className="border border-gray-400 text-gray-400 p-2 rounded bg-gray-800"
        >
          <option value = "">Choose Property to Add Unit</option>
          {properties.map((property) => (
            <option key = {property.id} value = {property.id}>
              {property.property_name}
            </option>
          ))}
        </select>
      </div>

        <div className = "flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase font-bold">House Type</label>
          <input
          type = "text"
          name = "house_type"
          placeholder='House Type'
          value = {houses.house_type}
          onChange = {handleHouseChange}
          className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400"
           />
        </div>

        <div className = "flex flex-col gap-1">
          <label className = "text-xs text-gray-400 uppercase font-bold">House Number</label>
          <input
          type = "text"
          name = "house_number"
          placeholder = "House Number"
          value = {houses.house_number}
          onChange = {handleHouseChange}
          className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400"
           />
        </div>

        <div className = "flex flex-col gap-1">
          <label className = "text-xs text-gray-400 uppercase font-bold">Rent Amount</label>
          <input 
           type = "char"
           name = "amount"
           placeholder = "Ksh"
           value = {houses.amount}
           onChange = {handleHouseChange}
           className="bg-gray-800 border border-gray-600 p-2 rounded text-gray-400"
          />
        </div>

        <button type = "submit" className = "border border-gray-400 p-2 mt-4 text-white bg-blue-600 font-bold">Add House</button>
      </form>
      </div>
    </div>
  );
};

export default AddProperty;