import express from "express";
const app = express();
const port = 3000;

// Middleware para habilitar o uso de JSON nas requisições
app.use(express.json());

// --- Importando a lógica de cada operação ---
// Lógica de baralho
import adicionarBaralho from "./adicionar_baralho.js";
import listarBaralho from "./listar_baralho.js";
import atualizarBaralho from "./atualizar_baralho.js";
import deletarBaralho from "./deletar_baralho.js";

// Lógica de flashcard
import adicionarFlashcard from "./adicionar_flashcard.js";
import listarFlashcard from "./listar_flashcard.js";
import atualizarFlashcard from "./atualizar_flashcard.js";
import deletarFlashcard from "./deletar_flashcard.js";
import listarFlashcardsEspecificos from "./listar_flashcards_especificos.js";
import buscarFlashcards from "./buscar_flashcards.js";

// --- Rota Inicial de Teste ---
app.get("/", (req, res) => {
  res.send("Servidor Express está funcionando!");
});

// --- Rotas de Baralho (Handlers) ---
app.post("/baralhos", (req, res) => {
  // Exemplo de Desestruturação (versão mais moderna):
  // const { titulo } = req.body;
  // const { data, error } = adicionarBaralho(titulo);

  // Versão clássica:
  const titulo = req.body.titulo;
  const resultado = adicionarBaralho(titulo);
  const data = resultado.data;
  const error = resultado.error;

  if (error) {
    return res.status(400).send({ message: error });
  }

  res.status(201).send({ message: "Baralho criado com sucesso!", baralho: data });
});

app.get("/baralhos", (req, res) => {
  const data = listarBaralho();
  res.status(200).send(data);
});

app.put("/baralhos/:id", (req, res) => {
  const id = req.params.id;
  const titulo = req.body.titulo;

  const resultado = atualizarBaralho(id, titulo);
  const data = resultado.data;
  const error = resultado.error;

  if (error) {
    return res.status(404).send({ message: error });
  }

  res.status(200).send({ message: "Baralho atualizado com sucesso!", baralho: data });
});

app.delete("/baralhos/:id", (req, res) => {
  const id = req.params.id;

  const resultado = deletarBaralho(id);
  const data = resultado.data;
  const error = resultado.error;

  if (error) {
    return res.status(404).send({ message: error });
  }

  res.status(200).send({ message: "Baralho deletado com sucesso!", baralho: data });
});

// --- Rotas de Flashcard (Handlers) ---
// 1. Criar Flashcard
app.post("/flashcards", (req, res) => {
  const pergunta = req.body.pergunta;
  const resposta = req.body.resposta;
  const idBaralho = req.body.idBaralho;

  // Campo faltando é erro do cliente (400). Baralho inexistente é 404.
  if (!pergunta || !resposta || !idBaralho) {
    return res.status(400).send({ message: "Pergunta, resposta e idBaralho são obrigatórios." });
  }

  const resultado = adicionarFlashcard(pergunta, resposta, parseInt(idBaralho));
  const data = resultado.data;
  const error = resultado.error;

  if (error) {
    return res.status(404).send({ message: error });
  }
  res.status(201).send({ message: "Flashcard criado com sucesso!", flashcard: data });
});

// 2. Listar Todos os Flashcards (ou buscar por termo)
app.get("/flashcards", (req, res) => {
  const termo = req.query.termo;
  let data;
  if (termo) {
    data = buscarFlashcards(termo);
  } else {
    data = listarFlashcard();
  }
  res.status(200).send(data);
});

// 3. Atualizar Flashcard
app.put("/flashcards/:id", (req, res) => {
  const id = req.params.id;
  const pergunta = req.body.pergunta;
  const resposta = req.body.resposta;
  const idBaralho = req.body.idBaralho;

  const resultado = atualizarFlashcard(id, pergunta, resposta, idBaralho ? parseInt(idBaralho) : undefined);
  const data = resultado.data;
  const error = resultado.error;

  if (error) {
    return res.status(404).send({ message: error });
  }
  res.status(200).send({ message: "Flashcard atualizado com sucesso!", flashcard: data });
});

// 4. Deletar Flashcard
app.delete("/flashcards/:id", (req, res) => {
  const id = req.params.id;

  const resultado = deletarFlashcard(id);
  const data = resultado.data;
  const error = resultado.error;
  if (error) {
    return res.status(404).send({ message: error });
  }
  res.status(200).send({ message: "Flashcard deletado com sucesso!", flashcard: data });
});

// 5. Listar Flashcards de um Baralho Específico
app.get("/baralhos/:idBaralho/flashcards", (req, res) => {
  const idBaralho = req.params.idBaralho;
  const data = listarFlashcardsEspecificos(idBaralho);
  res.status(200).send(data);
});

// --- Iniciando o Servidor ---
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
