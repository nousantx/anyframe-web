import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import generouted from '@generouted/react-router/plugin'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    generouted({
      output: './src/routes/router.ts'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './'),
      '@ui': path.resolve(__dirname, './components'),
      '@stylx': path.resolve(__dirname, './src/styles/index.ts'),
      '@styler': path.resolve(__dirname, './src/styles/index.ts')
    }
  }
})
