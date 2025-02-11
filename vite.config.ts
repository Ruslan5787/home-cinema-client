import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Принимает соединения с любого адреса
    port: 5173,
    strictPort: true,  // Использует именно этот порт
    hmr: {
      protocol: 'ws',
      host: '217.114.12.78', // Можно попробовать заменить на твой IP
      port: 5173,
    }
  }
})
