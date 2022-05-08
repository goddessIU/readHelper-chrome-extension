import { chromeExtension } from "vite-plugin-chrome-extension";
import { resolve } from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'



export default defineConfig({
  plugins: [vue(), chromeExtension()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    }
  },
  build: {
    rollupOptions: {
      input: "src/manifest.json"
    }
  }
})



