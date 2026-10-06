/**
 * Imagen de producto. En pantallas de alta densidad usa la versión grande (2x) si existe.
 * `large` muestra directamente la versión grande (visor ampliado).
 */
export default function ProductImage({ image, large = false, ...imgProps }) {
  if (large) {
    return <img src={image.srcLarge ?? image.src} alt={image.alt} decoding="async" {...imgProps} />;
  }
  const srcSet = image.srcLarge ? `${image.src} 1x, ${image.srcLarge} 2x` : undefined;
  return <img src={image.src} srcSet={srcSet} alt={image.alt} decoding="async" {...imgProps} />;
}
