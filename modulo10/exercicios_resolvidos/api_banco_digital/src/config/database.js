import mongoose from "mongoose";

export default async function conectarDatabase() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI não configurada.");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB conectado com sucesso.");
}
