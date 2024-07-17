import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: { overlay: false },
    proxy: {
      '/api': {
        target: 'https://4bb4-2001-e60-a431-b9d9-cdad-e92-f354-3af9.ngrok-free.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
