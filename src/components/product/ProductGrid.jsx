import { useEffect, useState } from 'react';
import { filterByCategory, matchesCategory } from '../../utils/catalog.js';
import { prefersReducedMotion } from '../../utils/motion.js';
import ProductCard from './ProductCard.jsx';

const LEAVE_DURATION_MS = 260;

/**
 * Cuadrícula de productos con transición al filtrar:
 * 1) se desvanecen las tarjetas que salen; 2) se reordena; 3) entran las nuevas escalonadas.
 */
export default function ProductGrid({ products, activeCategory, getCategory, onOpenProduct }) {
  const [shownCategory, setShownCategory] = useState(activeCategory);
  const isLeaving = shownCategory !== activeCategory;

  useEffect(() => {
    if (!isLeaving) return undefined;
    const timer = setTimeout(
      () => setShownCategory(activeCategory),
      prefersReducedMotion() ? 0 : LEAVE_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, [activeCategory, isLeaving]);

  return (
    // La key reinicia las tarjetas para que vuelvan a animar su entrada tras cada filtro.
    <div className="grid" key={shownCategory}>
      {filterByCategory(products, shownCategory).map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          category={getCategory(product.category)}
          index={index}
          isHidden={isLeaving && !matchesCategory(product, activeCategory)}
          onOpen={onOpenProduct}
        />
      ))}
    </div>
  );
}
