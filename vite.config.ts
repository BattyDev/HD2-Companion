import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for React with TypeScript
// This sets up the development server and build process
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
