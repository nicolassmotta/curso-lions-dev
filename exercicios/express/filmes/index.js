const express = require("express");
const app = express();
const porta = 3000;

app.use(express.json());

// "Banco de dados" em memória
let filmes = [];
let proximoId = 1;

// --- ENDPOINTS DA API ---

// 1. Criação de Filmes (POST /filmes)
app.post("/filmes", (req, res) => {
  const { titulo, diretor, ano, genero } = req.body;

  if (!titulo || !diretor || !ano || !genero) {
    return res
      .status(400)
      .send({
        mensagem:
          "Todos os campos (titulo, diretor, ano, genero) são obrigatórios.",
      });
  }

  const novoFilme = {
    id: proximoId++,
    titulo,
    diretor,
    ano,
    genero,
  };

  filmes.push(novoFilme);
  res.status(201).send(novoFilme);
});

// 2. Leitura (Listagem) de Filmes (GET /filmes)
app.get("/filmes", (req, res) => {
  res.status(200).send(filmes);
});

// 3. Atualização de Filmes (PUT /filmes/:id)
app.put("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, diretor, ano, genero } = req.body;

  const indice = filmes.findIndex((f) => f.id === id);

  if (indice === -1) {
    return res.status(404).send({ mensagem: "Filme não encontrado." });
  }

  filmes[indice].titulo = titulo || filmes[indice].titulo;
  filmes[indice].diretor = diretor || filmes[indice].diretor;
  filmes[indice].ano = ano || filmes[indice].ano;
  filmes[indice].genero = genero || filmes[indice].genero;

  res.status(200).send(filmes[indice]);
});

// 4. Deleção de Filmes (DELETE /filmes/:id)
app.delete("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = filmes.findIndex((f) => f.id === id);

  if (indice === -1) {
    
    return res.status(404).send({ mensagem: "Filme não encontrado." });
  }

  filmes.splice(indice, 1);
  res.status(200).send({ mensagem: "Filme deletado com sucesso." });
});

// 5. Busca de Filmes (GET /filmes/busca)
app.get("/filmes/busca", (req, res) => {
  const { titulo, diretor, ano, genero } = req.query;
  let resultados = filmes;

  if (titulo) {
    resultados = resultados.filter((f) =>
      f.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
  }
  if (diretor) {
    resultados = resultados.filter((f) =>
      f.diretor.toLowerCase().includes(diretor.toLowerCase())
    );
  }
  if (ano) {
    resultados = resultados.filter((f) => f.ano === parseInt(ano));
  }
  if (genero) {
    resultados = resultados.filter((f) =>
      f.genero.toLowerCase().includes(genero.toLowerCase())
    );
  }

  res.status(200).send(resultados);
});

// Iniciando o servidor
app.listen(porta, () => {
  console.log(`Servidor de Filmes rodando em http://localhost:${porta}`);
});
