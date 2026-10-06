import { cx } from '../../utils/classNames.js';

/** Etiquetas de la tarjeta. La primera se resalta si el producto es destacado. */
export default function ProductBadges({ product }) {
  return (
    <>
      {!product.available && <span className="badge">Agotado</span>}
      {product.badges.map((badge, index) => (
        <span key={badge} className={cx('badge', index === 0 && product.featured && 'badge--accent')}>
          {badge}
        </span>
      ))}
    </>
  );
}
