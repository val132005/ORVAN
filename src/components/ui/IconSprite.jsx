import spriteMarkup from '../../assets/icons/sprite.svg?raw';

/** Inserta una sola vez el sprite de iconos; <Icon> referencia sus símbolos con <use>. */
export default function IconSprite() {
  return <div className="icon-sprite" aria-hidden="true" dangerouslySetInnerHTML={{ __html: spriteMarkup }} />;
}
