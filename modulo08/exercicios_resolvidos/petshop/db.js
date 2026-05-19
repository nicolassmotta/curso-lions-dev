import mongoose from "mongoose";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado ao MongoDB com sucesso! (Petshop)");
  } catch (error) {
    console.log("Erro ao conectar ao MongoDB:", error.message);
  }
};

export default connectDB;
