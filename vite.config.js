import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const githubPageRepoBase = 'la-boite-a-sel'

console.warn('NODE_ENV = ', process.env.NODE_ENV)

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
    base: process.env.NODE_ENV === 'production' ? '/' + githubPageRepoBase + '/' : '/',
  },
  build: {
    outDir: 'docs',
    assetsDir:
      process.env.NODE_ENV === 'production' ? githubPageRepoBase + '/assets' : 'assets',
  },
})
