import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  // GitHub Pages：https://ginobygino.github.io/Freashmanschedual/
  base: process.env.GITHUB_PAGES === "1" ? "/Freashmanschedual/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@data": path.resolve(__dirname, "../data"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
