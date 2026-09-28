import mongoose from "mongoose";

async function conectarDB() {
  // Lemos a variável aqui dentro (e não no topo do arquivo) porque os imports
  // rodam antes do dotenv.config() do server.js
  const MONGO_URI = process.env.MONGO_URI;

  try {
    if (!MONGO_URI) {
      throw new Error("A variável MONGO_URI não foi definida no arquivo .env");
    }

    await mongoose.connect(MONGO_URI);
    console.log("Banco de dados conectado com sucesso!");
  } catch (erro) {
    console.log(`Erro ao se conectar com o banco de dados: ${erro.message}`);
    // Sem banco a API não funciona, então encerramos o processo
    process.exit(1);
  }
}

export default conectarDB;
