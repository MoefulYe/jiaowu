import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    pure: ['console.log'],
    drop: ['debugger']
  },
  plugins: [vue({
    script: {
      defineModel: true
    },
  }), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'api': fileURLToPath(new URL('./src/api', import.meta.url)),
      'components': fileURLToPath(new URL('./src/components', import.meta.url)),
      'views': fileURLToPath(new URL('./src/views', import.meta.url)),
      "util": fileURLToPath(new URL('./src/util', import.meta.url)),
      "assets": fileURLToPath(new URL('./src/assets', import.meta.url)),
      "router": fileURLToPath(new URL('./src/router', import.meta.url)),
      "stores": fileURLToPath(new URL('./src/stores', import.meta.url)),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.254.1:30801',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: 'gzip',
          ext: '.gz',
          deleteOriginFile: true
        }),
        viteImagemin({
          verbose: true,
          svgo: {
            plugins: [
              {
                name: 'removeViewBox'
              },
              {
                name: 'removeEmptyAttrs',
                active: false
              }
            ]
          },
          webp: {
            quality: 50,
            method: 4
          }
        })
      ],
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
