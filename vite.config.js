import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three/') || id.endsWith('/three')) {
              return 'three-core'
            }
            if (id.includes('gsap')) {
              return 'gsap'
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion'
            }
          }
        },
      },
    },
  },
})
