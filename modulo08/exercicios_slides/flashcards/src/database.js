import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: new URL("../.env", import.meta.url) });

async function conectarBanco() {
  try {
    // A URI vem do .env para não expor usuário/senha no código.
    if (!process.env.MONGO_URI) {
      throw new Error("A variável MONGO_URI não foi definida no arquivo .env");
    }

    // Abre a conexão do Mongoose com o cluster/banco MongoDB.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    process.exit(1);
  }
}

export default conectarBanco;
