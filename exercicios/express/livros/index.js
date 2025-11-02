const express = require("express");
const app = express();
const porta = 3000; // 'port' -> 'porta'

app.use(express.json());

// Nosso "banco de dados" em memória (um array de objetos)
let livros = [];
let proximoId = 1;

// --- ENDPOINTS DA API ---

// 1. Criação de Livros (POST /livros)
app.post("/livros", (req, res) => {
  const { titulo, autor, ano, genero } = req.body;

  if (!titulo || !autor || !ano || !genero) {
    return res
      .status(400)
      .send({
        mensagem:
          "Todos os campos (titulo, autor, ano, genero) são obrigatórios.",
      });
  }

  const novoLivro = {
    id: proximoId++,
    titulo: titulo,
    autor: autor,
    ano: ano,
    genero: genero,
  };

  livros.push(novoLivro);
  res.status(201).send(novoLivro);
});

// 2. Leitura (Listagem) de Livros (GET /livros)
app.get("/livros", (req, res) => {
  res.status(200).send(livros);
});

// 3. Atualização de Livros (PUT /livros/:id)
app.put("/livros/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, autor, ano, genero } = req.body;

  const indice = livros.findIndex((l) => l.id === id);

  if (indice === -1) {
    return res.status(404).send({ mensagem: "Livro não encontrado." });
  } 

  livros[indice].titulo = titulo || livros[indice].titulo;
  livros[indice].autor = autor || livros[indice].autor;
  livros[indice].ano = ano || livros[indice].ano;
  livros[indice].genero = genero || livros[indice].genero;

  res.status(200).send(livros[indice]);
});

// 4. Deleção de Livros (DELETE /livros/:id)
app.delete("/livros/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = livros.findIndex((l) => l.id === id);

  if (indice === -1) {
    return res.status(404).send({ mensagem: "Livro não encontrado." });
  }

  livros.splice(indice, 1);
  res.status(200).send({ mensagem: "Livro deletado com sucesso." });
});

// 5. Busca de Livros (GET /livros/busca)
app.get("/livros/busca", (req, res) => {
  const { titulo, autor, ano, genero } = req.query;
  let resultados = livros;

  if (titulo) {
    resultados = resultados.filter((l) =>
      l.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
  }
  if (autor) {
    resultados = resultados.filter((l) =>
      l.autor.toLowerCase().includes(autor.toLowerCase())
    );
  }
  if (ano) {
    resultados = resultados.filter((l) => l.ano === parseInt(ano));
  }
  if (genero) {
    resultados = resultados.filter((l) =>
      l.genero.toLowerCase().includes(genero.toLowerCase())
    );
  }

  res.status(200).send(resultados);
});

// Iniciando o servidor
app.listen(porta, () => {
  console.log(`Servidor de Livros rodando em http://localhost:${porta}`);
});
