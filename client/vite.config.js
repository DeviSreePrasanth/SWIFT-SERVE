import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/search": {
        target: "https://user-m3hd.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
