import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          if (id.includes('recharts')) {
            return 'charts'
          }

          if (id.includes('react-router')) {
            return 'router'
          }

          if (id.includes('react') || id.includes('scheduler')) {
            return 'react-vendor'
          }
        },
      },
    },
  },
})
