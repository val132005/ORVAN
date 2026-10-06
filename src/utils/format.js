import { LOCALE } from '../config/site.js';

const currencyFormatter = new Intl.NumberFormat(LOCALE.language, {
  style: 'currency',
  currency: LOCALE.currency,
  maximumFractionDigits: 0,
});

/** Precio con formato local: 89900 → "$ 89.900". */
export function formatPrice(amount) {
  return currencyFormatter.format(amount).replace(/\u00a0/g, ' ');
}

/** Número con separadores locales y decimales fijos: 22.5 → "22,5". */
export function formatNumber(value, decimals = 0) {
  return value.toLocaleString(LOCALE.language, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Rellena con ceros a la izquierda: 3 → "03". */
export function padNumber(value, length = 2) {
  return String(value).padStart(length, '0');
}
