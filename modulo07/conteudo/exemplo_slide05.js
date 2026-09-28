import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // Forçando um erro para testar o tratamento abaixo
  throw new Error("CÓDIGO QUEBROU");
});

app.listen(port, () => {
  console.log(`Exemplo das funções rodando na porta: ${port}`);
});

// Middleware de tratamento de erro (sempre com 4 argumentos)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Alguma coisa deu errado!");
});
