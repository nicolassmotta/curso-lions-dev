import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// O backend roda em http://localhost:3000 e não tem CORS habilitado.
// O proxy faz o browser acreditar que a API é do mesmo domínio do frontend,
// evitando erros de CORS sem precisar alterar o backend.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
