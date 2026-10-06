import { ALL_CATEGORIES, countByCategory } from '../../utils/catalog.js';
import Icon from '../ui/Icon.jsx';
import Reveal from '../ui/Reveal.jsx';

/** Botones de filtro por categoría, con el número de productos de cada una. */
export default function CategoryFilters({ products, categories, activeCategory, onSelect }) {
  const counts = countByCategory(products);
  const chips = [
    { id: ALL_CATEGORIES, name: 'Todos', icon: 'grid', count: products.length },
    ...categories.filter((category) => counts[category.id]).map((category) => ({ ...category, count: counts[category.id] })),
  ];

  return (
    <Reveal className="filters" role="group" aria-label="Filtrar por categoría" delay={1}>
      {products.length > 0 &&
        chips.map((chip) => (
          <button
            key={chip.id}
            className="chip"
            type="button"
            aria-pressed={chip.id === activeCategory}
            onClick={() => onSelect(chip.id)}
          >
            <Icon name={chip.icon} />
            <span>{chip.name}</span>
            <span className="chip__count">{chip.count}</span>
          </button>
        ))}
    </Reveal>
  );
}
