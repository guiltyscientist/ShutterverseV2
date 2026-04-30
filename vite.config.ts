import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
    vue(),
    // DevTools nur im Development — nicht im Production-Build
    ...(mode === 'development' ? [vueDevTools()] : []),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: false, // keine Source Maps im Production-Build
  },
  server: {
    host: true,
    proxy: {
      '/api': process.env.VITE_API_URL ?? 'http://localhost:3000',
    },
  },
}))
