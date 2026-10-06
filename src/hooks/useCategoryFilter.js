import { useCallback, useEffect, useState } from 'react';
import {
  ALL_CATEGORIES,
  CATALOG_SECTION_ID,
  categoryHash,
  readCategoryFromHash,
  scrollToCatalog,
} from '../utils/catalog.js';

/**
 * Categoría activa del catálogo, sincronizada con la URL (#categoria-<id>).
 * Permite compartir enlaces a una categoría y que los enlaces del footer filtren el catálogo.
 */
export function useCategoryFilter(categories) {
  const [requestedCategory, setRequestedCategory] = useState(() => readCategoryFromHash(window.location.hash));

  useEffect(() => {
    if (readCategoryFromHash(window.location.hash) !== ALL_CATEGORIES) requestAnimationFrame(scrollToCatalog);

    const handleHashChange = () => {
      const categoryId = readCategoryFromHash(window.location.hash);
      if (categoryId === ALL_CATEGORIES) return;
      setRequestedCategory(categoryId);
      scrollToCatalog();
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const selectCategory = useCallback((categoryId) => {
    setRequestedCategory(categoryId);
    const hash = categoryId === ALL_CATEGORIES ? `#${CATALOG_SECTION_ID}` : categoryHash(categoryId);
    if (window.location.hash !== hash) window.history.replaceState(null, '', hash);
  }, []);

  const isKnownCategory = categories.some((category) => category.id === requestedCategory);
  return { activeCategory: isKnownCategory ? requestedCategory : ALL_CATEGORIES, selectCategory };
}
