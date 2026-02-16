import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import RegisterForm from './RegisterForm.jsx';
import TenantDashboard from './TenantDashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';



const App = () => {
  return (
    <Routes>
      <Route path="/"  element={<Login />} />
      <Route path="/Register" element = {<RegisterForm />} />
      <Route path="/TenantDashboard/*" element={<TenantDashboard />} /> // Nested routes for TenantDashboard-which means all routes inside TenantDashboard will be handled there.
      <Route path="/AdminDashboard/*" element= {<AdminDashboard />} /> // Nested routes for AdminDashboard
    </Routes>
  );
  
};

export default App;
