import express from "express";
import connectDB from "./db.js";
import barracaRoutes from "./routes/barraca.js";
import produtoRoutes from "./routes/produto.js";

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API da Feira Online no ar!");
});

// Cada arquivo de rotas cuida de um recurso
app.use("/barracas", barracaRoutes);
app.use("/produtos", produtoRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
