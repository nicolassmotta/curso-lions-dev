import express from "express";
import dotenv from "dotenv";
import conectarDB from "./db.js";
import Matricula from "./models/matricula.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API da Academia Lions no ar!" });
});

// 3.1 Cadastrar matrícula
app.post("/matriculas", async (req, res) => {
  try {
    const { nomeAluno, idade, modalidade, plano, dataMatricula } = req.body;

    // Regra 1: valor mensal pela modalidade
    let valorMensal;
    if (modalidade === "Musculação") {
      valorMensal = 90;
    } else if (modalidade === "Funcional") {
      valorMensal = 120;
    } else if (modalidade === "Dança") {
      valorMensal = 100;
    } else {
      return res.status(400).json({ mensagem: "Modalidade inválida. Use Musculação, Funcional ou Dança." });
    }

    // Regra 2: valor total pelo plano
    let valorTotal;
    if (plano === "Mensal") {
      valorTotal = valorMensal;
    } else if (plano === "Trimestral") {
      valorTotal = valorMensal * 3 * 0.9; // 10% de desconto
    } else if (plano === "Semestral") {
      valorTotal = valorMensal * 6 * 0.85; // 15% de desconto
    } else {
      return res.status(400).json({ mensagem: "Plano inválido. Use Mensal, Trimestral ou Semestral." });
    }

    const matricula = await Matricula.create({
      nomeAluno,
      idade,
      modalidade,
      plano,
      dataMatricula,
      valorMensal,
      valorTotal,
    });

    res.status(201).json(matricula);
  } catch (erro) {
    res.status(400).json({ mensagem: `Erro ao cadastrar matrícula: ${erro.message}` });
  }
});

// 3.2 Listar todas
app.get("/matriculas", async (req, res) => {
  try {
    const matriculas = await Matricula.find();
    res.status(200).json(matriculas);
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro ao listar matrículas: ${erro.message}` });
  }
});

// 3.3 Buscar por modalidade
app.get("/matriculas/busca", async (req, res) => {
  try {
    const filtro = {};

    if (req.query.modalidade) {
      filtro.modalidade = { $regex: req.query.modalidade, $options: "i" };
    }

    const matriculas = await Matricula.find(filtro);
    res.status(200).json(matriculas);
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro na busca: ${erro.message}` });
  }
});

// 3.4 Atualizar status
app.patch("/matriculas/:id", async (req, res) => {
  try {
    const { status } = req.body || {};
    const matricula = await Matricula.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });

    if (!matricula) {
      return res.status(404).json({ mensagem: "Matrícula não encontrada." });
    }

    res.status(200).json(matricula);
  } catch (erro) {
    res.status(400).json({ mensagem: `Erro ao atualizar matrícula: ${erro.message}` });
  }
});

// 3.5 Remover
app.delete("/matriculas/:id", async (req, res) => {
  try {
    const matricula = await Matricula.findByIdAndDelete(req.params.id);

    if (!matricula) {
      return res.status(404).json({ mensagem: "Matrícula não encontrada." });
    }

    res.status(200).json({ mensagem: "Matrícula removida com sucesso." });
  } catch (erro) {
    res.status(400).json({ mensagem: `Erro ao remover matrícula: ${erro.message}` });
  }
});

await conectarDB();

app.listen(PORT, () => {
  console.log(`Academia Lions rodando na porta ${PORT}`);
});
