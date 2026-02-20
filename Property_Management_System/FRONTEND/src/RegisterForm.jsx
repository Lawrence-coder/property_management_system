import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apartmentImg from "../src/Uploads/manson-street-vancouver.webp";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const RegisterForm = () => {
 const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [properties, setProperties] = useState([]); // All properties
  const [houses, setHouses] = useState([]); // Available houses for selected property
  const [loading, setLoading] = useState(false); // For form submission state
  const [formData, setFormData] = useState({ 
    full_name: "",
    email: "",
    phone: "",
    password: "",
    property_id: "",
    house_id: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  /* ---------------- FETCH PROPERTIES ON LOAD ---------------- */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/properties");
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
        console.log("Fetched properties:", data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  /* ---------------- HANDLE INPUT CHANGE ---------------- */
  const handleChange = (e) => { // Generic handler for text inputs and house dropdown
    setFormData({
      ...formData,
      [e.target.name]: e.target.value // Dynamic key assignment which is for both text inputs and house dropdown.
    });
  };

  /* ---------------- PROPERTY → HOUSE CASCADE ---------------- */
  const handlePropertyChange = async (e) => {
    const propertyId = e.target.value; //
    

    setFormData({ 
      ...formData,
      property_id: propertyId, 
      house_id: "" 
    });

    if (!propertyId) { // No property selected
      setHouses([]); // Clear houses if no property selected
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/houses/${propertyId}` // Fetch houses for selected property
      );
      const data = await res.json();
      setHouses(Array.isArray(data) ? data : []); // Ensure data is an array

      console.log("Fetched houses:", data);
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };

  /* ---------------- FORM SUBMISSION ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.house_id) {
      alert("Please select a house");
      return;
    }

    setLoading(true); 

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json(); // Its work is to parse the JSON response from the server. Parse means convert the JSON string into a JavaScript object.

      if (!res.ok) {
        alert(data.message || "Registration failed"); // the work of data.message is to provide specific feedback from the server if available which in this case is
        return;
      }

      alert(data.message);;
      navigate("/"); // This login route.

      // Optional reset
      setFormData({ 
        full_name: "",
        email: "",
        phone: "",
        password: "",
        property_id: "",
        house_id: ""
      });
      setHouses([]);

    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <img className="absolute inset-0 w-full h-full object-cover" src={apartmentImg} alt="Register Form" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 shadow-2xl p-6 rounded-md bg-gray-900/90 text-white w-full max-w-md border border-gray-700">
        <h2 className="text-xl font-bold text-center">Tenant Registration</h2>

        <input
          type="text"
          name="full_name"
          placeholder="Enter your full names"
          value={formData.full_name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className = "relative">
          <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
        type = "button"
        className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-500 hover:text-green-700"
        onClick = {()=>setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        </div>
        

        {/* PROPERTY DROPDOWN */}
        <select
          value={formData.property_id}
          onChange={handlePropertyChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
        >
          <option value="">Select Property</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.property_name}
            </option>
          ))}
        </select>

        {/* HOUSE DROPDOWN */}
        <select
          value={formData.house_id}
          onChange={handleChange} // Updated to generic handler- generic handler means we need to set 
          name="house_id"

          disabled={!houses.length}  // means no houses available so disable
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
        >
          <option value="">
            {houses.length ? "Select House" : "No vacant houses"}
          </option>
          {houses.map((house) => (
            <option key={house.id} value={house.id}>
              {house.house_number} — {house.house_type}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading} 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 hover:bg-gray-900"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default RegisterForm;
