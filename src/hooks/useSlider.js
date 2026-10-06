import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../utils/motion.js';

const VISIBLE_RATIO = 0.6;

/**
 * Carrusel con scroll-snap: la diapositiva más visible es la actual.
 * Asigna trackRef al contenedor; sus hijos directos son las diapositivas.
 */
export function useSlider(slideCount) {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || slideCount === 0) return undefined;

    const slides = [...track.children];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= VISIBLE_RATIO) setCurrentIndex(slides.indexOf(entry.target));
      });
    }, { root: track, threshold: [VISIBLE_RATIO] });
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [slideCount]);

  const goTo = useCallback((index) => {
    const track = trackRef.current;
    const slide = track?.children[Math.max(0, Math.min(index, slideCount - 1))];
    if (!slide) return;
    const paddingLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({ left: slide.offsetLeft - paddingLeft, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [slideCount]);

  const handleKeyDown = useCallback((event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    goTo(currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }, [currentIndex, goTo]);

  return { trackRef, currentIndex, goTo, handleKeyDown };
}
