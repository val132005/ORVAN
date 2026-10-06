import { useEffect } from 'react';
import { prefersReducedMotion } from '../utils/motion.js';

/** Desplaza el elemento en vertical al hacer scroll (factor 0.06 = 6 % del recorrido). */
export function useParallax(ref, factor) {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = Math.min(window.scrollY, window.innerHeight) * factor;
      element.style.translate = `0 ${offset}px`;
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref, factor]);
}
