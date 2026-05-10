import express from "express";
import dotenv from "dotenv";
import conectarBanco from "./database.js";
import Baralho from "./models/Baralho.js";
import Flashcard from "./models/Flashcard.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conecta no MongoDB uma vez ao iniciar a API.
conectarBanco();

app.get("/", (_req, res) => {
  res.send("API de Flashcards com MongoDB no ar!");
});

app.post("/baralhos", async (req, res) => {
  try {
    // Equivalente ao antigo "array.push(...)", mas persistindo no banco.
    const baralho = await Baralho.create(req.body);

    return res.status(201).json({
      message: "Baralho criado com sucesso",
      baralho,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao criar baralho",
      error: error.message,
    });
  }
});

app.get("/baralhos", async (_req, res) => {
  try {
    // Busca todos os documentos da coleção.
    const baralhos = await Baralho.find();
    return res.status(200).json(baralhos);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar baralhos",
      error: error.message,
    });
  }
});

app.get("/baralhos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Busca um documento específico pelo _id do MongoDB.
    const baralho = await Baralho.findById(id);

    if (!baralho) {
      return res.status(404).json({
        message: "Baralho não encontrado",
      });
    }

    return res.status(200).json(baralho);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar baralho",
      error: error.message,
    });
  }
});

app.patch("/baralhos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Atualiza parcialmente e retorna o documento novo (new: true).
    const baralhoAtualizado = await Baralho.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!baralhoAtualizado) {
      return res.status(404).json({
        message: "Baralho não encontrado",
      });
    }

    return res.status(200).json({
      message: "Baralho atualizado com sucesso",
      baralho: baralhoAtualizado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar baralho",
      error: error.message,
    });
  }
});

app.delete("/baralhos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Remove o baralho pelo _id.
    const baralhoDeletado = await Baralho.findByIdAndDelete(id);

    if (!baralhoDeletado) {
      return res.status(404).json({
        message: "Baralho não encontrado",
      });
    }

    // Cascata manual: apaga os flashcards ligados a este baralho.
    await Flashcard.deleteMany({ baralho: id });

    return res.status(200).json({
      message: "Baralho e flashcards deletados com sucesso",
      baralho: baralhoDeletado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar baralho",
      error: error.message,
    });
  }
});

app.get("/baralhos/:id/flashcards", async (req, res) => {
  try {
    const { id } = req.params;
    // Filtro por relacionamento (ObjectId salvo no campo baralho).
    const flashcards = await Flashcard.find({ baralho: id });

    return res.status(200).json(flashcards);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar flashcards do baralho",
      error: error.message,
    });
  }
});

app.post("/flashcards", async (req, res) => {
  try {
    const { pergunta, resposta, baralho } = req.body;

    // Valida se o _id de baralho informado realmente existe.
    const baralhoExiste = await Baralho.findById(baralho);
    if (!baralhoExiste) {
      return res.status(404).json({
        message: "Baralho não encontrado para vincular o flashcard",
      });
    }

    const flashcard = await Flashcard.create({ pergunta, resposta, baralho });

    return res.status(201).json({
      message: "Flashcard criado com sucesso",
      flashcard,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao criar flashcard",
      error: error.message,
    });
  }
});

app.get("/flashcards", async (req, res) => {
  try {
    const { baralho } = req.query;
    // Quando há query, filtra por baralho; sem query, lista todos.
    const filtro = baralho ? { baralho } : {};
    const flashcards = await Flashcard.find(filtro);

    return res.status(200).json(flashcards);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar flashcards",
      error: error.message,
    });
  }
});

app.get("/flashcards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Consulta por id único do documento.
    const flashcard = await Flashcard.findById(id);

    if (!flashcard) {
      return res.status(404).json({
        message: "Flashcard não encontrado",
      });
    }

    return res.status(200).json(flashcard);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar flashcard",
      error: error.message,
    });
  }
});

app.patch("/flashcards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { baralho } = req.body;

    // Se trocar o baralho, valida o novo relacionamento antes de salvar.
    if (baralho) {
      const baralhoExiste = await Baralho.findById(baralho);
      if (!baralhoExiste) {
        return res.status(404).json({
          message: "Baralho não encontrado para vincular o flashcard",
        });
      }
    }

    // Atualização parcial do flashcard.
    const flashcardAtualizado = await Flashcard.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!flashcardAtualizado) {
      return res.status(404).json({
        message: "Flashcard não encontrado",
      });
    }

    return res.status(200).json({
      message: "Flashcard atualizado com sucesso",
      flashcard: flashcardAtualizado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar flashcard",
      error: error.message,
    });
  }
});

app.delete("/flashcards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Remove um flashcard pelo _id.
    const flashcardDeletado = await Flashcard.findByIdAndDelete(id);

    if (!flashcardDeletado) {
      return res.status(404).json({
        message: "Flashcard não encontrado",
      });
    }

    return res.status(200).json({
      message: "Flashcard deletado com sucesso",
      flashcard: flashcardDeletado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar flashcard",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
