import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Netlify's site settings already have the publish directory set to
  // Vite's default "dist" (it auto-detected this as a Vite project), so
  // build.outDir is intentionally left at its default rather than
  // overridden to match the old react-scripts "build" folder name.
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
});
