import { cx } from '../../utils/classNames.js';

/** Icono del sprite (src/assets/icons/sprite.svg). `name` es el id del símbolo sin el prefijo "i-". */
export default function Icon({ name, size, className }) {
  return (
    <svg className={cx('icon', size === 'sm' && 'icon--sm', className)} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
