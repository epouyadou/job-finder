import vue from '@vitejs/plugin-vue';
import { resolve } from "path";
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: "public/manifest.json",
          dest: "."
        },
        {
          src: "public/icons",
          dest: "."
        }
      ]
    })
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        // Each script or HTML entry point
        background: resolve(__dirname, "src/background.ts"),
        content: resolve(__dirname, "src/content.ts"),
        popup: resolve(__dirname, "index.html")
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "[name][extname]"
      }
    },
  },
})
