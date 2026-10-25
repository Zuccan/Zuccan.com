import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Custom hook for GSAP text split-reveal animation
 * @param {Object} options - Animation configuration options
 */
export const useGsapText = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Split text animation or word stagger
      const words = el.querySelectorAll('.text-word');
      if (words.length > 0) {
        gsap.fromTo(
          words,
          {
            y: 50,
            opacity: 0,
            rotateX: 45,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: options.stagger || 0.05,
            duration: options.duration || 1,
            ease: options.ease || 'power3.out',
            delay: options.delay || 0.2,
          }
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: options.duration || 0.9,
            ease: 'power3.out',
            delay: options.delay || 0.1,
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [options.delay, options.duration, options.ease, options.stagger]);

  return elementRef;
};
