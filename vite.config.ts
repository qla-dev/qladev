import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Production is served from the domain root, so assets must resolve from /assets on deep links
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
