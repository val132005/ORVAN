/**
 * Capa de datos del catálogo.
 *
 * Hoy lee los JSON locales de src/data. Para migrar a una API, Firebase, Supabase
 * o un CMS basta con reemplazar fetchRawProducts / fetchRawCategories: el resto de
 * la aplicación solo conoce getCatalog() y la forma normalizada que devuelve.
 */
import rawProducts from '../data/products.json';
import rawCategories from '../data/categories.json';
import { ASSET_PATHS, GALLERY_LABELS } from '../config/site.js';

const ABSOLUTE_URL = /^(?:[a-z][a-z\d+.-]*:)?\/\//i;
const DEFAULT_IMAGE_KIND = 'studio';
const DEFAULT_CATEGORY_ICON = 'grid';

async function fetchRawProducts() {
  return rawProducts;
}

async function fetchRawCategories() {
  return rawCategories;
}

/**
 * Convierte el nombre de archivo del JSON en una ruta servible.
 * 'aut-001-estudio-720.webp' → '/assets/images/productos/aut-001-estudio-720.webp'.
 * Las rutas absolutas ('/…') y las URL completas (CDN, API) se respetan tal cual.
 */
export function resolveImagePath(file, folder = ASSET_PATHS.productImages) {
  if (!file) return null;
  return ABSOLUTE_URL.test(file) || file.startsWith('/') ? file : `${folder}${file}`;
}

function normalizeImage({ kind = DEFAULT_IMAGE_KIND, image, imageLarge, alt }, fallbackAlt) {
  return {
    kind,
    label: GALLERY_LABELS[kind] ?? GALLERY_LABELS[DEFAULT_IMAGE_KIND],
    src: resolveImagePath(image),
    srcLarge: resolveImagePath(imageLarge),
    alt: alt ?? fallbackAlt,
    isReal: kind === 'real',
  };
}

/** Completa los campos opcionales para que la interfaz no tenga que comprobarlos. */
export function normalizeProduct(raw) {
  const image = normalizeImage({ image: raw.image, imageLarge: raw.imageLarge, alt: raw.imageAlt }, raw.name);
  const gallery = raw.gallery?.length
    ? raw.gallery.map((entry) => normalizeImage(entry, raw.name))
    : [image];

  return {
    id: raw.id,
    name: raw.name,
    subtitle: raw.subtitle ?? '',
    category: raw.category,
    brand: raw.brand ?? null,
    price: Number(raw.price),
    available: raw.available !== false,
    featured: raw.featured === true,
    badges: raw.badges ?? [],
    summary: raw.summary ?? raw.description ?? '',
    description: raw.description ?? '',
    features: raw.features ?? [],
    highlights: raw.highlights ?? [],
    includes: raw.includes ?? [],
    specsSource: raw.specsSource ?? '',
    image,
    gallery,
  };
}

export function normalizeCategory(raw) {
  return {
    id: raw.id,
    name: raw.name,
    title: raw.title ?? raw.name,
    icon: raw.icon ?? DEFAULT_CATEGORY_ICON,
  };
}

/** Punto de entrada único de la interfaz: { products, categories } normalizados. */
export async function getCatalog() {
  const [products, categories] = await Promise.all([fetchRawProducts(), fetchRawCategories()]);
  return {
    products: products.map(normalizeProduct),
    categories: categories.map(normalizeCategory),
  };
}
