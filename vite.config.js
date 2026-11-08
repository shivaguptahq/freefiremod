import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

function spaFallback404() {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    closeBundle() {
      const index = resolve(import.meta.dirname, 'dist/index.html')
      const fallback = resolve(import.meta.dirname, 'dist/404.html')
      if (existsSync(index)) copyFileSync(index, fallback)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback404()],
})
