// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import VueDevTools from 'vite-plugin-vue-devtools' <--- წაშალე ეს

export default defineConfig({
  plugins: [
    vue(),
    // VueDevTools(), <--- და წაშალე ესეც
  ],
})