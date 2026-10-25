import React from 'react';
import { Hero } from '../../components/parent/Hero/Hero';
import { AboutSection } from '../../components/parent/AboutSection/AboutSection';
import { Ecosystem } from '../../components/parent/Ecosystem/Ecosystem';
import { TeamSection } from '../../components/parent/TeamSection/TeamSection';

import './ParentHome.css';

export const ParentHome = () => {
  return (
    <div className="parent-home-page">
      {/* 1. Hero */}
      <Hero />

      {/* 2. About — Different ideas. Real impact. */}
      <AboutSection />

      {/* 3. Two Pillars. One Vision. */}
      <Ecosystem />

      {/* 4. Three People. One Direction. */}
      <TeamSection />

      {/* 5. Corporate Stats & Enterprise Scale */}
      
    </div>
  );
};

export default ParentHome;
