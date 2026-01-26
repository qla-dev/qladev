import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths so assets load correctly in subdirectories or local builds
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});