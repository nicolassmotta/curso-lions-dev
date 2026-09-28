import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/usuarios", (req, res) => {
  res.send("Recebendo uma requisição em /usuarios");
});

app.get("/flashcards", (req, res) => {
  res.send("Recebendo uma requisição em /flashcards");
});

app.listen(port, () => {
  console.log(`Exemplo das rotas rodando na porta: ${port}`);
});
