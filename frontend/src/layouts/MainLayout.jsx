import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar/Navbar';
import { Footer } from '../components/common/Footer/Footer';
import { MobileRestrictionOverlay } from '../components/common/MobileRestrictionOverlay/MobileRestrictionOverlay';
import { useLocomotive } from '../hooks/useLocomotive';

export const MainLayout = () => {
  // Initialize smooth scroll engine (Locomotive / Lenis)
  useLocomotive();
  const location = useLocation();
  const isCustomLayout = location.pathname.startsWith('/customers') || location.pathname.startsWith('/b2c') || location.pathname.startsWith('/products');

  return (
    <div className="zuccano-app-root">
      {/* Mobile-Only Phone Access Restricted Screen (Hidden on Desktop) */}
      <MobileRestrictionOverlay />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="zuccano-main-content">
        <Outlet />
      </main>

      {/* Corporate Group Footer (hidden on standalone B2C and Products pages) */}
      {!isCustomLayout && <Footer />}
    </div>
  );
};

export default MainLayout;
