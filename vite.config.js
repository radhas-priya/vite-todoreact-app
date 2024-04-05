import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
   base: import.meta.env.PROD ? '/todo-react-app' : '/',
  build: {
    outDir: 'dist', 
    // Specify the output directory (relative to project root)
  },
})
// server:{port:3000}