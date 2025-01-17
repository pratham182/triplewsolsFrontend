import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:2000', // Change this to your backend server's URL
        changeOrigin: true,
        secure: false, // Set to false if you're using HTTP instead of HTTPS
      },
    },
  },
});
