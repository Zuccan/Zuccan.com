import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ApplyJob from './pages/ApplyJob';
import ChooseProduct from './pages/ChooseProduct';
import WorkspaceDashboard from './pages/WorkspaceDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Employee Login Route — Root Home Page for Zuccano.me */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Post-Login Choose Product Page (Exact match to reference) */}
        <Route path="/choose-product" element={<ChooseProduct />} />
        <Route path="/products" element={<ChooseProduct />} />

        {/* Role-Based Product Workspace (CEO vs Employee Dashboards) */}
        <Route path="/workspace/:productId" element={<WorkspaceDashboard />} />

        {/* Dedicated Professional Apply for Job Route */}
        <Route path="/apply" element={<ApplyJob />} />
        <Route path="/careers" element={<ApplyJob />} />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
