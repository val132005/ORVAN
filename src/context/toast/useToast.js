import { use } from 'react';
import { ToastContext } from './ToastContext.js';

/** { showToast(texto) } */
export function useToast() {
  const toast = use(ToastContext);
  if (!toast) throw new Error('useToast debe usarse dentro de <ToastProvider>.');
  return toast;
}
