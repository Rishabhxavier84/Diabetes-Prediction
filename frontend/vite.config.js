import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    allowedHosts: ["diabetes.local"],
  },
  resolve: {
    alias: {
      "#Components": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "src/Components",
      ),
    },
  },
});
