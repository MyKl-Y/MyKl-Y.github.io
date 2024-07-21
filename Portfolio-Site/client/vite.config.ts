import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Portfolio-Site/client/', // Base URL for the app
  server: {
    port: 5173 // Development server port
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // Alias for src directory
    }
  },
  build: {
    rollupOptions: {
      external: [
        '/Portfolio-Site/client/src/main.ts' // Externalize this module if needed
      ]
    }
  }
})
