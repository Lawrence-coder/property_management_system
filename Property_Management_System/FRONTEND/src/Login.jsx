import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apartmentImg from '../src/Uploads/manson-street-vancouver.webp';
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Login = () => {
const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    role: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
     setLoginDetails ({
      ...loginDetails,
      [e.target.name]: e.target.value
     });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch ("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // specifies the format of the data being sent
          
        },
        body: JSON.stringify(loginDetails)
      });
      /*-------Storing a token from the backend-----*/
      const data = await res.json();
      localStorage.setItem("token", data.token); // Storing JWT token.
      localStorage.setItem("user", JSON.stringify(data.user)); // Storing user info.


       if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }
      alert("Login successfully");

       /*-------Role-Based-Access-Control implementation-------*/
    if (data.user.role === "tenant") {
      navigate("/TenantDashboard/");
    } else if (data.user.role === "admin") {
      navigate("/AdminDashboard/");
    } else if (data.user.role === "manager") {
      navigate("/managerDashboard");
    }

    } catch (error) {
      console.error("Login error:", error)
    }
   
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      <img className="absolute inset-0 w-full h-full object-cover" src={apartmentImg} alt="Register Form" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 shadow-2xl p-6 rounded-md bg-gray-900/90 text-white w-full max-w-md border border-gray-700">
       <h2 className="text-xl font-bold text-center">Login</h2>
       <p className="text-gray-400 text-sm text-center mb-4">Please select your role and enter your email and password.</p>
       <select
       name='role'
       value={loginDetails.role}
       onChange={handleChange}
       required
        className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800"
       >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="tenant">Tenant</option>
        <option value="manager">Manager</option>
        
       </select>

       <input
       type="email"
       name='email'
       placeholder='Enter email'
       value={loginDetails.email}
       onChange={handleChange}
       required
       className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className = "relative">
          <input
        type= {showPassword? "text" : "password"}
        name='password'
        placeholder='Enter password'
        value={loginDetails.password}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
         />

         <button
          type = "button"
          onClick = {()=>setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-500 hover:text-green-700"
         >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
         </button>
        </div>
        
         <button type='submit' className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 hover:bg-gray-900">Login</button>
         <p>Don't have an account? <a href="/Register" className="text-blue-400 hover:underline">Register</a></p>
      </form>
      </div>
     </div>
  );
};

export default Login;