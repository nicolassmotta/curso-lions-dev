import express from "express";
import connectDB from "./db.js";
import agendamentoRoutes from "./routes/agendamento.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Conecta ao banco de dados MongoDB
connectDB();

// Middleware para ler JSON no corpo das requisições
app.use(express.json());

// Rota inicial de boas-vindas
app.get("/", (req, res) => {
  res.send("API do Petshop PetLions está rodando!");
});

// Rotas da API
app.use("/agendamentos", agendamentoRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
