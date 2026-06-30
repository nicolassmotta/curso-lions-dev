import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_API_PROXY_TARGET || "http://localhost:3000";

  return {
    plugins: [react()],
    server: {
      port: 8000,
      strictPort: true,
      proxy: {
        "/imoveis": apiTarget,
        "/reservas": apiTarget,
        "/avaliacoes": apiTarget,
      },
    },
  };
});
