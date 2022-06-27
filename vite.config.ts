import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetWind, presetIcons } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetWind(), presetIcons()],
      rules: [
        ['text-ell', { 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden' }],
        ['scroll-box', { overflow: 'scroll', 'margin-right': '-20px', 'padding-right': '20px' }]
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
