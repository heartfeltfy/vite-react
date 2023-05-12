import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  // 配置项目别名
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },

  css: {
    modules: {
      localsConvention: "dashesOnly"
    }
  },
  server: {
    host: true
  },
  // 配置打包
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash][extname]"
      }
    }
  }
});
