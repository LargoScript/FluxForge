import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ВАЖЛИВО: Замініть <REPO_NAME> на назву вашого репозиторію, наприклад '/flux-forge/'
  // Якщо ви деплоїте на user.github.io (без підпапки), видаліть цей рядок або залиште '/'
  base: '/<REPO_NAME>/', 
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});