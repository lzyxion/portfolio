import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const BUILD_ID = Date.now().toString()

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'build-id-injector',
      transformIndexHtml: {
        order: 'pre',
        handler() {
          return [
            {
              tag: 'meta',
              attrs: { name: 'build-id', content: BUILD_ID },
              injectTo: 'head-prepend',
            },
          ]
        },
      },
      writeBundle(options) {
        const outDir = options.dir ?? 'dist'
        writeFileSync(
          resolve(outDir, 'version.json'),
          JSON.stringify({ buildId: BUILD_ID }),
        )
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
