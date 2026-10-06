import { describe, expect, it } from 'vitest';
import { getCatalog, normalizeProduct, resolveImagePath } from './catalogService.js';

describe('resolveImagePath', () => {
  it('antepone la carpeta de productos a un nombre de archivo', () => {
    expect(resolveImagePath('aut-001-estudio-720.webp')).toBe('/assets/images/productos/aut-001-estudio-720.webp');
  });

  it('respeta rutas absolutas y URL completas', () => {
    expect(resolveImagePath('/assets/images/productos/PROD-001.jpg')).toBe('/assets/images/productos/PROD-001.jpg');
    expect(resolveImagePath('https://cdn.ejemplo.com/a.jpg')).toBe('https://cdn.ejemplo.com/a.jpg');
  });

  it('devuelve null si no hay archivo', () => {
    expect(resolveImagePath(undefined)).toBeNull();
  });
});

describe('normalizeProduct', () => {
  const minimal = {
    id: 'PROD-001',
    name: 'Nombre del producto',
    description: 'Descripción del producto',
    price: 120000,
    image: '/assets/images/productos/PROD-001.jpg',
    category: 'audio',
    available: true,
  };

  it('acepta el esquema mínimo y completa los campos opcionales', () => {
    const product = normalizeProduct(minimal);
    expect(product.summary).toBe('Descripción del producto');
    expect(product.features).toEqual([]);
    expect(product.gallery).toHaveLength(1);
    expect(product.image).toMatchObject({ src: '/assets/images/productos/PROD-001.jpg', srcLarge: null, alt: 'Nombre del producto' });
  });

  it('marca el producto como agotado solo si available es false', () => {
    expect(normalizeProduct({ ...minimal, available: false }).available).toBe(false);
    expect(normalizeProduct({ ...minimal, available: undefined }).available).toBe(true);
  });

  it('traduce el tipo de imagen a su etiqueta visible', () => {
    const product = normalizeProduct({ ...minimal, gallery: [{ kind: 'real', image: 'x-real-1-960.webp' }] });
    expect(product.gallery[0]).toMatchObject({ label: 'Foto real', isReal: true, src: '/assets/images/productos/x-real-1-960.webp' });
  });
});

describe('getCatalog', () => {
  it('devuelve los productos y categorías del JSON normalizados', async () => {
    const { products, categories } = await getCatalog();
    expect(products.length).toBeGreaterThan(0);
    expect(categories.length).toBeGreaterThan(0);
    expect(products[0].image.src).toMatch(/^\/assets\/images\/productos\//);
  });
});
