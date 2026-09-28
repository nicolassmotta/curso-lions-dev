import express from "express";

const app = express();
const port = 3000;

// Permite que o Express leia dados em JSON enviados no body
app.use(express.json());

// Exemplo de req.body
// Usado quando o cliente envia dados no corpo da requisição
app.post("/baralho", (req, res) => {
  const titulo = req.body.titulo;

  res.status(201).send({
    mensagem: "Dados recebidos pelo req.body",
    titulo: titulo,
  });
});

// Exemplo de req.params
// Usado quando o dado vem direto na rota
app.get("/baralho/:id", (req, res) => {
  const id = req.params.id;

  res.status(200).send({
    mensagem: "Parâmetro recebido pelo req.params",
    id: id,
  });
});

// Exemplo de req.query
// Usado quando o dado vem depois do ? na URL
app.get("/flashcards", (req, res) => {
  const termo = req.query.termo;

  res.status(200).send({
    mensagem: "Parâmetro de busca recebido pelo req.query",
    termo: termo,
  });
});

// Middleware de tratamento de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Alguma coisa deu errado!");
});

app.listen(port, () => {
  console.log(`Exemplo rodando na porta: ${port}`);
});
