/** Une clases CSS ignorando valores falsy: cx('card', isOpen && 'is-open'). */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ') || undefined;
}
