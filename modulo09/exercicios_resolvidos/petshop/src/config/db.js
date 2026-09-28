import mongoose from "mongoose";

async function conectarDB() {
  // Lemos a variável aqui dentro (e não no topo do arquivo) porque os imports
  // rodam antes do dotenv.config() do server.js
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("A variável MONGO_URI não foi definida no arquivo .env");
  }

  // Sem try/catch aqui: se a conexão falhar, o erro sobe para o server.js
  await mongoose.connect(MONGO_URI);
  console.log("Banco de dados conectado com sucesso!");
}

export default conectarDB;
