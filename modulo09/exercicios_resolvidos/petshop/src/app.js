import express from "express";
import agendamentoRoutes from "./routes/agendamento.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API do Petshop está no ar!" });
});

app.use(agendamentoRoutes);

export default app;
