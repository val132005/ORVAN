import WhatsAppButton from '../../../components/contact/WhatsAppButton.jsx';
import Reveal from '../../../components/ui/Reveal.jsx';
import { BRAND } from '../../../config/brand.js';

export default function ContactSection() {
  return (
    <section className="cta section" id="contacto" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta__card">
          <div className="cta__orbit" aria-hidden="true" />
          <img className="cta__mark" src={BRAND.isotipo} alt="" width="72" height="47" />
          <h2 className="cta__title" id="cta-title">
            ¿Buscas la tecnología adecuada?<br />
            <span className="text-accent">Hablemos.</span>
          </h2>
          <p className="cta__text">
            Cuéntanos qué necesitas y te ayudamos a elegir. Atención directa desde {BRAND.location.city}.
          </p>
          <div className="cta__actions">
            <WhatsAppButton className="btn--lg">Solicitar información</WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
