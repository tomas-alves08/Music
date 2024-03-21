import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
// import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    global: true
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      // injectRegister: 'script',
      strategies: 'generateSW',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Music App',
        theme_color: '#ff5e3a',
        icons: [
          {
            src: 'assets/img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,}']
        // maximumFileSizeToCacheInBytes: 5000000
      }
    })
    // visualizer({ open: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
