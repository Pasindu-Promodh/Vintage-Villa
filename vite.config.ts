import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Keep the same output folder name react-scripts used, so existing
    // hosting config (Netlify publish directory, etc.) doesn't need to change.
    outDir: "build",
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
});
