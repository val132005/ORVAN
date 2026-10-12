import { useRef } from 'react';
import Icon from '../../../components/ui/Icon.jsx';
import { BRAND } from '../../../config/brand.js';
import { HERO_IMAGES } from '../../../config/site.js';
import { useParallax } from '../../../hooks/useParallax.js';

const PARALLAX_FACTOR = 0.06;

export default function HeroSection({ categoryCount }) {
  const imageRef = useRef(null);
  useParallax(imageRef, PARALLAX_FACTOR);

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow" />
      </div>
      <div className="hero__media" aria-hidden="true">
        <picture>
          <source media="(min-width: 900px)" srcSet={HERO_IMAGES.large} />
          <img ref={imageRef} src={HERO_IMAGES.small} alt="" width="2048" height="1536" fetchPriority="high" />
        </picture>
        <svg className="hero__orbit" viewBox="0 0 400 400" aria-hidden="true">
          <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 10" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5" />
          <circle className="hero__satellite" cx="350" cy="200" r="4" />
        </svg>
      </div>

      <div className="container hero__content">
        <p className="eyebrow hero__in" style={{ '--d': 0 }}>{BRAND.name} · Tecnología seleccionada</p>
        <h1 className="hero__title hero__in" id="hero-title" style={{ '--d': 1 }}>
          Tecnología<br />
          <span className="text-accent">bien elegida.</span>
        </h1>
        <p className="hero__lead hero__in" style={{ '--d': 2 }}>
          Seleccionamos tecnología útil para tu auto, tu contenido, tu hogar y tu música.
          Elegida con criterio, explicada con claridad y respaldada desde {BRAND.location.city}.
        </p>
        <div className="hero__actions hero__in" style={{ '--d': 3 }}>
          <a className="btn btn--primary" href="#catalogo">
            Explorar catálogo
            <Icon name="arrow" />
          </a>
          <a className="btn btn--ghost" href="#destacados">Ver destacados</a>
        </div>
        <ul className="hero__facts hero__in" style={{ '--d': 4 }} aria-label="En resumen">
          <li><strong>{categoryCount}</strong> categorías</li>
          <li><strong>Fotos</strong> reales del producto</li>
          <li><strong>Garantía</strong> legal</li>
        </ul>
      </div>
      <a className="hero__scroll" href="#marca" aria-label="Bajar a la presentación de la marca"><span /></a>
    </section>
  );
}
