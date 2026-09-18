import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile({ removeViteModuleLoader: true })],
  build: { cssCodeSplit: false, assetsInlineLimit: 100000000, chunkSizeWarningLimit: 8000 },
})
