import express from "express";

const app = express();
const port = 3000;

// 1. Esta rota será executada
app.get("/", (req, res) => {
  res.send("Primeira rota!");
});

// 2. Esta rota NUNCA será alcançada
app.get("/", (req, res) => {
  res.send("Segunda rota!");
});

app.listen(port, () => {
  console.log(`Exemplo das funções rodando na porta: ${port}`);
});
