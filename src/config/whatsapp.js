/**
 * Pedidos por WhatsApp.
 *
 * - phoneNumber: número con indicativo de país, solo dígitos (p. ej. '573001234567').
 *   Mientras esté vacío, los botones de pedido muestran un aviso en lugar de abrir WhatsApp.
 * - productMessage: mensaje que se envía al pedir un producto. Marcadores disponibles:
 *     {producto} → nombre del producto
 *     {codigo}   → referencia (id del producto)
 *     {precio}   → precio con formato, p. ej. "$ 120.000"
 *   Usa \n para saltos de línea.
 * - generalMessage: mensaje del botón "Solicitar información" (sin producto).
 */
export const WHATSAPP_CONFIG = {
  phoneNumber: '573019346295', // +57 324 458 4528
  productMessage:
    'Hola, estoy interesado en comprar el producto: {producto}.\nCódigo: {codigo}\nPrecio: {precio}',
  generalMessage: 'Hola ORVAN, quiero información sobre el catálogo.',
};
