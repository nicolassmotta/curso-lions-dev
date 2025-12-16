const express = require("express");
const app = express();
const porta = 3000; 

app.use(express.json());

// "Banco de dados" em memória
let estudantes = [];
let proximoId = 1;

app.post("/estudantes/criar", (req, res) => {
  const { nome, matricula, curso, ano } = req.body;

  if (!nome || !matricula || !curso || !ano) {
    return res.status(400).send({ mensagem:"Todos os campos (nome, matricula, curso, ano) são obrigatórios.", });
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

// 2. Leitura (Listagem) de Estudantes (GET /estudantes)
app.get("/estudantes", (req, res) => {

  if (estudantes == null) {
    res.status(200).send({message: "não existem estudantes cadastrados"})
  }
  res.status(200).send(estudantes);
});

// 3. Atualização de Estudantes (PUT /estudantes/:id)
app.put("/estudantes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, matricula, curso, ano } = req.body;

  const indice = estudantes.findIndex((e) => e.id === id);

  if (indice === -1) {
    return res.status(404).send({ mensagem: "Estudante não encontrado." });
  }

  estudantes[indice].nome = nome || estudantes[indice].nome;
  estudantes[indice].matricula = matricula || estudantes[indice].matricula;
  estudantes[indice].curso = curso || estudantes[indice].curso;
  estudantes[indice].ano = ano || estudantes[indice].ano;

  res.status(200).send(estudantes[indice]);
});

// 4. Deleção de Estudantes (DELETE /estudantes/:id)
app.delete("/estudantes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = estudantes.findIndex((e) => e.id === id);

  if (indice === -1) {
    return res.status(404).send({ mensagem: "Estudante não encontrado." }); 
  }

  estudantes.splice(indice, 1);
  res.status(200).send({ mensagem: "Estudante deletado com sucesso." }); 
});

// 5. Busca de Estudantes (GET /estudantes/busca)
app.get("/estudantes/busca", (req, res) => {
  const { nome, matricula, curso } = req.query;
  let resultados = estudantes;

  if (nome) {
    resultados = resultados.filter((e) =>
      e.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }
  if (matricula) {
    resultados = resultados.filter((e) => e.matricula.includes(matricula));
  }
  if (curso) {
    resultados = resultados.filter((e) =>
      e.curso.toLowerCase().includes(curso.toLowerCase())
    );
  }

  res.status(200).send(resultados);
});

// Iniciando o servidor
app.listen(porta, () => {
  console.log(`Servidor de Estudantes rodando em http://localhost:${porta}`);
});
