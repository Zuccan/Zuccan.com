import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import { MainLayout } from './layouts/MainLayout';
import { ParentHome } from './pages/ParentHome/ParentHome';
import { Customers } from './pages/Customers/Customers';
import { Products } from './pages/Products/Products';
import { Business } from './pages/Business/Business';
import { NotFound } from './pages/NotFound/NotFound';
import FounderAgreementPortal from './pages/FounderAgreement/FounderAgreementPortal';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <Routes>
          {/* Main Root Domain Landing — Founder Agreement Portal Directly on Root */}
          <Route path="/" element={<FounderAgreementPortal />} />
          <Route path="/founder-agreement" element={<FounderAgreementPortal />} />
          <Route path="/agreement" element={<FounderAgreementPortal />} />
          <Route path="/governance/founder-agreement" element={<FounderAgreementPortal />} />

          {/* Corporate Consumer & Product Routes */}
          <Route element={<MainLayout />}>
            <Route path="/corporate-home" element={<ParentHome />} />
            <Route path="/home" element={<ParentHome />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/b2c" element={<Customers />} />
            <Route path="/products" element={<Customers />} />
            <Route path="/business" element={<Business />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </NavigationProvider>
    </BrowserRouter>
  );
}

export default App;
