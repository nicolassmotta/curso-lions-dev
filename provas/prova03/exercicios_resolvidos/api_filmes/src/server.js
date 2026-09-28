// Sobe a API de verdade (precisa do .env com MONGO_URI e JWT_SECRET)
import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(process.env.PORT || 3000, () => console.log("API de filmes rodando."));
} catch (error) {
  console.error("Erro ao iniciar:", error.message);
  process.exit(1);
}
