import React from 'react';
import { Hero } from '../../components/parent/Hero/Hero';
import { AboutSection } from '../../components/parent/AboutSection/AboutSection';
import { Ecosystem } from '../../components/parent/Ecosystem/Ecosystem';
import { StatsSection } from '../../components/parent/StatsSection/StatsSection';
import './ParentHome.css';

export const ParentHome = () => {
  return (
    <div className="parent-home-page">
      {/* 1. Official Reference Hero Section */}
      <Hero />

      {/* 2. Official About Section (Different ideas. Real impact. + 3D Shadow Sculpture) */}
      <AboutSection />

      {/* 3. The 2 Divisions: Zuccano for Business & Zuccano for Everyone */}
      <Ecosystem />

      {/* 4. Corporate Stats & Enterprise Scale */}
      <StatsSection />
    </div>
  );
};

export default ParentHome;
