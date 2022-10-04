import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: 'localhost',
    port: 5131,
    strictPort: true,
    base: process.env.NODE_ENV === 'production' ? '/la-boite-a-sel/' : '/',
  },
  build: {
    outDir: 'docs',
    assetsDir: process.env.NODE_ENV === 'production' ? '' : 'assets',
  },
})
