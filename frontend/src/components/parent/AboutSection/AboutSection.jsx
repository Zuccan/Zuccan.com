import React from 'react';
import { motion } from 'framer-motion';
import emblem3D from '../../../assets/zuccano-3d-emblem.png';
import './AboutSection.css';

export const AboutSection = () => {
  return (
    <section id="about" className="zuccano-about-section">
      <div className="container about-container">
        {/* Left Column: Typography & Core Principles */}
        <div className="about-content-col">
          {/* Section Kicker */}
          <span className="about-kicker">ABOUT ZUCCANO</span>

          {/* Main 3-line Headline with Red Dots */}
          <div className="about-headline-wrap">
            <h2 className="about-heading-line">Different</h2>
            <h2 className="about-heading-line">
              ideas<span className="dot-red" />
            </h2>
            <h2 className="about-heading-line">
              Real impact<span className="dot-red" />
            </h2>
          </div>

          {/* Paragraph Text replacing the 3 pillars */}
          <div className="about-paragraph-wrap">
            <p className="about-description-text">
              Zuccano is a next-generation technology group built on the conviction that everyday tools should feel effortless, while enterprise systems must remain relentlessly powerful. We design intuitive consumer experiences and high-performance business infrastructure that turn bold ideas into lasting reality.
            </p>
          </div>
        </div>

        {/* Right Column: 3D Sculpture Emblem with Realistic Shadows */}
        <div className="about-visual-col">
          <motion.div
            className="emblem-3d-wrapper"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The 3D Emblem Image */}
            <motion.img
              src={emblem3D}
              alt="Zuccano 3D Monogram Sculpture"
              className="emblem-3d-img"
              whileHover={{
                y: -6,
                rotateZ: -0.5,
                transition: { duration: 0.4, ease: 'easeOut' }
              }}
            />

            {/* Extra Ambient Floor Depth Shadow */}
            <div className="emblem-ground-shadow" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
