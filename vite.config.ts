import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetWind, presetIcons, presetAttributify } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetWind(), presetIcons(), presetAttributify()],
      rules: [
        ['text-ell', { 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden' }],
        ['scroll-box', { overflow: 'scroll', 'margin-right': '-20px', 'padding-right': '20px', 'box-sizing': 'content-box' }],
        ['singer-container', { height: 'calc(100vh - 56px - 40px)' }],
        [/^h-w-screen-(\d+)$/, (match) => ({ height: `${match[1]}vw` })],
        [/^w-screen-(\d+)$/, (match) => ({ width: `${match[1]}vw` })],
        [/^h-screen-(\d+)$/, (match) => ({ height: `${match[1]}vh` })],
        ['custom-container', { width: '80vw', margin: '0 auto' }]
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
