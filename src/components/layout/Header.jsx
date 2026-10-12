import { useState } from 'react';
import { BRAND } from '../../config/brand.js';
import { NAV_LINKS } from '../../config/site.js';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import { useScrolled } from '../../hooks/useScrolled.js';
import { cx } from '../../utils/classNames.js';
import Icon from '../ui/Icon.jsx';

const SCROLL_THRESHOLD_PX = 24;

export default function Header() {
  const isScrolled = useScrolled(SCROLL_THRESHOLD_PX);
  const activeSectionId = useActiveSection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={cx('nav', isScrolled && 'is-scrolled', isMenuOpen && 'is-open')}>
      <div className="nav__inner container">
        <a className="nav__brand" href="#inicio" aria-label={`${BRAND.name}, ir al inicio`}>
          <img src={BRAND.logo} alt={BRAND.name} width="150" height="23" />
        </a>
        <nav className="nav__links" id="menu" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cx(activeSectionId === link.id && 'is-active')}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--sm btn--ghost nav__cta" href="#catalogo">Explorar</a>
        <button
          className="nav__toggle"
          type="button"
          aria-controls="menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <Icon name="menu" />
        </button>
      </div>
    </header>
  );
}
