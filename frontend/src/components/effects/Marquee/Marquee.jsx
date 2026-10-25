import React from 'react';
import './Marquee.css';

export const Marquee = ({
  items = [],
  speed = 25,
  direction = 'left',
  className = '',
}) => {
  return (
    <div className={`zuccano-marquee ${className}`}>
      <div
        className={`marquee-track ${direction === 'right' ? 'marquee-reverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="marquee-content">
          {items.map((item, idx) => (
            <div key={idx} className="marquee-item">
              {item}
            </div>
          ))}
        </div>
        {/* Duplicate track for seamless infinite loop */}
        <div className="marquee-content" aria-hidden="true">
          {items.map((item, idx) => (
            <div key={`dup-${idx}`} className="marquee-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
