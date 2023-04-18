import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: "mock"
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },

  build: {
    outDir: "dist", //指定输出路径
    minify: "esbuild",
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
      }
    }
  }
});
