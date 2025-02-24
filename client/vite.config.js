import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure Vite resolves @emotion/styled correctly
      "@emotion/styled": path.resolve(
        __dirname,
        "node_modules/@emotion/styled"
      ),
    },
  },
});
