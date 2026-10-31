import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './layouts/MainLayout';
import { ParentHome } from './pages/ParentHome/ParentHome';
import { Customers } from './pages/Customers/Customers';
import { Products } from './pages/Products/Products';
import { Business } from './pages/Business/Business';
import { NotFound } from './pages/NotFound/NotFound';
import { EmployeeLogin } from './pages/EmployeePortal/EmployeeLogin';
import { EmployeeDashboard } from './pages/EmployeePortal/EmployeeDashboard';
import { PortalHome } from './pages/EmployeePortal/PortalHome';
import './App.css';

function App() {
  // Detect if current domain is zuccano.me or employee/portal subdomain
  const isEmployeeDomain =
    typeof window !== 'undefined' &&
    (window.location.hostname.includes('zuccano.me') ||
      window.location.hostname.startsWith('employee') ||
      window.location.hostname.startsWith('portal'));

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationProvider>
          <Routes>
            {/* ── EMPLOYEES PORTAL ROUTES (zuccano.me & /portal) ── */}
            <Route path="/portal" element={<PortalHome />} />
            <Route path="/workspaces" element={<PortalHome />} />
            <Route path="/select-product" element={<PortalHome />} />
            <Route path="/login" element={<EmployeeLogin />} />
            <Route path="/employee" element={<PortalHome />} />
            <Route path="/employee/login" element={<EmployeeLogin />} />
            <Route path="/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/portal/dashboard" element={<EmployeeDashboard />} />

            {/* ── PUBLIC ZUCCANO SITES & PAGES ── */}
            <Route element={<MainLayout />}>
              {/* If on zuccano.me root, serve the PortalHome product selector; otherwise public ParentHome */}
              <Route
                path="/"
                element={isEmployeeDomain ? <PortalHome /> : <ParentHome />}
              />

              {/* Child Landing 1: Zuccano for Customers / B2C */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/b2c" element={<Customers />} />

              {/* Products Showcase Section (Integrated into B2C Landing Page) */}
              <Route path="/products" element={<Customers />} />

              {/* Child Landing 2: Zuccano for Business */}
              <Route path="/business" element={<Business />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </NavigationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
