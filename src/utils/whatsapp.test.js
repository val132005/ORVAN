import { describe, expect, it } from 'vitest';
import { WHATSAPP_CONFIG } from '../config/whatsapp.js';
import { buildProductMessage, buildWhatsAppUrl, fillTemplate, normalizePhoneNumber } from './whatsapp.js';

const product = { id: 'PROD-001', name: 'Camiseta Nike Air Max', price: 120000 };

describe('fillTemplate', () => {
  it('sustituye los marcadores conocidos', () => {
    expect(fillTemplate('Hola {producto}', { producto: 'Parlante' })).toBe('Hola Parlante');
  });

  it('deja visibles los marcadores desconocidos', () => {
    expect(fillTemplate('Hola {Producto}', { producto: 'Parlante' })).toBe('Hola {Producto}');
  });
});

describe('buildProductMessage', () => {
  it('genera el mensaje con nombre, código y precio usando la plantilla configurada', () => {
    expect(buildProductMessage(product, WHATSAPP_CONFIG.productMessage)).toBe(
      'Hola, estoy interesado en comprar el producto: Camiseta Nike Air Max.\nCódigo: PROD-001\nPrecio: $ 120.000',
    );
  });
});

describe('buildWhatsAppUrl', () => {
  it('devuelve null si no hay número', () => {
    expect(buildWhatsAppUrl('', 'Hola')).toBeNull();
  });

  it('limpia el número y codifica el mensaje', () => {
    expect(buildWhatsAppUrl('+57 300 123 4567', 'Hola & cía\nPrecio: $ 1')).toBe(
      'https://wa.me/573001234567?text=Hola%20%26%20c%C3%ADa%0APrecio%3A%20%24%201',
    );
  });

  it('omite el texto si no hay mensaje', () => {
    expect(buildWhatsAppUrl('573001234567')).toBe('https://wa.me/573001234567');
  });
});

describe('normalizePhoneNumber', () => {
  it('deja solo dígitos', () => {
    expect(normalizePhoneNumber('(+57) 300-123-4567')).toBe('573001234567');
  });
});
