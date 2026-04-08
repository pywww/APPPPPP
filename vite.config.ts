import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5174,
    fs: {
      allow: [
        fileURLToPath(new URL('.', import.meta.url)),
        'C:/Users/ASUS/.cursor/projects/c-Users-ASUS-Desktop-Cursor/assets',
      ],
    },
  },
})
