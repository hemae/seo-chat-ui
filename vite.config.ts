import { defineConfig } from 'vite'
import { fileURLToPath } from "url"
import * as path from 'path'
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@app', replacement: path.resolve(__dirname, 'src/app/index') },
      { find: '@entities', replacement: path.resolve(__dirname, 'src/entities') },
      { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@processes', replacement: path.resolve(__dirname, 'src/processes') },
      { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
      { find: '@widgets', replacement: path.resolve(__dirname, 'src/widgets') },
    ],
  },
})
