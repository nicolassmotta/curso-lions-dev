import express from "express";
import connectDB from "./db.js";
import Imovel from "./models/imovel.js";
import Reserva from "./models/reserva.js";
import Avaliacao from "./models/avaliacao.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Conecta ao banco de dados
connectDB();

// Middleware para ler requisições em formato JSON
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("API da startup Imóvel Lions rodando com sucesso!");
});

// 1. Cadastrar Imóvel (CREATE)
app.post("/imoveis", async (req, res) => {
  try {
    const { titulo, descricao, localizacao, precoNoite, capacidadeMaxima } = req.body;

    const novoImovel = new Imovel({
      titulo,
      descricao,
      localizacao,
      precoNoite,
      capacidadeMaxima,
    });

    await novoImovel.save();
    res.status(201).json(novoImovel);
  } catch (error) {
    res.status(400).json({ message: "Erro ao cadastrar imóvel", error: error.message });
  }
});

// 2. Listar Todos os Imóveis (READ)
app.get("/imoveis", async (req, res) => {
  try {
    const imoveis = await Imovel.find();
    res.status(200).json(imoveis);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar imóveis", error: error.message });
  }
});

// 3. Buscar Imóveis por Localização (QUERY PARAMS)
app.get("/imoveis/busca", async (req, res) => {
  try {
    const { localizacao } = req.query;

    let filtro = {};

    if (localizacao) {
      filtro.localizacao = { $regex: localizacao, $options: "i" };
    }

    const imoveis = await Imovel.find(filtro);
    res.status(200).json(imoveis);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar imóveis", error: error.message });
  }
});

// 4. Criar Reserva
app.post("/reservas", async (req, res) => {
  try {
    const { imovelId, nomeHospede, emailHospede, dataEntrada, quantidadeNoites, hospedes } = req.body;

    const imovel = await Imovel.findById(imovelId);
    if (!imovel) {
      return res.status(404).json({ message: "Imóvel não encontrado." });
    }

    if (!Array.isArray(hospedes)) {
      return res.status(400).json({ message: "O campo hospedes deve ser um array." });
    }

    const totalHospedes = hospedes.length;
    if (totalHospedes > imovel.capacidadeMaxima) {
      return res.status(400).json({
        message: `A quantidade de hóspedes (${totalHospedes}) excede a capacidade máxima permitida (${imovel.capacidadeMaxima}).`,
      });
    }

    if (quantidadeNoites <= 0) {
      return res.status(400).json({ message: "A quantidade de noites deve ser maior que zero." });
    }

    const valorTotal = quantidadeNoites * imovel.precoNoite;

    const novaReserva = new Reserva({
      imovelId,
      nomeHospede,
      emailHospede,
      dataEntrada,
      quantidadeNoites,
      hospedes,
      valorTotal,
    });

    await novaReserva.save();
    res.status(201).json(novaReserva);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar reserva", error: error.message });
  }
});

// 5. Listar Reservas
app.get("/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar reservas", error: error.message });
  }
});

// 6. Alterar Status da Reserva
app.patch("/reservas/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const reservaAtualizada = await Reserva.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    if (!reservaAtualizada) {
      return res.status(404).json({ message: "Reserva não encontrada." });
    }

    res.status(200).json(reservaAtualizada);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar status", error: error.message });
  }
});

// 7. Criar Avaliação
app.post("/avaliacoes", async (req, res) => {
  try {
    const { imovelId, nomeUsuario, nota, comentario } = req.body;

    const imovel = await Imovel.findById(imovelId);
    if (!imovel) {
      return res.status(404).json({ message: "Imóvel não encontrado." });
    }

    const novaAvaliacao = new Avaliacao({
      imovelId,
      nomeUsuario,
      nota,
      comentario,
    });

    await novaAvaliacao.save();
    res.status(201).json(novaAvaliacao);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar avaliação", error: error.message });
  }
});

// 8. Listar Avaliações de um Imóvel
app.get("/avaliacoes/imovel/:imovelId", async (req, res) => {
  try {
    const { imovelId } = req.params;
    const avaliacoes = await Avaliacao.find({ imovelId });

    let somaNotas = 0;

    avaliacoes.forEach((avaliacao) => {
      somaNotas = somaNotas + avaliacao.nota;
    });

    let mediaGeral = 0;

    if (avaliacoes.length > 0) {
      mediaGeral = somaNotas / avaliacoes.length;
    }

    res.status(200).json({
      avaliacoes,
      mediaGeral,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao carregar avaliações", error: error.message });
  }
});

// 9. Excluir Avaliação
app.delete("/avaliacoes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeUsuario } = req.body;

    const avaliacao = await Avaliacao.findById(id);

    if (!avaliacao) {
      return res.status(404).json({ message: "Avaliação não encontrada." });
    }

    if (avaliacao.nomeUsuario !== nomeUsuario) {
      return res.status(403).json({
        message: "Você não tem permissão para deletar a avaliação de outro usuário.",
      });
    }

    await Avaliacao.findByIdAndDelete(id);

    res.status(200).json({ message: "Avaliação removida com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir avaliação", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
