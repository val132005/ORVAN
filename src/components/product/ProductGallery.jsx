import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '../../utils/classNames.js';
import { prefersReducedMotion } from '../../utils/motion.js';
import Icon from '../ui/Icon.jsx';
import ProductImage from './ProductImage.jsx';

const SWITCH_DURATION_MS = 180;
const SWIPE_THRESHOLD_PX = 50;

const wrapIndex = (index, total) => ((index % total) + total) % total;

/**
 * Visor de imágenes del producto: miniaturas, flechas, teclado (← →), deslizar en móvil
 * y zoom 2x al tocar (el punto de zoom sigue al cursor).
 */
export default function ProductGallery({ images }) {
  const viewerRef = useRef(null);
  const touchStartX = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const total = images.length;
  const isSwitching = selectedIndex !== displayedIndex;
  const selected = images[selectedIndex];

  const goTo = useCallback((index) => {
    setIsZoomed(false);
    setSelectedIndex(wrapIndex(index, total));
  }, [total]);

  const step = useCallback((delta) => {
    setIsZoomed(false);
    setSelectedIndex((index) => wrapIndex(index + delta, total));
  }, [total]);

  // La imagen sale con un fundido y la nueva entra cuando termina.
  useEffect(() => {
    if (!isSwitching) return undefined;
    const timer = setTimeout(
      () => setDisplayedIndex(selectedIndex),
      prefersReducedMotion() ? 0 : SWITCH_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, [selectedIndex, isSwitching]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  const setZoomOrigin = (event) => {
    const viewer = viewerRef.current;
    const rect = viewer.getBoundingClientRect();
    viewer.style.setProperty('--zx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    viewer.style.setProperty('--zy', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleViewerClick = (event) => {
    if (event.target.closest('button')) return;
    setZoomOrigin(event);
    setIsZoomed((zoomed) => !zoomed);
  };

  const handleTouchEnd = (event) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null || isZoomed) return;
    const deltaX = event.changedTouches[0].clientX - startX;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX) step(deltaX < 0 ? 1 : -1);
  };

  const showArrow = (direction) => (event) => {
    event.stopPropagation();
    step(direction);
  };

  return (
    <div className="modal__gallery">
      <figure
        ref={viewerRef}
        className={cx('viewer', isZoomed && 'is-zoomed')}
        onClick={handleViewerClick}
        onPointerMove={(event) => isZoomed && setZoomOrigin(event)}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
        onTouchEnd={handleTouchEnd}
      >
        <ProductImage
          image={images[displayedIndex]}
          large
          width="1440"
          height="1440"
          className={cx(isSwitching && 'is-switching')}
        />
        <figcaption className="viewer__tag">
          <span className={cx('badge', selected.isReal && 'badge--accent')}>{selected.label}</span>
        </figcaption>
        {total > 1 && (
          <>
            <button className="icon-btn viewer__nav viewer__nav--prev" type="button" aria-label="Imagen anterior" onClick={showArrow(-1)}>
              <Icon name="left" />
            </button>
            <button className="icon-btn viewer__nav viewer__nav--next" type="button" aria-label="Imagen siguiente" onClick={showArrow(1)}>
              <Icon name="right" />
            </button>
          </>
        )}
        <span className="viewer__hint">
          <Icon name="zoom" size="sm" /> Toca para ampliar
        </span>
      </figure>

      <div className="thumbs" role="tablist" aria-label="Imágenes del producto">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            className="thumb"
            type="button"
            role="tab"
            aria-selected={index === selectedIndex}
            aria-label={`${image.label}: ${image.alt}`}
            onClick={() => goTo(index)}
          >
            <ProductImage image={image} alt="" loading="lazy" width="76" height="76" />
            {image.isReal && <span className="thumb__real">Real</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
