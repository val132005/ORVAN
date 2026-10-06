import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/classNames.js';
import { ToastContext } from './ToastContext.js';

const TOAST_DURATION_MS = 3200;

/**
 * Aviso flotante breve. El contenedor existe siempre para que los lectores de pantalla lo anuncien.
 * Un <dialog> modal se dibuja en la capa superior del navegador y taparía el aviso, así que mientras
 * haya uno abierto (setToastContainer) el aviso se renderiza dentro de él.
 */
export default function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [container, setContainer] = useState(null);
  const timerRef = useRef(0);

  const showToast = useCallback((text) => {
    setMessage(text);
    setIsVisible(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsVisible(false), TOAST_DURATION_MS);
  }, []);

  useEffect(() => {
    const timers = timerRef;
    return () => clearTimeout(timers.current);
  }, []);

  const value = useMemo(() => ({ showToast, setToastContainer: setContainer }), [showToast]);

  return (
    <ToastContext value={value}>
      {children}
      {createPortal(
        <div className={cx('toast', isVisible && 'is-visible')} role="status" aria-live="polite">
          {message}
        </div>,
        container ?? document.body,
      )}
    </ToastContext>
  );
}
