import CategoryFilters from '../../../components/product/CategoryFilters.jsx';
import ProductGrid from '../../../components/product/ProductGrid.jsx';
import Reveal from '../../../components/ui/Reveal.jsx';
import { UI_MESSAGES } from '../../../config/site.js';
import { useCatalog } from '../../../context/catalog/useCatalog.js';
import { useCategoryFilter } from '../../../hooks/useCategoryFilter.js';
import { ALL_CATEGORIES, filterByCategory } from '../../../utils/catalog.js';

export default function CatalogSection({ onOpenProduct }) {
  const { status, products, categories, getCategory } = useCatalog();
  const { activeCategory, selectCategory } = useCategoryFilter(categories);

  const visibleCount = filterByCategory(products, activeCategory).length;
  const scope = activeCategory === ALL_CATEGORIES ? 'todas las categorías' : getCategory(activeCategory).title;
  const filterStatus =
    status === 'ready' ? `Mostrando ${visibleCount} ${visibleCount === 1 ? 'producto' : 'productos'} de ${scope}.` : '';

  return (
    <section className="catalog section" id="catalogo" aria-labelledby="catalogo-title">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Colección actual</p>
            <h2 className="section-title" id="catalogo-title">Catálogo</h2>
          </div>
          <p className="section-head__note">
            Precios en pesos colombianos. Toca un producto para ver su galería, fotos reales y todo lo que incluye.
          </p>
        </Reveal>

        <CategoryFilters
          products={products}
          categories={categories}
          activeCategory={activeCategory}
          onSelect={selectCategory}
        />
        <p className="sr-only" aria-live="polite">{filterStatus}</p>

        {status === 'error' ? (
          <p className="catalog__message" role="alert">{UI_MESSAGES.catalogError}</p>
        ) : (
          <ProductGrid
            products={products}
            activeCategory={activeCategory}
            getCategory={getCategory}
            onOpenProduct={onOpenProduct}
          />
        )}
      </div>
    </section>
  );
}
