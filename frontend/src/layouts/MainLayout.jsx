import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar/Navbar';
import { Footer } from '../components/common/Footer/Footer';
import { CustomCursor } from '../components/common/CustomCursor/CustomCursor';
import { useLocomotive } from '../hooks/useLocomotive';

export const MainLayout = () => {
  // Initialize smooth scroll engine (Locomotive / Lenis)
  useLocomotive();

  return (
    <div className="zuccano-app-root">
      {/* Interactive cursor follower */}
      <CustomCursor />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="zuccano-main-content">
        <Outlet />
      </main>

      {/* Corporate Group Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
