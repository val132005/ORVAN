import { BRAND } from '../../config/brand.js';
import { useCatalog } from '../../context/catalog/useCatalog.js';

/** Datos estructurados schema.org del catálogo (resultados enriquecidos en buscadores). */
export default function ProductJsonLd() {
  const { status, products, getCategory } = useCatalog();
  if (status !== 'ready' || products.length === 0) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Catálogo ${BRAND.name}`,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        sku: product.id,
        description: product.description,
        image: new URL(product.image.srcLarge ?? product.image.src, window.location.href).href,
        category: getCategory(product.category).title,
        ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'COP',
          availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
      },
    })),
  };

  // Escapa "<" para que el JSON no pueda cerrar la etiqueta <script>.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
