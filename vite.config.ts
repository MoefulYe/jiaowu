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
    }
  }), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://101.37.165.19:8080/',
        rewrite: (path) => path.replace(/^\/api/, ''),
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
