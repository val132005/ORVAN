import { BRAND, CONTACT } from '../config/brand.js';
import { WHATSAPP_CONFIG } from '../config/whatsapp.js';
import { buildProductMessage, buildWhatsAppUrl } from './whatsapp.js';

/**
 * Enlace para pedir un producto, o para pedir información general si no se pasa producto.
 * Prioridad: WhatsApp → correo → null (ningún canal configurado todavía).
 * Devuelve { channel: 'whatsapp' | 'email', href } o null.
 */
export function getContactLink(product = null) {
  const message = product
    ? buildProductMessage(product, WHATSAPP_CONFIG.productMessage)
    : WHATSAPP_CONFIG.generalMessage;

  const whatsappUrl = buildWhatsAppUrl(WHATSAPP_CONFIG.phoneNumber, message);
  if (whatsappUrl) return { channel: 'whatsapp', href: whatsappUrl };

  if (CONTACT.email) {
    const subject = product ? `Pedido: ${product.name} (${product.id})` : `Información: catálogo ${BRAND.name}`;
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    return { channel: 'email', href };
  }

  return null;
}
