import { useEffect, useState } from 'react';

/** true cuando la página se ha desplazado más de `threshold` píxeles. */
export function useScrolled(threshold) {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > threshold);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
