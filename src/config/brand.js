import logo from '../assets/images/logo/orvan-logo-fondo-oscuro.svg';
import isotipo from '../assets/images/logo/orvan-simbolo-fondo-oscuro.svg';

/**
 * Identidad e información general de la tienda.
 * Los colores de la marca viven en src/styles/tokens.css (variables CSS).
 */
export const BRAND = {
  name: 'ORVAN',
  tagline: 'Tecnología bien elegida.',
  logo,
  isotipo,
  location: { city: 'Bogotá', country: 'Colombia' },
};

/** Canales de contacto. Rellena solo con datos reales: lo que quede vacío no se muestra. */
export const CONTACT = {
  email: '', // PENDIENTE: correo de contacto
};

/** Redes sociales (URL completa, p. ej. 'https://instagram.com/orvan.co'). Lo vacío no se muestra. */
export const SOCIAL_LINKS = {
  instagram: '',
  tiktok: '',
  facebook: '',
};

export const LEGAL_NOTICE =
  'Garantía legal y derecho de retracto en compras a distancia según la Ley 1480 de 2011. ' +
  'Las marcas de terceros mencionadas pertenecen a sus titulares.';
