import { getSceneImage } from '../../utils/catalog.js';
import { cx } from '../../utils/classNames.js';
import { padNumber } from '../../utils/format.js';
import Icon from '../ui/Icon.jsx';
import ProductImage from './ProductImage.jsx';

/** Diapositiva del carrusel "En contexto": foto del producto en uso + resumen. */
export default function FeaturedSlide({ product, category, index, total, isCurrent, onOpen }) {
  return (
    <article
      className={cx('slide', isCurrent && 'is-current')}
      aria-roledescription="diapositiva"
      aria-label={`${index + 1} de ${total}: ${product.name}`}
    >
      <div className="slide__media">
        <ProductImage image={getSceneImage(product)} width="1440" height="1080" loading="lazy" />
      </div>
      <div className="slide__overlay">
        <span className="slide__count" aria-hidden="true">
          <b>{padNumber(index + 1)}</b> / {padNumber(total)}
        </span>
        <div>
          <p className="slide__label">{category.title}</p>
          <h3 className="slide__title">{product.name}</h3>
          <p className="slide__text">{product.summary}</p>
        </div>
        <button className="btn btn--ghost" type="button" onClick={() => onOpen(product.id)}>
          Ver detalle <Icon name="arrow" />
        </button>
      </div>
    </article>
  );
}
