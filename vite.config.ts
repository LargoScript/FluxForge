import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Використовуємо відносний шлях, щоб сайт працював у будь-якій папці/репозиторії
  base: './', 
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});