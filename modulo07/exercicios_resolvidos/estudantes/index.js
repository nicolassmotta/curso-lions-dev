import express from "express";
import estudantes from "./dados.js";

const app = express();
const porta = 3000;

app.use(express.json());

let proximoId = estudantes.length + 1;

app.post("/estudantes", (req, res) => {
  const { nome, matricula, curso, ano } = req.body;

  if (!nome || !matricula || !curso || !ano) {
    return res.status(400).send({ message: "Todos os campos (nome, matricula, curso, ano) são obrigatórios." });
  }

  const novoEstudante = {
    id: proximoId++,
    nome,
    matricula,
    curso,
    ano,
  };

  estudantes.push(novoEstudante);

  res.status(201).send(novoEstudante);
});

app.get("/estudantes", (req, res) => {
  res.status(200).send(estudantes);
});

app.put("/estudantes/:id", (req, res) => {
  const { nome, matricula, curso, ano } = req.body;
  const id = parseInt(req.params.id);

  const index = estudantes.findIndex((estudante) => estudante.id === id);

  if (index === -1) {
    return res.status(404).send({ error: "Estudante não encontrado!" });
  }

  estudantes[index].nome = nome || estudantes[index].nome;
  estudantes[index].matricula = matricula || estudantes[index].matricula;
  estudantes[index].curso = curso || estudantes[index].curso;
  estudantes[index].ano = ano || estudantes[index].ano;

  res.status(200).send(estudantes[index]);
});

app.delete("/estudantes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = estudantes.findIndex((estudante) => estudante.id === id);

  if (index === -1) {
    return res.status(404).send({ message: "Estudante não encontrado!" });
  }

  estudantes.splice(index, 1);

  res.status(200).send({ message: "Estudante removido com sucesso!" });
});

app.get("/estudantes/busca", (req, res) => {
  const { nome, matricula, curso } = req.query;
  let resultados = estudantes;

  if (nome) {
    resultados = resultados.filter((estudante) => estudante.nome.toLowerCase().includes(nome.toLowerCase()));
  }
  if (matricula) {
    resultados = resultados.filter((estudante) => estudante.matricula.includes(matricula));
  }
  if (curso) {
    resultados = resultados.filter((estudante) => estudante.curso.toLowerCase().includes(curso.toLowerCase()));
  }

  res.status(200).send(resultados);
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta: ${porta}`);
});
