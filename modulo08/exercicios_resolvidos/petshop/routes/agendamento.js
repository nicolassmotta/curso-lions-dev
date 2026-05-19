import express from "express";
import Agendamento from "../models/agendamento.js";

const router = express.Router();

// 1. Cadastrar Agendamento (CREATE)
router.post("/", async (req, res) => {
  try {
    const { nomePet, especie, nomeDono, telefoneDono, servico, data } = req.body;

    // Lógica simples e didática de cálculo de valor (sem usar operador ternário)
    let valor = 0;

    if (especie === "Cão") {
      if (servico === "Banho") {
        valor = 50;
      } else if (servico === "Tosa") {
        valor = 60;
      } else if (servico === "Banho e Tosa") {
        valor = 100;
      }
    } else if (especie === "Gato") {
      if (servico === "Banho") {
        valor = 60;
      } else if (servico === "Tosa") {
        valor = 70;
      } else if (servico === "Banho e Tosa") {
        valor = 110;
      }
    } else if (especie === "Outro") {
      if (servico === "Banho") {
        valor = 40;
      } else if (servico === "Tosa") {
        valor = 50;
      } else if (servico === "Banho e Tosa") {
        valor = 80;
      }
    }

    // Cria a nova instância do modelo
    const novoAgendamento = new Agendamento({
      nomePet,
      especie,
      nomeDono,
      telefoneDono,
      servico,
      data,
      valor
    });

    // Salva no banco de dados MongoDB
    await novoAgendamento.save();

    // Retorna com status 201 (Created)
    res.status(201).json(novoAgendamento);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar agendamento", error: error.message });
  }
});

// 2. Listar Todos os Agendamentos (READ)
router.get("/", async (req, res) => {
  try {
    // Busca todos os registros
    const agendamentos = await Agendamento.find();
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agendamentos", error: error.message });
  }
});

// 3. Buscar por Nome do Pet (QUERY PARAMS)
router.get("/busca", async (req, res) => {
  try {
    const { nome } = req.query;

    let filtro = {};

    if (nome) {
      // Faz busca parcial e ignora maiúsculas/minúsculas usando Expressão Regular simples
      filtro.nomePet = { $regex: nome, $options: "i" };
    }

    const agendamentos = await Agendamento.find(filtro);
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar busca", error: error.message });
  }
});

// 4. Atualizar Status do Agendamento (UPDATE)
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Atualiza no banco de dados
    const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } // `new: true` para retornar o documento atualizado
    );

    // Se o agendamento não for encontrado
    if (!agendamentoAtualizado) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    res.status(200).json(agendamentoAtualizado);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar status", error: error.message });
  }
});

// 5. Remover Agendamento (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Deleta o registro pelo ID
    const agendamentoDeletado = await Agendamento.findByIdAndDelete(id);

    if (!agendamentoDeletado) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    res.status(200).json({ message: "Agendamento removido com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar agendamento", error: error.message });
  }
});

export default router;
