import express from "express";
import dotenv from "dotenv";
import conectarDB from "./db.js";
import Pedido from "./models/pedido.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API da Cantina Lions no ar!" });
});

// 3.1 Cadastrar pedido
app.post("/pedidos", async (req, res) => {
  try {
    const { nomeCliente, item, quantidade, formaPagamento, observacao } = req.body;

    // Regra 1: o preço vem da tabela, e não do cliente
    let valorUnitario;
    switch (item) {
      case "Salgado":
        valorUnitario = 8;
        break;
      case "Suco":
        valorUnitario = 6;
        break;
      case "Combo":
        valorUnitario = 12;
        break;
      case "Bolo":
        valorUnitario = 5;
        break;
      default:
        return res.status(400).json({ mensagem: "Item inválido. Use Salgado, Suco, Combo ou Bolo." });
    }

    // Regra 2: total
    let valorTotal = valorUnitario * quantidade;

    // Regra 3: 10% de desconto a partir de 5 unidades
    if (quantidade >= 5) {
      valorTotal = valorTotal * 0.9;
    }

    const pedido = await Pedido.create({
      nomeCliente,
      item,
      quantidade,
      formaPagamento,
      observacao,
      valorUnitario,
      valorTotal,
    });

    res.status(201).json(pedido);
  } catch (erro) {
    res.status(400).json({ mensagem: `Erro ao cadastrar pedido: ${erro.message}` });
  }
});

// 3.2 Listar todos
app.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json(pedidos);
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro ao listar pedidos: ${erro.message}` });
  }
});

// 3.3 Buscar por cliente (declarada antes de qualquer rota com :id)
app.get("/pedidos/busca", async (req, res) => {
  try {
    const filtro = {};

    if (req.query.cliente) {
      // $regex busca por parte do texto; $options: "i" ignora maiúsculas/minúsculas
      filtro.nomeCliente = { $regex: req.query.cliente, $options: "i" };
    }

    const pedidos = await Pedido.find(filtro);
    res.status(200).json(pedidos);
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro na busca: ${erro.message}` });
  }
});

// 3.4 Atualizar status
app.patch("/pedidos/:id", async (req, res) => {
  try {
    const { status } = req.body || {};
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });

    if (!pedido) {
      return res.status(404).json({ mensagem: "Pedido não encontrado." });
    }

    res.status(200).json(pedido);
  } catch (erro) {
    res.status(400).json({ mensagem: `Erro ao atualizar pedido: ${erro.message}` });
  }
});

// 3.5 Remover
app.delete("/pedidos/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);

    if (!pedido) {
      return res.status(404).json({ mensagem: "Pedido não encontrado." });
    }

    res.status(200).json({ mensagem: "Pedido removido com sucesso." });
  } catch (erro) {
    res.status(400).json({ mensagem: `Erro ao remover pedido: ${erro.message}` });
  }
});

await conectarDB();

app.listen(PORT, () => {
  console.log(`Cantina Lions rodando na porta ${PORT}`);
});
