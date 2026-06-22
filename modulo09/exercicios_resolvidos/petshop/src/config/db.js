import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: "../.env"});
const MONGO_URI = process.env.MONGO_URI;

async function conectarDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Banco de dados conectado com sucesso!");
  } catch (erro) {
    console.log(`Erro ao se conectar com o banco de dados: ${erro.message}`);
  }
}

export default conectarDB;
