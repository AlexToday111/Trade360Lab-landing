import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'trade360lab-docs-static-entry',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist')
        const indexPath = path.join(distDir, 'index.html')

        if (!fs.existsSync(indexPath)) {
          return
        }

        const indexHtml = fs.readFileSync(indexPath, 'utf8')
        const docsHtml = indexHtml
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
            '<meta name="description" content="Продуктовая и техническая документация Trade360Lab" />',
          )
          .replace(/<title>.*?<\/title>/, '<title>Документация Trade360Lab</title>')
        const docsDir = path.join(distDir, 'docs')

        fs.mkdirSync(docsDir, { recursive: true })
        fs.writeFileSync(path.join(docsDir, 'index.html'), docsHtml)
        fs.writeFileSync(path.join(distDir, '404.html'), docsHtml)
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
