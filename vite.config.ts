import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
     viteCompression({
      threshold: 10240, // 10kb
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {

          // Vue 核心生态
          if (
            id.includes('vue') ||
            id.includes('vue-router') ||
            id.includes('pinia')
          ) {
            return 'vue-vendor'
          }

          // axios
          if (id.includes('axios')) {
            return 'axios'
          }

          // node_modules 其他库
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})