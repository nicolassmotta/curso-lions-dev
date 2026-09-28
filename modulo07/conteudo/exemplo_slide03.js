import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send("Recebendo uma requisição de POST");
});

app.listen(port, () => {
  console.log(`Exemplo das rotas rodando na porta: ${port}`);
});
