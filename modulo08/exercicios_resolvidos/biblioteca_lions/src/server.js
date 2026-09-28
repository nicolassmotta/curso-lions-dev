import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import conectarDB from "./db.js";
import Material from "./models/material.js";
import Emprestimo from "./models/emprestimo.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const DIAS_SEM_MULTA = 7;
const MULTA_POR_DIA = 2;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API da Biblioteca Lions no ar!" });
});

// ---------------- MATERIAIS ----------------

app.post("/materiais", async (req, res) => {
  try {
    const { titulo, tipo, autor, estoque } = req.body;
    const material = await Material.create({ titulo, tipo, autor, estoque });
    res.status(201).json(material);
  } catch (erro) {
    res.status(400).json({ mensagem: `Erro ao cadastrar material: ${erro.message}` });
  }
});

app.get("/materiais", async (req, res) => {
  try {
    const materiais = await Material.find();
    res.status(200).json(materiais);
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro ao listar materiais: ${erro.message}` });
  }
});

app.get("/materiais/disponiveis", async (req, res) => {
  try {
    // $gt = "maior que" (greater than)
    const materiais = await Material.find({ estoque: { $gt: 0 } });
    res.status(200).json(materiais);
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro ao listar materiais disponíveis: ${erro.message}` });
  }
});

// ---------------- EMPRÉSTIMOS ----------------

app.post("/emprestimos", async (req, res) => {
  try {
    const { materialId, nomeAluno, turma, dataEmprestimo, diasEmprestimo } = req.body;

    // Um id fora do formato do MongoDB faria o findById lançar erro.
    // Tratamos como "material não encontrado".
    if (!mongoose.isValidObjectId(materialId)) {
      return res.status(404).json({ mensagem: "Material não encontrado." });
    }

    // Regra 1: o material existe?
    const material = await Material.findById(materialId);
    if (!material) {
      return res.status(404).json({ mensagem: "Material não encontrado." });
    }

    // Regra 2: ainda tem exemplar?
    if (material.estoque <= 0) {
      return res.status(400).json({ mensagem: "Material sem exemplares disponíveis." });
    }

    // Regra 3: multa de R$ 2 por dia acima de 7
    let multaPrevista = 0;
    if (diasEmprestimo > DIAS_SEM_MULTA) {
      multaPrevista = (diasEmprestimo - DIAS_SEM_MULTA) * MULTA_POR_DIA;
    }

    // Cria o empréstimo ANTES de mexer no estoque: se o empréstimo tiver
    // um campo inválido, o create falha e o estoque fica como estava.
    const emprestimo = await Emprestimo.create({
      materialId,
      nomeAluno,
      turma,
      dataEmprestimo,
      diasEmprestimo,
      multaPrevista,
    });

    // Regra 4: baixa no estoque
    material.estoque = material.estoque - 1;
    await material.save();

    res.status(201).json(emprestimo);
  } catch (erro) {
    res.status(400).json({ mensagem: `Erro ao cadastrar empréstimo: ${erro.message}` });
  }
});

app.get("/emprestimos", async (req, res) => {
  try {
    const emprestimos = await Emprestimo.find();
    res.status(200).json(emprestimos);
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro ao listar empréstimos: ${erro.message}` });
  }
});

app.get("/emprestimos/busca", async (req, res) => {
  try {
    const filtro = {};

    if (req.query.aluno) {
      filtro.nomeAluno = { $regex: req.query.aluno, $options: "i" };
    }

    const emprestimos = await Emprestimo.find(filtro);
    res.status(200).json(emprestimos);
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro na busca: ${erro.message}` });
  }
});

app.get("/emprestimos/relatorio", async (req, res) => {
  try {
    const emprestimos = await Emprestimo.find();

    let totalMultas = 0;
    const porStatus = { Emprestado: 0, Devolvido: 0, Atrasado: 0 };

    for (const emprestimo of emprestimos) {
      totalMultas = totalMultas + emprestimo.multaPrevista;
      porStatus[emprestimo.status] = porStatus[emprestimo.status] + 1;
    }

    res.status(200).json({
      totalEmprestimos: emprestimos.length,
      totalMultasPrevistas: totalMultas,
      porStatus,
    });
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro ao gerar relatório: ${erro.message}` });
  }
});

app.patch("/emprestimos/:id/status", async (req, res) => {
  try {
    const { status } = req.body || {};

    // Aqui usamos findById + save (e não findByIdAndUpdate) porque precisamos
    // saber o status ANTERIOR para decidir se devolvemos o exemplar ao estoque.
    const emprestimo = await Emprestimo.findById(req.params.id);
    if (!emprestimo) {
      return res.status(404).json({ mensagem: "Empréstimo não encontrado." });
    }

    const statusAnterior = emprestimo.status;
    emprestimo.status = status;
    await emprestimo.save(); // o save também aplica o enum do Schema

    // Só devolve ao estoque na PRIMEIRA vez que vira "Devolvido"
    if (status === "Devolvido" && statusAnterior !== "Devolvido") {
      const material = await Material.findById(emprestimo.materialId);
      if (material) {
        material.estoque = material.estoque + 1;
        await material.save();
      }
    }

    res.status(200).json(emprestimo);
  } catch (erro) {
    res.status(400).json({ mensagem: `Erro ao atualizar status: ${erro.message}` });
  }
});

app.delete("/emprestimos/:id", async (req, res) => {
  try {
    const emprestimo = await Emprestimo.findByIdAndDelete(req.params.id);

    if (!emprestimo) {
      return res.status(404).json({ mensagem: "Empréstimo não encontrado." });
    }

    res.status(200).json({ mensagem: "Empréstimo removido com sucesso." });
  } catch (erro) {
    res.status(400).json({ mensagem: `Erro ao remover empréstimo: ${erro.message}` });
  }
});

await conectarDB();

app.listen(PORT, () => {
  console.log(`Biblioteca Lions rodando na porta ${PORT}`);
});
