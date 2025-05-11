import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    base: "/"
  },
  server: {
    proxy: {
      '/search': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: "https://user-m3hd.onrender.com",
        changeOrigin: true,
        secure: false,
      }
    },
  },
});