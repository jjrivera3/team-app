import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@emotion/styled": path.resolve(
        __dirname,
        "node_modules/@emotion/styled"
      ),
    },
  },
  server: {
    host: "0.0.0.0", // Allow external access (required for Docker)
    port: 5173, // Ensure correct port
    strictPort: true,
    watch: {
      usePolling: true, // Helps with hot reload in Docker
    },
  },
  test: {
    globals: true, // Enables global test functions like `describe`, `test`, etc.
    environment: "jsdom", // Use jsdom environment to simulate the browser
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"], // Add 'jsx' here
  },
});
