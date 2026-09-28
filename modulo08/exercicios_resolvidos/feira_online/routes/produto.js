import express from "express";
import mongoose from "mongoose";
import Barraca from "../models/barraca.js";
import Produto from "../models/produto.js";

const router = express.Router();

// Rota base: /produtos

// 1. Cadastrar produto (só em barraca existente e aberta)
router.post("/", async (req, res) => {
  try {
    const { idBarraca, nome, preco, estoque } = req.body;

    if (!mongoose.isValidObjectId(idBarraca)) {
      return res.status(400).json({ message: "idBarraca inválido." });
    }

    const barraca = await Barraca.findById(idBarraca);

    if (!barraca) {
      return res.status(404).json({ message: "Barraca não encontrada." });
    }

    if (!barraca.aberta) {
      return res.status(400).json({ message: "Barraca fechada não pode receber novos produtos." });
    }

    const novoProduto = await Produto.create({ idBarraca, nome, preco, estoque });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ message: "Erro ao cadastrar produto", error: error.message });
  }
});

// 2. Listar produtos com os dados da barraca
router.get("/", async (req, res) => {
  try {
    // populate troca o ObjectId pelo documento da barraca.
    // O segundo argumento escolhe só os campos que queremos trazer.
    const produtos = await Produto.find().populate("idBarraca", "nome categoria");
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar produtos", error: error.message });
  }
});

// 3. Buscar produtos por nome e/ou preço máximo
// Exemplo: /produtos/busca?nome=queijo&precoMax=30
router.get("/busca", async (req, res) => {
  try {
    const { nome, precoMax } = req.query;
    const filtro = {};

    if (nome) {
      filtro.nome = { $regex: nome, $options: "i" };
    }

    if (precoMax) {
      const limite = Number(precoMax);

      if (Number.isNaN(limite)) {
        return res.status(400).json({ message: "precoMax deve ser um número." });
      }

      // $lte = "menor ou igual a" (less than or equal)
      filtro.preco = { $lte: limite };
    }

    const produtos = await Produto.find(filtro).populate("idBarraca", "nome categoria");
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error: error.message });
  }
});

// 4. Atualizar preço e/ou estoque
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { preco, estoque } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    // Monta só com os campos enviados, para não apagar os outros com undefined
    const dadosAtualizados = {};
    if (preco !== undefined) dadosAtualizados.preco = preco;
    if (estoque !== undefined) dadosAtualizados.estoque = estoque;

    if (Object.keys(dadosAtualizados).length === 0) {
      return res.status(400).json({ message: "Envie preco e/ou estoque para atualizar." });
    }

    const produtoAtualizado = await Produto.findByIdAndUpdate(id, dadosAtualizados, { new: true, runValidators: true });

    if (!produtoAtualizado) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar produto", error: error.message });
  }
});

// 5. Remover produto
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const produtoRemovido = await Produto.findByIdAndDelete(id);

    if (!produtoRemovido) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.status(200).json({ message: "Produto removido com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover produto", error: error.message });
  }
});

export default router;
