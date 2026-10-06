import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' genera rutas relativas: el build funciona en la raíz de un dominio o en una subcarpeta.
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
