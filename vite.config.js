import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import geo from 'vite-plugin-geo'

// GEO-файлы генерируются во время production-сборки для основного домена.
export default defineConfig({
  plugins: [
    react(),
    geo({ domain: 'https://axiom-ai.su' }),
  ],
})
