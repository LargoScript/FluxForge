import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Для GitHub Pages (project site): https://largoscript.github.io/FluxForge/
  base: process.env.NODE_ENV === 'production' ? '/FluxForge/' : './',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});