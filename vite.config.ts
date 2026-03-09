import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ALS-LMS2026/',
  server: {
    port: 8100,
    host: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
