import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0', // Permite conexiones externas
    // Proxy opcional para desarrollo - el frontend puede conectarse directamente
    // al backend usando VITE_API_URL en .env
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:49000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
