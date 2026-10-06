import { BRAND } from './brand.js';

const BASE_URL = import.meta.env.BASE_URL;

/** Carpetas públicas de imágenes (dentro de /public). */
export const ASSET_PATHS = {
  productImages: `${BASE_URL}assets/images/productos/`,
  heroImages: `${BASE_URL}assets/images/hero/`,
};

export const HERO_IMAGES = {
  small: `${ASSET_PATHS.heroImages}hero-coleccion-1024.webp`,
  large: `${ASSET_PATHS.heroImages}hero-coleccion-2048.webp`,
};

/** Menú principal: cada id corresponde a una sección de la página. */
export const NAV_LINKS = [
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'destacados', label: 'Destacados' },
  { id: 'marca', label: 'Marca' },
  { id: 'ventajas', label: `Por qué ${BRAND.name}` },
  { id: 'contacto', label: 'Contacto' },
];

export const FOOTER_LINKS = [
  { id: 'marca', label: 'La marca' },
  { id: 'ventajas', label: `Por qué ${BRAND.name}` },
  { id: 'destacados', label: 'Destacados' },
  { id: 'contacto', label: 'Contacto' },
];

/** Idioma y moneda para precios y cifras. */
export const LOCALE = { language: 'es-CO', currency: 'COP' };

/** Etiqueta visible de cada tipo de imagen de la galería (campo "kind" en products.json). */
export const GALLERY_LABELS = {
  studio: 'Catálogo',
  scene: 'En uso',
  real: 'Foto real',
};

export const UI_MESSAGES = {
  contactUnavailable: 'Nuestro canal de contacto estará disponible muy pronto.',
  catalogError: 'No pudimos cargar el catálogo. Intenta recargar la página.',
};
