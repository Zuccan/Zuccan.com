import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ApplyJob from './pages/ApplyJob';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Employee Login Route */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

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
