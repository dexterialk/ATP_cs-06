import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Multi-page build: the home page plus the legal pages and 404, each with its own HTML entry.
export default defineConfig({
  plugins: [react()],
  build: {
    // Three.js r128 alone is about 600 kB minified. It is loaded only when the ball is switched on
    // (see src/motion/ball-visibility.js), so the size warning is raised above it on purpose.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        privacy: resolve(import.meta.dirname, "privacy/index.html"),
        accessibility: resolve(import.meta.dirname, "accessibility/index.html"),
        notFound: resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
