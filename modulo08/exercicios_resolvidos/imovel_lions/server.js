import express from "express";
import connectDB from "./db.js";
import imovelRoutes from "./routes/imovel.js";
import reservaRoutes from "./routes/reserva.js";
import avaliacaoRoutes from "./routes/avaliacao.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Conecta ao banco de dados
connectDB();

// Middleware para ler requisições em formato JSON
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("API da startup Imóvel Lions rodando com sucesso!");
});

// Vincula as rotas da API
app.use("/imoveis", imovelRoutes);
app.use("/reservas", reservaRoutes);
app.use("/avaliacoes", avaliacaoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
