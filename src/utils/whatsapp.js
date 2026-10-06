/**
 * Lógica de pedidos por WhatsApp: funciones puras, sin React ni configuración.
 * La configuración (número y plantillas) vive en src/config/whatsapp.js.
 */
import { formatPrice } from './format.js';

const WHATSAPP_BASE_URL = 'https://wa.me/';
const PLACEHOLDER = /\{([^{}]+)\}/g;

/** Deja solo los dígitos: '+57 300 123 4567' → '573001234567'. */
export function normalizePhoneNumber(phone = '') {
  return String(phone).replace(/\D/g, '');
}

/** Sustituye {marcadores}; los desconocidos se dejan tal cual para que el error sea visible. */
export function fillTemplate(template, values) {
  return template.replace(PLACEHOLDER, (match, key) => values[key.trim()] ?? match);
}

/** Valores disponibles para la plantilla de pedido de un producto. */
export function getProductMessageValues(product) {
  return {
    producto: product.name,
    codigo: product.id,
    precio: formatPrice(product.price),
  };
}

export function buildProductMessage(product, template) {
  return fillTemplate(template, getProductMessageValues(product));
}

/** Enlace wa.me con el mensaje codificado; null si no hay número configurado. */
export function buildWhatsAppUrl(phone, message = '') {
  const number = normalizePhoneNumber(phone);
  if (!number) return null;
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `${WHATSAPP_BASE_URL}${number}${query}`;
}
