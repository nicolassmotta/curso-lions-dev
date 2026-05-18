import express from "express";
import estudantes from "./dados.js";

const app = express();
const porta = 3000;

app.use(express.json());

let id = 0;

app.post("/estudantes/criar", (req, res) => {

  const { nome, matricula, curso, ano } = req.body;

  if (!nome || !matricula || !curso || !ano) {
    return res.status(400).send({ mensagem: "Todos os campos (nome, matricula, curso, ano) são obrigatórios." });
  }

  if (estudantes.length === 0) {
    id = 1;
  } else {
    id = estudantes[estudantes.length - 1].id + 1;
  }

  const novoEstudante = {
    id,
    nome,
    matricula,
    curso,
    ano,
  };

  estudantes.push(novoEstudante);

  res.status(201).send( { message: "Estudante criado com sucesso!", estudanteNovo: novoEstudante});
});

app.get(("/estudantes"), (req, res) => {
  res.status(200).send({ message: "Estudantes criados com sucesso!", alunos: estudantes} );
});

app.put(("/estudantes/:id"), (req, res) => {
  
  const { nome, matricula, curso, ano } = req.body;
  const id = parseInt(req.params.id);

  const index = estudantes.findIndex((estudante) => estudante.id === id);

  if(index === -1){
    return res.status(404).send( { error: "Estudante não encontrado!"} );
  }

  estudantes[index].nome = nome || estudantes[index].nome;
  estudantes[index].matricula = matricula || estudantes[index].matricula;
  estudantes[index].curso = curso || estudantes[index].curso;
  estudantes[index].ano = ano || estudantes[index].ano;

  res.status(200).send( { message: "Estudante atualizado com sucesso!", estudanteAtualizado: estudantes[index] });
});

app.listen((porta), () => {
  console.log(`Servidor rodando na porta: ${porta}`);
});
