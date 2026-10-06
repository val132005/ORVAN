import { use } from 'react';
import { CatalogContext } from './CatalogContext.js';

/** { status, products, categories, error, getCategory } del catálogo. */
export function useCatalog() {
  const catalog = use(CatalogContext);
  if (!catalog) throw new Error('useCatalog debe usarse dentro de <CatalogProvider>.');
  return catalog;
}
