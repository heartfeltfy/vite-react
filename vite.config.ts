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
    }) //使用mock
  ],
  // 配置别名
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  // server: {
  //   open: true,
  //   host: "0.0.0.0"
  // },
  build: {
    outDir: "dist", //指定输出路径
    rollupOptions: {
      output: {
        // 配置Rollup打包分块
        manualChunks(id) {
          if (id.includes("node_modules/react")) {
            return "React";
          }
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash][extname]"
      }
    }
  }
});
