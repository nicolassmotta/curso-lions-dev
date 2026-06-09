import express from "express";
import dotenv from "dotenv";
import Agendamento from "./models/agendamento.js";
import conectarDB from "./db.js";

dotenv.config({path: "../.env"});
const app = express();
const PORT = process.env.PORT;
conectarDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API do Petshop está no ar!" });
});

app.post("/agendamentos", async (req, res) => {
  try {
    const { nomePet, especie, nomeDono, telefoneDono, servico, data } = req.body;

    let valor = 0;
    if (especie == "Cão") {
      switch (servico) {
        case "Banho":
          valor = 50;
          break;
        case "Tosa":
          valor = 60;
          break;
        case "Banho e Tosa":
          valor = 100;
          break;
        default:
          console.log("Serviço inválido!");
          break;
      }
    }

    if (especie == "Gato") {
      switch (servico) {
        case "Banho":
          valor = 60;
          break;
        case "Tosa":
          valor = 70;
          break;
        case "Banho e Tosa":
          valor = 110;
          break;
        default:
          console.log("Serviço inválido!");
          break;
      }
    }

    if (especie == "Outro") {
      switch (servico) {
        case "Banho":
          valor = 40;
          break;
        case "Tosa":
          valor = 50;
          break;
        case "Banho e Tosa":
          valor = 80;
          break;
        default:
          console.log("Serviço inválido!");
          break;
      }
    }

    const novoAgendamento = new Agendamento({
      nomePet,
      especie,
      nomeDono,
      telefoneDono,
      servico,
      data,
      valor,
    });

    await novoAgendamento.save();

    res.status(201).json({ mensagem: "Agendamento criado com sucesso!", agendamento: novoAgendamento });
  } catch (erro) {
    res.status(400).json({ mensagem: `Erro ao criar o agendamento: ${erro.message}` });
  }
});

app.get(("/agendamentos"), async (req, res) => {
  try {
    const todosAgendamentos = await Agendamento.find();
    res.status(200).json({mensagem: "Todos os agendamentos foram listados com sucesso!", agendamentos: todosAgendamentos});
  } catch (erro) {
    res.status(400).json({mensagem: `Erro ao listar os agendamentos: ${erro.message}`})
  }
});

app.get(("/agendamentos/busca"), async (req, res) => {
  try {
    const nome = req.query.nome;
    const agendamentos = await Agendamento.find({nomePet: 
      { $regex: nome, $options: "i"}}); 
    // regex busca por partes do texto
    // options ignora maiusculas e minusculas
    res.status(200).json({mensagem: "Busca efetuada com sucesso!", 
      agendamentos: agendamentos});
  } catch (erro) {
    res.status(400).json({mensagem: `Erro: ${erro.message}`})
  }
});

app.patch(("/agendamentos/:id"), async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(id, 
      {status: status}, {runValidators: true, new: true});

    if (!agendamentoAtualizado) {
      return res.status(404).json({mensagem: "Agendamento não encontrado!"});
    }

    res.status(200).json({mensagem: "Agendamento atualizado com sucesso!", 
      agendamentoAtualizado: agendamentoAtualizado});
  } catch (erro) {
    res.status(500).json({mensagem: `Erro do servidor: ${erro.message}`});
  }
});

app.delete(("/agendamentos/:id"), async (req, res) => {
  try {
    const id = req.params.id;
    const agendamentoDeletado = await Agendamento.findByIdAndDelete(id);

    if (!agendamentoDeletado) {
      return res.status(404).json({mensagem: "Agendamento não encontrado!"});
    }

    res.status(200).json({mensagem: "Agendamento deletado com sucesso!", agendamentoDeletado: agendamentoDeletado});
  } catch (erro) {
    res.status(500).json({mensagem: `Erro do servidor: ${erro.message}`});
  }
});

app.listen(PORT, () => {
  console.log(`Conectado com a porta ${PORT} com sucesso!`);
});

