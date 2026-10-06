import { useRef } from 'react';
import { useInViewOnce } from '../../hooks/useInViewOnce.js';
import { cx } from '../../utils/classNames.js';

const REVEAL_OPTIONS = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

/**
 * Aparece con un desplazamiento suave al entrar en pantalla.
 * Renderiza el elemento indicado en `as` (div por defecto) sin envoltorios extra.
 * `delay` escalona la entrada (0, 1, 2…).
 */
export default function Reveal({ as: Tag = 'div', delay, className, style, children, ...rest }) {
  const ref = useRef(null);
  const isVisible = useInViewOnce(ref, REVEAL_OPTIONS);
  const revealStyle = delay === undefined ? style : { ...style, '--d': delay };

  return (
    <Tag ref={ref} data-reveal="" className={cx(className, isVisible && 'is-visible')} style={revealStyle} {...rest}>
      {children}
    </Tag>
  );
}
