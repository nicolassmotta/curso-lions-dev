import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { env: { JWT_SECRET: "segredo-so-para-testes" } },
});
