import { useRef } from 'react';
import Icon from '../../../components/ui/Icon.jsx';
import Reveal from '../../../components/ui/Reveal.jsx';
import { BRAND } from '../../../config/brand.js';
import content from '../../../data/content.json';
import { useCountUp } from '../../../hooks/useCountUp.js';
import { useInViewOnce } from '../../../hooks/useInViewOnce.js';
import { formatNumber } from '../../../utils/format.js';

const COUNTER_OPTIONS = { threshold: 0.6 };

/** Cifra que cuenta desde 0 cuando entra en pantalla. */
function Stat({ stat, index }) {
  const numberRef = useRef(null);
  const isInView = useInViewOnce(numberRef, COUNTER_OPTIONS);
  const value = useCountUp(stat.value, isInView);

  return (
    <Reveal as="li" className="stat" delay={index}>
      <strong>
        <span ref={numberRef}>{formatNumber(value, stat.decimals)}</span>
        <small>{stat.unit}</small>
      </strong>
      <span>{stat.label}</span>
    </Reveal>
  );
}

export default function PerksSection() {
  return (
    <section className="perks section" id="ventajas" aria-labelledby="ventajas-title">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Por qué {BRAND.name}</p>
          <h2 className="section-title" id="ventajas-title">Comprar tecnología, sin adivinar</h2>
        </Reveal>

        <div className="perks__grid">
          {content.perks.map((perk, index) => (
            <Reveal as="article" key={perk.title} className="perk" delay={index}>
              <span className="perk__icon"><Icon name={perk.icon} /></span>
              <h3>{perk.title}</h3>
              <p>{perk.text}</p>
            </Reveal>
          ))}
        </div>

        {/* Cifras reales tomadas de los productos del catálogo (src/data/content.json) */}
        <ul className="stats" aria-label="Cifras del catálogo">
          {content.stats.map((stat, index) => (
            <Stat key={stat.label} stat={stat} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
