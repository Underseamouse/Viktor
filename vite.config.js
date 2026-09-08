import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site from https://underseamouse.github.io/Viktor/
export default defineConfig({
  plugins: [react()],
  base: '/Viktor/',
})
