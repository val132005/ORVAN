// Validación de los datos: detecta errores al agregar o editar productos (npm test).
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import categories from './categories.json';
import products from './products.json';

const PUBLIC_DIR = fileURLToPath(new URL('../../public/', import.meta.url));
const PRODUCT_IMAGES_DIR = `${PUBLIC_DIR}assets/images/productos/`;
const GALLERY_KINDS = ['studio', 'scene', 'real'];

function imageFilesOf(product) {
  const gallery = product.gallery ?? [];
  return [product.image, product.imageLarge, ...gallery.flatMap((entry) => [entry.image, entry.imageLarge])].filter(Boolean);
}

function localPathOf(file) {
  if (/^https?:\/\//.test(file)) return null; // imágenes remotas: no se comprueban
  return file.startsWith('/') ? `${PUBLIC_DIR}${file.slice(1)}` : `${PRODUCT_IMAGES_DIR}${file}`;
}

describe('products.json', () => {
  it('tiene los campos obligatorios', () => {
    for (const product of products) {
      expect(product.id, JSON.stringify(product)).toBeTruthy();
      expect(product.name, product.id).toBeTruthy();
      expect(typeof product.price, product.id).toBe('number');
      expect(product.image, product.id).toBeTruthy();
      expect(product.category, product.id).toBeTruthy();
    }
  });

  it('no repite ids', () => {
    const ids = products.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('usa categorías existentes en categories.json', () => {
    const categoryIds = new Set(categories.map((category) => category.id));
    const unknown = products.filter((product) => !categoryIds.has(product.category)).map((product) => product.id);
    expect(unknown).toEqual([]);
  });

  it('usa tipos de imagen de galería válidos', () => {
    const invalid = products.flatMap((product) =>
      (product.gallery ?? []).filter((entry) => entry.kind && !GALLERY_KINDS.includes(entry.kind)).map(() => product.id),
    );
    expect(invalid).toEqual([]);
  });

  it('todas las imágenes referenciadas existen en public/assets/images/productos', () => {
    const missing = products.flatMap((product) =>
      imageFilesOf(product)
        .filter((file) => {
          const path = localPathOf(file);
          return path !== null && !existsSync(path);
        })
        .map((file) => `${product.id}: ${file}`),
    );
    expect(missing).toEqual([]);
  });
});
