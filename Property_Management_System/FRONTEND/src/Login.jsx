import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apartmentImg from '../src/Uploads/manson-street-vancouver.webp';

const Login = () => {
const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    role: "",
    email: "",
    password: ""
  });

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
        className="border-2 p-2 rounded text-white bg-gray-800"
       >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="tenant">Tenant</option>
        <option value="manager">Manager</option>
        
       </select>

       <input
       type="email"
       name='email'
       placeholder='Email'
       value={loginDetails.email}
       onChange={handleChange}
       required
       className="border-2 p-2 rounded text-white"
        />

        <input
        type='password'
        name='password'
        placeholder='Password'
        value={loginDetails.password}
        onChange={handleChange}
        required
        className="border-2 p-2 rounded text-white"
         />
         <button type='submit' className="border-2 p-2 rounded bg-blue-950 hover:bg-blue-700">Login</button>
         <p>Don't have an account? <a href="/Register" className="text-blue-400 hover:underline">Register</a></p>
      </form>
      </div>
     </div>
  );
};

export default Login;