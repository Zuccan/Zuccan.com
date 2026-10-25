import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import { MainLayout } from './layouts/MainLayout';
import { ParentHome } from './pages/ParentHome/ParentHome';
import { Customers } from './pages/Customers/Customers';
import { Products } from './pages/Products/Products';
import { Business } from './pages/Business/Business';
import { NotFound } from './pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Main Parent Company Website */}
            <Route path="/" element={<ParentHome />} />

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
    </BrowserRouter>
  );
}

export default App;
