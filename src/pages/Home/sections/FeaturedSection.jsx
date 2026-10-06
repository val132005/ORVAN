import FeaturedSlide from '../../../components/product/FeaturedSlide.jsx';
import Icon from '../../../components/ui/Icon.jsx';
import Reveal from '../../../components/ui/Reveal.jsx';
import { useCatalog } from '../../../context/catalog/useCatalog.js';
import { useSlider } from '../../../hooks/useSlider.js';

export default function FeaturedSection({ onOpenProduct }) {
  const { products, getCategory } = useCatalog();
  const { trackRef, currentIndex, goTo, handleKeyDown } = useSlider(products.length);

  return (
    <section className="showcase section" id="destacados" aria-labelledby="destacados-title">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">En contexto</p>
            <h2 className="section-title" id="destacados-title">Hechos para tu día a día</h2>
          </div>
          <div className="slider-nav">
            <button className="icon-btn" type="button" aria-label="Anterior" disabled={currentIndex === 0} onClick={() => goTo(currentIndex - 1)}>
              <Icon name="left" />
            </button>
            <button className="icon-btn" type="button" aria-label="Siguiente" disabled={currentIndex >= products.length - 1} onClick={() => goTo(currentIndex + 1)}>
              <Icon name="right" />
            </button>
          </div>
        </Reveal>
      </div>

      <div className="slider">
        <div ref={trackRef} className="slider__track" tabIndex={0} aria-label="Productos en contexto" onKeyDown={handleKeyDown}>
          {products.map((product, index) => (
            <FeaturedSlide
              key={product.id}
              product={product}
              category={getCategory(product.category)}
              index={index}
              total={products.length}
              isCurrent={index === currentIndex}
              onOpen={onOpenProduct}
            />
          ))}
        </div>
      </div>

      <div className="slider__dots" role="tablist" aria-label="Seleccionar diapositiva">
        {products.map((product, index) => (
          <button
            key={product.id}
            type="button"
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Ir a ${product.name}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
