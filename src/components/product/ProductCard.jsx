import { useState } from 'react';
import { cx } from '../../utils/classNames.js';
import { formatPrice } from '../../utils/format.js';
import WhatsAppButton from '../contact/WhatsAppButton.jsx';
import Icon from '../ui/Icon.jsx';
import ProductBadges from './ProductBadges.jsx';
import ProductImage from './ProductImage.jsx';

/** Halo que sigue al cursor dentro de la tarjeta. */
function trackPointer(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  card.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

/**
 * Tarjeta de producto del catálogo.
 * `index` escalona la animación de entrada; `isHidden` la desvanece al cambiar de filtro.
 */
export default function ProductCard({ product, category, index, isHidden, onOpen }) {
  const [isEntering, setIsEntering] = useState(true);
  const openDetail = () => onOpen(product.id);

  return (
    <article
      className={cx('card', isEntering && 'is-entering', isHidden && 'is-hidden')}
      style={{ '--i': index }}
      onPointerMove={trackPointer}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setIsEntering(false);
      }}
    >
      <button className="card__media" type="button" onClick={openDetail} aria-label={`Ver galería de ${product.name}`}>
        <ProductImage image={product.image} width="720" height="720" loading="lazy" />
        <span className="card__badges">
          <ProductBadges product={product} />
        </span>
        <span className="card__zoom">
          <Icon name="zoom" size="sm" />
        </span>
      </button>

      <div className="card__body">
        <div className="card__meta">
          <span className="card__cat">
            <Icon name={category.icon} />
            {category.name}
          </span>
          <span>{product.id}</span>
        </div>
        <div>
          <h3 className="card__title">{product.name}</h3>
          {product.subtitle && <p className="card__subtitle">{product.subtitle}</p>}
        </div>
        <p className="card__text">{product.summary}</p>
        {product.highlights.length > 0 && (
          <ul className="card__specs" aria-label="Características principales">
            {product.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}
        <div className="card__foot">
          <p className="price">
            <small>Precio</small>
            {formatPrice(product.price)}
          </p>
          <div className="card__actions">
            <WhatsAppButton product={product} variant="icon" />
            <button className="btn btn--sm btn--primary" type="button" onClick={openDetail}>
              Ver detalle
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
