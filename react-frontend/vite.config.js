import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://contact-book.local',
      '/sanctum': 'http://contact-book.local',
    },
  },
});
