import { prefersReducedMotion } from './motion.js';

export const ALL_CATEGORIES = 'todos';
export const CATALOG_SECTION_ID = 'catalogo';
const CATEGORY_HASH_PREFIX = '#categoria-';

export function matchesCategory(product, categoryId) {
  return categoryId === ALL_CATEGORIES || product.category === categoryId;
}

export function filterByCategory(products, categoryId) {
  return products.filter((product) => matchesCategory(product, categoryId));
}

/** { auto: 1, audio: 3, ... } */
export function countByCategory(products) {
  return products.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] ?? 0) + 1;
    return counts;
  }, {});
}

/** Solo las categorías que tienen al menos un producto. */
export function getUsedCategories(categories, products) {
  return categories.filter((category) => products.some((product) => product.category === category.id));
}

/** Imagen "en uso" del producto; si no tiene, la principal. */
export function getSceneImage(product) {
  return product.gallery.find((image) => image.kind === 'scene') ?? product.image;
}

/** Enlace directo a una categoría: #categoria-energia */
export function categoryHash(categoryId) {
  return `${CATEGORY_HASH_PREFIX}${categoryId}`;
}

export function readCategoryFromHash(hash) {
  return hash.startsWith(CATEGORY_HASH_PREFIX)
    ? decodeURIComponent(hash.slice(CATEGORY_HASH_PREFIX.length))
    : ALL_CATEGORIES;
}

export function scrollToCatalog() {
  document
    .getElementById(CATALOG_SECTION_ID)
    ?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
