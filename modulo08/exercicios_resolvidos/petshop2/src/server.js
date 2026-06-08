import express from "express";
import Agendamento from "./models/agendamento.js";
import conectarDB from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const router = express();
const PORT = process.env.PORT;
conectarDB();

router.use(express.json());

router.get("/", (req, res) => {
  res.json({ mensagem: "API do Petshop está no ar!" });
});

router.post("/agendamentos", async (req, res) => {
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

router.listen(PORT, () => {
  console.log(`Conectado com a porta ${PORT} com sucesso!`);
});
