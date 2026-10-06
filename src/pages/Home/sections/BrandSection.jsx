import { Fragment } from 'react';
import Reveal from '../../../components/ui/Reveal.jsx';
import { BRAND } from '../../../config/brand.js';
import { useCatalog } from '../../../context/catalog/useCatalog.js';
import content from '../../../data/content.json';
import { padNumber } from '../../../utils/format.js';

export default function BrandSection() {
  const { categories } = useCatalog();
  // La cinta se duplica para que el bucle de la animación (-50 %) sea continuo.
  const marqueeWords = categories.map((category) => category.name);
  const marqueeItems = [...marqueeWords, ...marqueeWords];

  return (
    <section className="brand section" id="marca" aria-labelledby="marca-title">
      <div className="container brand__grid">
        <Reveal className="brand__intro">
          <p className="eyebrow">La marca</p>
          <h2 className="section-title" id="marca-title">Menos ruido.<br />Mejor tecnología.</h2>
        </Reveal>
        <Reveal className="brand__text" delay={1}>
          <p className="lead">
            {BRAND.name} nace para que elegir tecnología sea simple. En lugar de un catálogo infinito, reunimos pocos
            productos, bien escogidos, que resuelven necesidades concretas del día a día.
          </p>
          <p>Cada producto se presenta con su información real: qué hace, qué incluye y fotos del producto tal como lo recibirás.</p>
        </Reveal>
      </div>

      <div className="container pillars">
        {content.pillars.map((pillar, index) => (
          <Reveal as="article" key={pillar.title} className="pillar" delay={index}>
            <span className="pillar__num">{padNumber(index + 1)}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
          </Reveal>
        ))}
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {marqueeItems.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span>{word}</span>
              <i />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
