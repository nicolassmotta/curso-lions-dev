import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Mongo conectado com sucesso!`);
  } catch (error) {
    console.log(`Erro ao conectar: ${error}`);
  }
};

export default connectDB;
