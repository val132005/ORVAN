import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../utils/motion.js';

const DURATION_MS = 1400;
const easeOutCubic = (progress) => 1 - (1 - progress) ** 3;

/** Cuenta de 0 a `end` cuando `start` pasa a true. Con movimiento reducido muestra el valor final. */
export function useCountUp(end, start) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? end : 0));

  useEffect(() => {
    if (!start || prefersReducedMotion()) return undefined;

    let frame = 0;
    const startedAt = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - startedAt) / DURATION_MS);
      setValue(end * easeOutCubic(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, start]);

  return value;
}
