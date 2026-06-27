import dotenv from "dotenv";

import app from "./app.js";
import conectarDatabase from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await conectarDatabase();

    app.listen(PORT, () => {
      console.log(`API LionsBank rodando na porta ${PORT}.`);
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
    process.exit(1);
  }
}

iniciarServidor();
