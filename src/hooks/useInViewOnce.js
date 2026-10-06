import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../utils/motion.js';

/**
 * true en cuanto el elemento entra en pantalla (y se queda en true).
 * Con movimiento reducido o sin IntersectionObserver devuelve true de inmediato.
 * Pasa un objeto de opciones estable (definido fuera del componente).
 */
export function useInViewOnce(ref, options) {
  const [isInView, setIsInView] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === 'undefined',
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || isInView) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options, isInView]);

  return isInView;
}
