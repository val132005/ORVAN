import { useEffect, useRef } from 'react';
import { useToast } from '../../context/toast/useToast.js';
import { formatPrice } from '../../utils/format.js';
import WhatsAppButton from '../contact/WhatsAppButton.jsx';
import Icon from '../ui/Icon.jsx';
import ProductGallery from './ProductGallery.jsx';

/** "Teclop PWTL-20 · 20.000 mAh" y, si la marca no aparece ya en el subtítulo, " · Marca X". */
function buildSubtitle({ subtitle, brand }) {
  const brandText = brand && !subtitle.includes(brand) ? `Marca ${brand}` : null;
  return [subtitle, brandText].filter(Boolean).join(' · ');
}

/**
 * Ficha de producto en un <dialog> nativo: Escape, clic en el fondo o el botón la cierran,
 * y el foco vuelve al elemento que la abrió.
 */
export default function ProductModal({ product, category, onClose }) {
  const dialogRef = useRef(null);
  const { setToastContainer } = useToast();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    setToastContainer(dialog); // el aviso debe verse por encima del modal
    return () => {
      document.body.style.overflow = '';
      setToastContainer(null);
    };
  }, [setToastContainer]);

  const close = () => dialogRef.current?.close();
  const subtitle = buildSubtitle(product);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) close(); // clic en el fondo
      }}
    >
      <div className="modal__inner">
        <button className="icon-btn modal__close" type="button" aria-label="Cerrar" onClick={close}>
          <Icon name="close" />
        </button>

        <ProductGallery key={product.id} images={product.gallery} />

        <div className="modal__info">
          <div>
            <span className="modal__cat">
              <Icon name={category.icon} size="sm" />
              {category.title}
            </span>
            <h2 className="modal__title" id="modal-title">{product.name}</h2>
            {subtitle && <p className="modal__subtitle">{subtitle}</p>}
          </div>

          <p className="modal__desc">{product.description}</p>

          {product.features.length > 0 && (
            <div className="modal__block">
              <h3>Características principales</h3>
              <ul className="feature-list">
                {product.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.includes.length > 0 && (
            <div className="modal__block">
              <h3>Qué incluye</h3>
              <ul className="includes">
                {product.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {product.specsSource && <p className="modal__source">{product.specsSource}</p>}

          <div className="modal__buy">
            <div>
              <p className="price">
                <small>Precio</small>
                {formatPrice(product.price)}
              </p>
              <p className="sku">REF. {product.id}</p>
            </div>
            <WhatsAppButton product={product} />
          </div>
        </div>
      </div>
    </dialog>
  );
}
