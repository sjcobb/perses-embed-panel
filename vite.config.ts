import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Workaround for `global is not defined` error
    // https://github.com/vitejs/vite/discussions/5912#discussioncomment-2908994
    global: "globalThis",
  },
});
