import { useEffect, useMemo, useState } from 'react';
import { getCatalog } from '../../services/catalogService.js';
import { CatalogContext } from './CatalogContext.js';

const INITIAL_STATE = { status: 'loading', products: [], categories: [], error: null };

/** Carga el catálogo una sola vez y lo comparte con toda la aplicación. */
export default function CatalogProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    let isActive = true;
    getCatalog()
      .then(({ products, categories }) => {
        if (isActive) setState({ status: 'ready', products, categories, error: null });
      })
      .catch((error) => {
        if (isActive) setState({ ...INITIAL_STATE, status: 'error', error });
      });
    return () => {
      isActive = false;
    };
  }, []);

  const value = useMemo(() => {
    const categoriesById = new Map(state.categories.map((category) => [category.id, category]));
    const getCategory = (id) => categoriesById.get(id) ?? { id, name: id, title: id, icon: 'grid' };
    return { ...state, getCategory };
  }, [state]);

  return <CatalogContext value={value}>{children}</CatalogContext>;
}
