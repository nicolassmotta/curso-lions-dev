import express from "express";
import mongoose from "mongoose";
import Barraca from "../models/barraca.js";
import Produto from "../models/produto.js";

const router = express.Router();

// Rota base: /barracas

// 1. Cadastrar barraca
router.post("/", async (req, res) => {
  try {
    const { nome, responsavel, categoria } = req.body;
    const novaBarraca = await Barraca.create({ nome, responsavel, categoria });
    res.status(201).json(novaBarraca);
  } catch (error) {
    res.status(400).json({ message: "Erro ao cadastrar barraca", error: error.message });
  }
});

// 2. Listar barracas (com filtro opcional ?categoria=Padaria)
router.get("/", async (req, res) => {
  try {
    const filtro = {};

    if (req.query.categoria) {
      filtro.categoria = req.query.categoria;
    }

    const barracas = await Barraca.find(filtro);
    res.status(200).json(barracas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar barracas", error: error.message });
  }
});

// 3. Listar os produtos de uma barraca
router.get("/:id/produtos", async (req, res) => {
  try {
    const { id } = req.params;

    // Um ID fora do formato do MongoDB faria o findById lançar CastError.
    // Checando antes, conseguimos responder 400 com uma mensagem clara.
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const barraca = await Barraca.findById(id);
    if (!barraca) {
      return res.status(404).json({ message: "Barraca não encontrada." });
    }

    const produtos = await Produto.find({ idBarraca: id });
    res.status(200).json({ barraca, produtos });
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar produtos da barraca", error: error.message });
  }
});

// 4. Abrir ou fechar a barraca
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { aberta } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    if (typeof aberta !== "boolean") {
      return res.status(400).json({ message: "O campo aberta deve ser true ou false." });
    }

    const barracaAtualizada = await Barraca.findByIdAndUpdate(id, { aberta }, { new: true, runValidators: true });

    if (!barracaAtualizada) {
      return res.status(404).json({ message: "Barraca não encontrada." });
    }

    res.status(200).json(barracaAtualizada);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar barraca", error: error.message });
  }
});

// 5. Remover barraca (bloqueado se ainda tiver produtos)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const quantidadeProdutos = await Produto.countDocuments({ idBarraca: id });

    // 409 Conflict: o pedido é válido, mas conflita com o estado atual dos dados
    if (quantidadeProdutos > 0) {
      return res.status(409).json({
        message: `A barraca ainda tem ${quantidadeProdutos} produto(s). Remova os produtos antes.`,
      });
    }

    const barracaRemovida = await Barraca.findByIdAndDelete(id);

    if (!barracaRemovida) {
      return res.status(404).json({ message: "Barraca não encontrada." });
    }

    res.status(200).json({ message: "Barraca removida com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover barraca", error: error.message });
  }
});

export default router;
