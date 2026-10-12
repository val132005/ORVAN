import { BRAND, CONTACT, LEGAL_NOTICE, SOCIAL_LINKS } from '../../config/brand.js';
import { FOOTER_LINKS } from '../../config/site.js';
import { WHATSAPP_CONFIG } from '../../config/whatsapp.js';
import { useCatalog } from '../../context/catalog/useCatalog.js';
import { categoryHash, getUsedCategories, scrollToCatalog } from '../../utils/catalog.js';
import { buildWhatsAppUrl } from '../../utils/whatsapp.js';
import Icon from '../ui/Icon.jsx';

const CURRENT_YEAR = new Date().getFullYear();

// Si esa categoría ya está filtrada el hash no cambia, así que llevamos al catálogo a mano.
function handleCategoryLinkClick(event) {
  if (window.location.hash === event.currentTarget.getAttribute('href')) {
    event.preventDefault();
    scrollToCatalog();
  }
}

export default function Footer() {
  const { categories, products } = useCatalog();
  const whatsappUrl = buildWhatsAppUrl(WHATSAPP_CONFIG.phoneNumber, WHATSAPP_CONFIG.generalMessage);
  const socialLinks = Object.entries(SOCIAL_LINKS).filter(([, url]) => url);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={BRAND.logoVertical} alt={BRAND.name} width="160" height="78" />
          <p>{BRAND.tagline}</p>
          <p className="footer__muted">
            <Icon name="pin" size="sm" /> <span>{BRAND.location.city}, {BRAND.location.country}</span>
          </p>
        </div>

        <nav className="footer__col" aria-label="Catálogo">
          <h3>Catálogo</h3>
          <ul>
            {getUsedCategories(categories, products).map((category) => (
              <li key={category.id}>
                <a href={categoryHash(category.id)} onClick={handleCategoryLinkClick}>{category.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label={BRAND.name}>
          <h3>{BRAND.name}</h3>
          <ul>
            {FOOTER_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h3>Contacto</h3>
          <ul>
            {whatsappUrl && (
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </li>
            )}
            {CONTACT.email && (
              <li>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
            )}
            <li>
              <a href="#contacto">Solicitar información</a>
            </li>
          </ul>
          {socialLinks.length > 0 && (
            <div className="socials">
              {socialLinks.map(([network, url]) => (
                <a key={network} className="icon-btn" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${BRAND.name} en ${network}`}>
                  <Icon name={network} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container footer__legal">
        <p>© {CURRENT_YEAR} {BRAND.name}. Todos los derechos reservados.</p>
        <p>{LEGAL_NOTICE}</p>
      </div>
    </footer>
  );
}
